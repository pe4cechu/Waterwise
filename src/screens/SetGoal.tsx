import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../contexts/ThemeContext';
import { useWaterTracker } from '../contexts/WaterTrackerContext';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Template {
    id: string;
    name: string;
    value: number;
    icon: string;
    displayValue?: string;
}

const SetGoal = () => {
    const [displayedTemplates, setDisplayedTemplates] = React.useState<Template[]>([]);
    const { maxLevel, chooseLevel, selectedValue, setSelectedValue } = useWaterTracker();
    const { colors } = useTheme();

    React.useEffect(() => {
        const updatedTemplates = templates.map((template) => {
            const newValue =
                selectedValue === 'ml'
                    ? template.value + ' ml'
                    : (template.value / 29.5735).toFixed(2) + ' oz'; // Convert ml to oz
            return { ...template, displayValue: newValue };
        });
        setDisplayedTemplates(updatedTemplates);
    }, [selectedValue]);

    React.useEffect(() => {
        setSelectedValue('oz'); // Set default value to 'oz'
    }, []);

    const handleChooseTemplate = async (value: string) => {
        try {
            const templateData = {
                value: value,
                unit: selectedValue,
            };
            await AsyncStorage.setItem('@selectedTemplate', JSON.stringify(templateData));
            chooseLevel(parseInt(value));
            navigation.navigate('Home');
        } catch (e) {
            console.error('Failed to save the selected template.', e);
        }
    };

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleBack = () => {
        navigation.navigate('Home');
    };
    const templates: Template[] = [
        {
            id: '1',
            name: 'Summer',
            value: 2000,
            icon: 'https://cdn-icons-png.flaticon.com/512/10484/10484158.png',
        },
        {
            id: '2',
            name: 'Sport',
            value: 1500,
            icon: 'https://cdn-icons-png.flaticon.com/512/1041/1041168.png',
        },
        {
            id: '3',
            name: 'Winter',
            value: 1200,
            icon: 'https://cdn-icons-png.flaticon.com/512/2336/2336319.png',
        },
        {
            id: '4',
            name: 'Children',
            value: 700,
            icon: 'https://cdn-icons-png.flaticon.com/512/523/523495.png',
        },
    ];

    const renderTemplate = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.templateBox, { backgroundColor: colors.item }]}
            onPress={() => handleChooseTemplate(item.value)}
        >
            <Image
                source={{
                    uri: item.icon,
                }}
                style={styles.icon}
            />
            <Text style={styles.templateName}>{item.name}</Text>
            <Text style={[styles.templateValue, { color: colors.text }]}>
                {item.displayValue}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.sub_background },
            ]}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backIcon}>
                    <AntDesign name="arrowleft" size={24} color="#1976D2" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerText, { color: colors.text }]}>
                        Set Goal
                    </Text>
                </View>
            </View>

            <View style={styles.goalContainer}>
                <View style={styles.flag}>
                    <Text style={styles.flagText}>{maxLevel}</Text>
                </View>
            </View>

            <Dropdown
                style={styles.dropdown}
                data={[
                    { label: 'oz', value: 'oz' },
                    { label: 'ml', value: 'ml' },
                ]}
                labelField="label"
                valueField="value"
                value={selectedValue}
                onChange={(item) => setSelectedValue(item.value)}
                placeholder="Select unit"
                placeholderStyle={styles.placeholderText}
                itemTextStyle={styles.placeholderText}
                selectedTextStyle={styles.placeholderText}
            />
            <View
                style={[
                    styles.sectionContainer,
                    { backgroundColor: colors.background },
                ]}
            >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Drink Goal
                </Text>
                <Text style={styles.sectionSubtitle}>
                    We have prepared many goals for you!
                </Text>
                <TextInput
                    style={[
                        styles.searchBox,
                        {
                            backgroundColor: colors.item,
                            fontFamily: 'Cera_Regular',
                        },
                    ]}
                    placeholder="Search by template"
                    placeholderTextColor={colors.text}
                />

                <FlatList
                    data={displayedTemplates}
                    numColumns={2}
                    renderItem={renderTemplate}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={styles.templateRow}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 50,
        marginLeft: 16,
        gap: 10,
    },
    backIcon: {
        position: 'absolute',
        top: '5%',
        left: '2%',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 21,
        fontFamily: 'Cera_Bold',
    },
    goalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        marginBottom: 20,
    },
    flag: {
        width: 80,
        height: 80,
        borderColor: '#000',
        borderRightWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(25, 118, 210, 0.8)',
    },

    flagText: {
        fontSize: 63,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    dropdown: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: "10%",
        width: '60%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 36,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 45,
        shadowColor: '#1BA9E1',
        elevation: 5,
    },
    placeholderText: {
        fontFamily: 'Cera_Medium',
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: 'Cera_Bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    sectionSubtitle: {
        fontFamily: 'Cera_Medium',
        fontSize: 14,
        color: '#90A5B4',
        marginBottom: 36,
        textAlign: 'center',
    },
    searchBox: {
        borderRadius: 16,
        padding: 18,
        marginBottom: 15,
    },
    templateRow: {
        justifyContent: 'space-between',
    },
    templateBox: {
        flex: 1,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        margin: 5,
        borderWidth: 0.5,
        borderColor: '#D0DBE2',
    },
    icon: {
        height: 24,
        width: 24,
        marginBottom: 10,
    },
    templateName: {
        fontSize: 12,
        fontFamily: 'Cera_Medium',
        color: '#90A5B4',
    },
    templateValue: {
        fontSize: 16,
        fontFamily: 'Cera_Regular',
        color: '#141A1E',
        marginTop: 5,
        fontWeight: '600',
    },
});

export default SetGoal;
