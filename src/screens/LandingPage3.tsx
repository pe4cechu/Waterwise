import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../navigation/AppNavigator';

type LandingPage3NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'LandingPage3'
>;

const LandingPage3 = () => {
    const navigation = useNavigation<LandingPage3NavigationProp>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Image
                source={require('../../assets/landing-3.png')}
                style={styles.image}
            />
            <Text style={styles.title}>
                Dễ dàng sử dụng - Uống, Chạm, Lặp lại
            </Text>
            <Text style={styles.description}>
                Duy trì đủ nước mỗi ngày thật dễ dàng với Water Tracker.
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Bắt đầu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 30,
        paddingBottom: 20,
    },
    body: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 800,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 20,
        color: '#555',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#1976D2',
        padding: 20,
        width: '80%',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    backButton: {
        padding: 12,
        position: 'absolute',
        top: 70,
        left: 30,
    },
});

export default LandingPage3;
