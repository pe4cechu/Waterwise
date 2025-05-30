import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';

import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';

const daysOfWeek = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];

const screenWidth = Dimensions.get('window').width;

export default function Scheduler() {
    const { colors } = useTheme();
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedVolume, setSelectedVolume] = useState('100ml');
    const [customVolume, setCustomVolume] = useState('');
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);
    const [amPm, setAmPm] = useState('AM');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleVolumeChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            // Ensure only integers are entered
            setCustomVolume(value);
        }
    };

    const getVolume = () => {
        return selectedVolume === 'custom'
            ? `${customVolume}ml`
            : selectedVolume;
    };

    const saveAlarm = async () => {
        try {
            const date = new Date();
            date.setHours(amPm === 'AM' ? hours : hours + 12);
            date.setMinutes(minutes);
            date.setSeconds(0); // Ensure seconds are set to 00
            const jsonValue = await AsyncStorage.getItem('@alarms');
            const alarms = jsonValue != null ? JSON.parse(jsonValue) : [];
            alarms.push({ date, volume: getVolume() });
            await AsyncStorage.setItem('@alarms', JSON.stringify(alarms));
        } catch (e) {
            console.error('Failed to save alarm.', e);
        }
    };

    const handleConfirm = () => {
        if (
            selectedVolume === 'custom' &&
            (!customVolume || customVolume === '' || customVolume === '0')
        ) {
            Alert.alert('Error', 'Please enter a valid custom volume in ml.');
            return;
        }
        void saveAlarm();
        Alert.alert(
            'Alarm Set',
            `Alarm set for ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm} with ${getVolume()}`,
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Reminder'),
                },
            ],
        );
    };

    const toggleDaySelection = (day: string) => {
        setSelectedDays((prevDays) =>
            prevDays.includes(day)
                ? prevDays.filter((d) => d !== day)
                : [...prevDays, day],
        );
    };

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <View style={styles.wheelPickerContainer}>
                <WheelPicker
                    initialSelectedIndex={Math.max(0, Math.min(hours - 1, 11))}
                    data={Array.from({ length: 12 }, (_, i) =>
                        (i + 1).toString(),
                    )}
                    restElements={1} // Show only one adjacent element on each side
                    elementHeight={30}
                    onChangeValue={(_index, value) => setHours(parseInt(value))}
                    selectedIndex={Math.max(0, Math.min(hours - 1, 11))}
                    containerStyle={styles.wheelPicker}
                    selectedLayoutStyle={[
                        styles.selectedLayoutStyle,
                        { backgroundColor: colors.sub_background },
                    ]}
                    elementTextStyle={[
                        styles.elementTextStyle,
                        styles.largeText,
                        { color: colors.text },
                    ]}
                />
                <WheelPicker
                    initialSelectedIndex={Math.max(0, Math.min(minutes, 59))}
                    data={Array.from(
                        { length: 60 },
                        (_, i) => (i < 10 ? '0' : '') + i.toString(),
                    )}
                    restElements={1} // Show only one adjacent element on each side
                    elementHeight={30}
                    onChangeValue={(_index, value) =>
                        setMinutes(parseInt(value))
                    }
                    selectedIndex={Math.max(0, Math.min(minutes, 59))}
                    containerStyle={styles.wheelPicker}
                    selectedLayoutStyle={[
                        styles.selectedLayoutStyle,
                        { backgroundColor: colors.sub_background },
                    ]}
                    elementTextStyle={[
                        styles.elementTextStyle,
                        styles.largeText,
                        { color: colors.text },
                    ]}
                />
                <WheelPicker
                    initialSelectedIndex={amPm === 'AM' ? 0 : 1}
                    data={['AM', 'PM']}
                    restElements={1} // Show only one adjacent element on each side
                    elementHeight={30}
                    infiniteScroll={false}
                    onChangeValue={(_index, value) => setAmPm(value)}
                    selectedIndex={amPm === 'AM' ? 0 : 1}
                    containerStyle={styles.wheelPicker}
                    selectedLayoutStyle={[
                        styles.selectedLayoutStyle,
                        { backgroundColor: colors.sub_background },
                    ]}
                    elementTextStyle={[
                        styles.elementTextStyle,
                        { color: colors.text },
                    ]}
                />
            </View>
            <View style={styles.daysContainer}>
                {daysOfWeek.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayButton,
                            selectedDays.includes(day) &&
                                styles.selectedDayButton,
                            {
                                backgroundColor: selectedDays.includes(day)
                                    ? colors.primary
                                    : colors.sub_background,
                            },
                        ]}
                        onPress={() => toggleDaySelection(day)}
                    >
                        <Text
                            style={[
                                styles.dayButtonText,
                                selectedDays.includes(day) &&
                                    styles.selectedDayButtonText,
                                {
                                    color: selectedDays.includes(day)
                                        ? '#fff'
                                        : colors.text,
                                },
                            ]}
                        >
                            {day}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Picker
                selectedValue={selectedVolume}
                style={[styles.picker, { color: colors.text }]}
                onValueChange={(itemValue) => setSelectedVolume(itemValue)}
            >
                <Picker.Item label="100ml" value="100ml" />
                <Picker.Item label="200ml" value="200ml" />
                <Picker.Item label="500ml" value="500ml" />
                <Picker.Item label="Custom" value="custom" />
            </Picker>
            {selectedVolume === 'custom' && (
                <TextInput
                    style={[styles.customVolumeInput, { color: colors.text }]}
                    keyboardType="numeric"
                    value={customVolume}
                    onChangeText={handleVolumeChange}
                    placeholder="Enter volume in ml"
                />
            )}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleConfirm}
            >
                <Text style={[styles.buttonText, { color: '#fff' }]}>
                    Set Alarm
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Cera_Bold',
        fontSize: 18,
    },
    selectedTime: {
        marginTop: 20,
        fontSize: 18,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    dayButton: {
        padding: 8,
        borderRadius: screenWidth * 0.06,
        width: screenWidth * 0.12,
        height: screenWidth * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    },
    selectedDayButton: {
        backgroundColor: '#007AFF',
    },
    dayButtonText: {
        fontSize: screenWidth * 0.035,
        fontFamily: 'Cera_Bold',
    },
    selectedDayButtonText: {
        color: '#fff',
    },
    picker: {
        height: 50,
        width: 150,
        marginVertical: 20,
    },
    customVolumeInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '80%',
    },
    repeatText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    wheelPickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
    },
    wheelPicker: {
        width: 100,
        height: 150,
    },
    selectedLayoutStyle: {
        borderRadius: 2,
    },
    elementTextStyle: {
        fontSize: 18,
        fontFamily: 'Cera_Bold',
    },
    largeText: {
        fontSize: 24,
    },
});
