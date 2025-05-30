import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../navigation/AppNavigator';

type LandingPage1NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'LandingPage1'
>;

const LandingPage1 = () => {
    const navigation = useNavigation<LandingPage1NavigationProp>();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/landing-1.png')}
                style={styles.image}
            />
            <Text style={styles.title}>
                Theo dõi lượng nước bạn uống mỗi ngày.
            </Text>
            <Text style={styles.description}>
                Đạt được mục tiêu uống nước mỗi ngày chỉ với một chạm!
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('LandingPage2')}
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
});

export default LandingPage1;
