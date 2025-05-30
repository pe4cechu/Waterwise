import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddIcon from '../../assets/images/add';
import TrashIcon from '../../assets/images/trash';
import TabBar from '../components/TabBar';
import { useTheme } from '../contexts/ThemeContext';

const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 60;

const Reminder = () => {
    const { colors } = useTheme();
    const [reminders, setReminders] = useState<
        { date: Date; days: string[] }[]
    >([]);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [alarmTime, setAlarmTime] = useState<Date | null>(null);
    const [alarms, setAlarms] = useState<{ date: Date }[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        loadReminders();
        loadAlarms();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadAlarms();
        }, []),
    );

    const saveReminders = async (
        reminders: { date: Date; days: string[] }[],
    ) => {
        try {
            const jsonValue = JSON.stringify(reminders);
            await AsyncStorage.setItem('@reminders', jsonValue);
        } catch (e) {
            console.error('Failed to save reminders.', e);
        }
    };

    const loadReminders = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@reminders');
            if (jsonValue != null) {
                setReminders(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error('Failed to load reminders.', e);
        }
    };

    const loadAlarmTime = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@alarm');
            if (jsonValue != null) {
                setAlarmTime(new Date(JSON.parse(jsonValue).date));
            }
        } catch (e) {
            console.error('Failed to load alarm time.', e);
        }
    };

    const loadAlarms = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@alarms');
            if (jsonValue != null) {
                setAlarms(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error('Failed to load alarms.', e);
        }
    };

    const addReminder = (date: Date, days: string[]) => {
        const newReminders = [...reminders, { date, days }];
        setReminders(newReminders);
        saveReminders(newReminders);
        Alert.alert(
            'Reminder Set',
            `Reminder set for ${date.toLocaleTimeString()} on ${days.join(', ')}`,
        );
    };

    const deleteAlarm = async (index: number) => {
        try {
            const updatedAlarms = alarms.filter((_, i) => i !== index);
            setAlarms(updatedAlarms);
            await AsyncStorage.setItem(
                '@alarms',
                JSON.stringify(updatedAlarms),
            );
        } catch (e) {
            console.error('Failed to delete alarm.', e);
        }
    };

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        addReminder(date, selectedDays);
        setDatePickerVisibility(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const toggleDaySelection = (day: string) => {
        setSelectedDays((prevDays) =>
            prevDays.includes(day)
                ? prevDays.filter((d) => d !== day)
                : [...prevDays, day],
        );
    };

    const navigateToScheduler = () => {
        navigation.navigate('Scheduler');
    };

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
    };

    const renderAlarmItem = useCallback(
        ({ item, index }) => (
            <View
                style={[
                    styles.alarmItem,
                    { backgroundColor: colors.nav_background },
                ]}
            >
                <Text style={[styles.reminderText, { color: colors.text }]}>
                    {formatTime(new Date(item.date))}
                </Text>
                <TouchableOpacity
                    style={styles.inlineDeleteButton}
                    onPress={() => deleteAlarm(index)}
                >
                    <TrashIcon width={25} height={25} fill={colors.text} />
                </TouchableOpacity>
            </View>
        ),
        [alarms, colors.text],
    );

    const renderReminderItem = useCallback(
        ({ item }) => (
            <View style={styles.reminderItem}>
                <Text style={[styles.reminderText, { color: colors.text }]}>
                    {formatTime(new Date(item.date))} on {item.days.join(', ')}
                </Text>
            </View>
        ),
        [reminders, colors.text],
    );

    return (
        <>
            <SafeAreaView
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                        height: screenHeight - tabBarHeight,
                    },
                ]}
            >
                <Text style={[styles.header, { color: colors.text }]}>
                    Reminder
                </Text>
                {alarms.length > 0 ? (
                    <FlatList
                        data={alarms}
                        renderItem={renderAlarmItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                            paddingBottom: tabBarHeight,
                        }}
                    />
                ) : (
                    <View style={styles.noRemindersContainer}>
                        <Text
                            style={[
                                styles.reminderText,
                                { color: colors.text },
                            ]}
                        >
                            No reminders set.
                        </Text>
                    </View>
                )}
                <FlatList
                    data={reminders}
                    renderItem={renderReminderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        paddingBottom: tabBarHeight,
                    }}
                />
            </SafeAreaView>
            <TabBar />
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: colors.primary }]}
                onPress={navigateToScheduler}
            >
                <AddIcon width={18} height={18} fill="#fff" />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontFamily: 'Cera_Black',
        textAlign: 'left',
        marginLeft: 28,
        marginTop: 10,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    dayButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    selectedDayButton: {
        backgroundColor: '#007AFF',
    },
    dayButtonText: {
        fontSize: 15,
        fontFamily: 'Cera_Bold',
    },
    selectedDayButtonText: {
        color: '#fff',
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 90, // Adjusted to be above the TabBar
        borderRadius: 30,
        elevation: 8,
    },
    fabText: {
        fontSize: 30,
        color: 'white',
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
    },
    sliderWrapper: {
        alignItems: 'center',
    },
    sliderLabel: {
        fontSize: 18,
        fontFamily: 'Cera_Bold',
        marginBottom: 10,
    },
    slider: {
        width: 40,
        height: 300,
    },
    sliderValue: {
        fontSize: 18,
        fontFamily: 'Cera_Bold',
        marginTop: 10,
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cera_Bold',
    },
    reminderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    reminderText: {
        fontSize: 18,
        fontFamily: 'Cera_Bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    alarmItem: {
        padding: 15,
        marginVertical: 10,
        marginHorizontal: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inlineDeleteButton: {
        padding: 0,
        marginLeft: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Cera_Bold',
    },
    noRemindersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -tabBarHeight, // Adjust to account for tab bar height
    },
});

export default React.memo(Reminder);
