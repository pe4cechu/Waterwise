import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import WaterGlass from '../components/WaterGlass';
import { useTheme } from '../contexts/ThemeContext';
import { useWaterTracker } from '../contexts/WaterTrackerContext';
import { RootStackParamList } from '../navigation/AppNavigator';

const currentDate = new Date();
const dateValue = `${currentDate.getDate()} tháng ${
    currentDate.getMonth() + 1
} ${currentDate.getFullYear()}`;

const WaterTracker = () => {
    const { colors } = useTheme();
    const { currentLevel, maxLevel } = useWaterTracker();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const newProgress = Math.floor((currentLevel / maxLevel) * 100);
        setProgress(newProgress);
    }, [currentLevel, maxLevel]);
    const targetReached = progress >= 100;
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleBack = () => {
        navigation.navigate('Home');
    };

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
                        Lượng nước uống
                    </Text>
                </View>
            </View>
            <View
                style={[
                    styles.glassContainer,
                    { backgroundColor: colors.sub_background },
                ]}
            >
                <WaterGlass currentLevel={currentLevel} />
            </View>

            <View
                style={[
                    styles.sectionContainer,
                    { backgroundColor: colors.card },
                ]}
            >
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Ngày & Giờ</Text>
                    <Text style={styles.dateValue}>{dateValue}</Text>
                </View>

                <View style={styles.goalContainer}>
                    <Text style={[styles.goalTitle, { color: colors.text }]}>
                        Xem mục tiêu
                    </Text>
                    <View style={styles.progressCircle}>
                        <Svg height="100" width="100" viewBox="0 0 100 100">
                            <Circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="#E0E0E0"
                                strokeWidth="10"
                                fill="none"
                            />
                            <Circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke={targetReached ? '#00C853' : '#0288D1'}
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray="282.6"
                                strokeDashoffset={
                                    282.6 * ((100 - progress) / 100)
                                }
                            />
                        </Svg>
                        <Text
                            style={[
                                styles.progressText,
                                { color: colors.text },
                            ]}
                        >
                            {progress}%
                        </Text>
                    </View>

                    <View style={styles.performanceContainer}>
                        <View style={styles.performanceItem}>
                            <Text
                                style={[
                                    styles.performanceValue,
                                    targetReached
                                        ? styles.positive
                                        : styles.negative,
                                ]}
                            >
                                {targetReached
                                    ? '+100%'
                                    : `-${100 - progress}%`}
                            </Text>
                            <Text style={styles.performanceLabel}>
                                Hiệu suất Vận Động
                            </Text>
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/8815/8815678.png',
                                }}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.performanceItem}>
                            <Text
                                style={[
                                    styles.performanceValue,
                                    targetReached
                                        ? styles.positive
                                        : styles.negative,
                                ]}
                            >
                                {targetReached
                                    ? '+100%'
                                    : `-${100 - progress}%`}
                            </Text>
                            <Text style={styles.performanceLabel}>
                                Hiệu suất Nhận Thức
                            </Text>

                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/6969/6969728.png',
                                }}
                                style={styles.icon}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        targetReached ? styles.reached : styles.notReached,
                    ]}
                >
                    <Text style={styles.buttonText}>
                        {targetReached ? 'Đạt Mục Tiêu' : 'Chưa Đạt Mục Tiêu'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF8FE',
    },
    header: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 36,
        marginTop: 56,
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
        fontWeight: '600',
    },
    glassContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAF8FE',
    },
    glassText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    glass: {
        width: 100,
        height: 150,
        backgroundColor: 'rgba(25, 118, 210, 0.8)',
        borderRadius: 10,
    },
    sectionContainer: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 45,
        shadowColor: '#1BA9E1',
        elevation: 5,
    },
    dateContainer: {
        backgroundColor: 'rgba(25, 118, 210, 0.8)',
        padding: 16,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginVertical: 8,
    },
    dateValue: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 4,
    },
    goalContainer: {
        alignItems: 'center',
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    progressCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    progressText: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: '600',
    },
    performanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    performanceItem: {
        alignItems: 'center',
        padding: 20,
        borderWidth: 0.5,
        borderColor: '#D0DBE2',
        borderRadius: 16,
    },
    performanceValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    performanceLabel: {
        fontSize: 12,
        color: '#90A5B4',
    },
    icon: {
        height: 36,
        width: 36,
    },
    positive: {
        color: '#00C853',
    },
    negative: {
        color: '#E95A57',
    },
    button: {
        paddingVertical: 18,
        paddingHorizontal: 18,
        borderRadius: 8,
        alignItems: 'center',
        width: '60%',
        alignSelf: 'center',
    },
    reached: {
        backgroundColor: '#00C853',
    },
    notReached: {
        backgroundColor: '#E95A57',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default WaterTracker;
