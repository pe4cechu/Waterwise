import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputScreen = ({ navigation }) => {
    const [value, setValue] = useState('');
    const { colors } = useTheme();

    const handleSubmit = async () => {
        if (!value || parseInt(value) === 0) {
            Alert.alert('Invalid Input', 'Please enter a valid integer number greater than 0.');
            return;
        }
        try {
            const existingValue = await AsyncStorage.getItem('drank');
            const newValue = existingValue ? parseInt(existingValue) + parseInt(value) : parseInt(value);
            await AsyncStorage.setItem('drank', newValue.toString());

            const existingCount = await AsyncStorage.getItem('drinksCount');
            const newCount = existingCount ? parseInt(existingCount) + 1 : 1;
            await AsyncStorage.setItem('drinksCount', newCount.toString());

            const today = new Date().toISOString().split('T')[0];
            const dailyData = await AsyncStorage.getItem(today);
            const dailyStats = dailyData ? JSON.parse(dailyData) : { drank: 0, count: 0 };
            dailyStats.drank += parseInt(value);
            dailyStats.count += 1;
            await AsyncStorage.setItem(today, JSON.stringify(dailyStats));

            console.log('Entered number:', value);
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save the data to the storage', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.label, { color: colors.text }]}>Enter the water amount:</Text>
            <TextInput
                style={[styles.input, { backgroundColor: colors.sub_background, color: colors.text }]}
                keyboardType="numeric"
                value={value}
                onChangeText={setValue}
                textAlign="center"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 20,
        textAlign: 'center',
        fontFamily: 'Cera_Bold',
    },
    input: {
        marginBottom: 10,
        padding: 5,
        width: '100%',
        fontFamily: 'Cera_Bold',
        borderRadius: 25,
        height: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#0ea6e9',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Cera_Bold',
    },
});

export default InputScreen;
