import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { RootStackParamList } from '../navigation/AppNavigator';

type LoginNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

export default function Login() {
    const navigation = useNavigation<LoginNavigationProp>();
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Chào bạn !</Text>
                <Text style={styles.subtitle}>
                    Hãy đăng nhập để sử dụng ứng dụng
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email hoặc số điện thoại"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordText}>
                        Quên mật khẩu?
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.divider}></View>
                <Text style={styles.dividerText}>Tiếp tục với</Text>
                <View style={styles.divider}></View>
            </View>

            <TouchableOpacity style={styles.googleButton}>
                <AntDesign name="google" size={28} color="#1976D2" />
                <Text style={styles.googleButtonText}>
                    Đăng nhập bằng Google
                </Text>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                    Khi đăng nhập, bạn đồng ý với{' '}
                    <Text style={styles.link}>Điều khoản dịch vụ</Text> và{' '}
                    <Text style={styles.link}>Chính sách bảo mật</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titleContainer: {
        marginBottom: 80,
    },
    title: {
        fontSize: 28,
        textAlign: 'left',
        fontWeight: '700',
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#8E8E8E',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DEDEDE',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 14,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#1976D2',
        fontWeight: '600',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        flex: 1,
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#777',
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DEDEDE',
    },
    googleButtonText: {
        color: '#1976D2',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 12,
    },
    termsContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    termsText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    link: {
        color: '#1976D2',
        fontWeight: '600',
    },
});
