import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../navigation/AppNavigator';

type LandingPage2NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'LandingPage2'
>;

const LandingPage2 = () => {
    const navigation = useNavigation<LandingPage2NavigationProp>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Image
                source={require('../../assets/landing-2.png')}
                style={styles.image}
            />
            <Text style={styles.title}>
                Ứng dụng nhắc nhở cá nhân hoá thông minh
            </Text>
            <Text style={styles.description}>
                Dễ dàng đặt mục tiêu uống nước và theo dõi tiến độ mỗi ngày.
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('LandingPage3')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Tiếp tục</Text>
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

export default LandingPage2;
