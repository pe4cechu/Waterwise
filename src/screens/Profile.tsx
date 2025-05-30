import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import TabBar from '../components/TabBar';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

export default function Profile() {
    const { colors } = useTheme();
    const { user } = useUser();
    const [lastName, setLastName] = useState(user.lname);
    const [firstName, setFirstName] = useState(user.fname);
    const [email, setEmail] = useState(user.email);
    const [age, setAge] = useState(String(user.age));
    const [gender, setGender] = useState(user.gender);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContainer,
                    ,
                    { backgroundColor: colors.background },
                ]}
            >
                <View style={styles.header}>
                    <View style={styles.backBtnContainer}>
                        {isEditing && (
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => setIsEditing(false)}
                            >
                                <MaterialIcons
                                    name="arrow-back"
                                    size={24}
                                    color="#1976D2"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {isEditing ? 'Chỉnh sửa hồ sơ' : 'Hồ sơ của tôi'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={
                        isEditing === true
                            ? () => {}
                            : () => setIsEditing(!isEditing)
                    }
                >
                    <MaterialIcons name="edit" size={18} color="white" />
                </TouchableOpacity>

                <Image
                    source={require('../../assets/avatar.png')}
                    style={styles.profileImage}
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Họ</Text>
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        value={firstName}
                        onChangeText={setFirstName}
                        editable={isEditing}
                    />

                    <Text style={styles.label}>Tên</Text>
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        value={lastName}
                        onChangeText={setLastName}
                        editable={isEditing}
                    />

                    <Text style={styles.label}>Địa chỉ email</Text>
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        editable={isEditing}
                    />

                    <Text style={styles.label}>Tuổi</Text>
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                        editable={isEditing}
                    />

                    <Text style={styles.label}>Giới tính</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[
                                styles.genderOption,
                                gender === 'male' && styles.selectedGender,
                            ]}
                            onPress={() => setGender('male')}
                            disabled={!isEditing}
                        >
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === 'male' &&
                                        styles.selectedGenderText,
                                ]}
                            >
                                Nam
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.genderOption,
                                gender === 'female' && styles.selectedGender,
                            ]}
                            onPress={() => setGender('female')}
                            disabled={!isEditing}
                        >
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === 'female' &&
                                        styles.selectedGenderText,
                                ]}
                            >
                                Nữ
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.genderOption,
                                gender === 'other' && styles.selectedGender,
                            ]}
                            onPress={() => setGender('other')}
                            disabled={!isEditing}
                        >
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === 'other' &&
                                        styles.selectedGenderText,
                                ]}
                            >
                                Khác
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {isEditing && (
                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveBtnText}>Cập nhật</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            <TabBar />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    backBtnContainer: {
        position: 'absolute',
        left: 28,
        top: 10,
    },

    backBtn: {
        marginRight: 10,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 18,
    },
    editBtn: {
        borderRadius: 50,
        backgroundColor: '#1976D2',
        padding: 6,
        position: 'absolute',
        top: 58,
        right: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#1976D2',
        marginVertical: 8,
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#90A5B4',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 46,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        borderRadius: 8,
        marginBottom: 16,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    genderOption: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '30%',
        alignItems: 'center',
    },
    selectedGender: {
        backgroundColor: '#1976D2',
        borderColor: '#1976D2',
        color: '#fff',
    },
    genderText: {
        color: '#333',
        fontSize: 16,
    },
    selectedGenderText: {
        color: '#FFF',
    },
    saveBtn: {
        backgroundColor: '#1976D2',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
});
