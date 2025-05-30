import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AddIcon from '../../assets/images/add';
import BottleIcon from '../../assets/images/bottle';
import ArticleIcon from '../../assets/images/article';
import CustomIcon from '../../assets/images/custom';
import HomeIcon from '../../assets/images/home';
import CupIcon from '../../assets/images/cup';
import ReminderIcon from '../../assets/images/reminder';
import SettingIcon from '../../assets/images/setting';
import StatisticIcon from '../../assets/images/statistic';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from '../navigation/AppNavigator';

interface TabButtonProps {
    routeName: string;
    label: string;
    IconComponent: React.ComponentType<{ fill: string; width: number; height: number; }>;
    target: keyof RootStackParamList;
    onPress?: () => void;
}

const windowWidth = Dimensions.get('window').width;

const TabButton: React.FC<TabButtonProps> = React.memo(({ routeName, label, IconComponent, target, onPress }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { colors } = useTheme();
    const isFocused = route.name === routeName;

    const scale = useSharedValue(0);
    const rotation = useSharedValue(0);
    const [showIcons, setShowIcons] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: interpolate(scale.value, [0, 1], [1, 1.2]) },
                { rotate: `${interpolate(rotation.value, [0, 1], [0, 45])}deg` },
            ],
        };
    });

    React.useEffect(() => {
        if (isFocused && routeName === 'Home') {
            scale.value = withSpring(1, { damping: 10, stiffness: 90 });
        } else {
            scale.value = withSpring(0);
        }
    }, [isFocused, routeName]);

    const handlePress = React.useCallback(() => {
        if (routeName === 'Home' && isFocused) {
            if (rotation.value === 0) {
                rotation.value = withTiming(1, { duration: 300 });
            } else {
                rotation.value = withTiming(0, { duration: 300 });
            }
            onPress?.();
            setShowIcons(!showIcons);
        } else {
            navigation.navigate(target);
        }
    }, [routeName, rotation, navigation, onPress, target, isFocused, showIcons]);

    const handleIcon3Press = () => {
        navigation.navigate('InputScreen');
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress} style={styles.tabButton} activeOpacity={1}>
                {routeName === 'Home' && isFocused ? (
                    <Animated.View style={[styles.roundIcon, { backgroundColor: colors.primary }, animatedStyle]}>
                        <AddIcon fill="#fff" width={20} height={20} />
                    </Animated.View>
                ) : (
                    <>
                        <IconComponent fill={isFocused ? colors.primary : colors.nav_text} width={isFocused ? 28 : 24} height={isFocused ? 28 : 24} />
                        <Text style={[styles.tabText, { color: isFocused ? colors.primary : colors.nav_text }, isFocused && styles.selectedTabText]}>
                            {label}
                        </Text>
                    </>
                )}
            </TouchableOpacity>
            {showIcons && (
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={[styles.smallIcon, styles.icon2]}>
                        <CupIcon fill="#fff" width={20} height={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.smallIcon, styles.icon1]}>
                        <BottleIcon fill="#fff" width={30} height={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.smallIcon, styles.icon3]} onPress={handleIcon3Press}>
                        <CustomIcon fill="#fff" width={25} height={25} />
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
});

export default function TabBar() {
    const { colors } = useTheme();

    return (
        <View style={[styles.tabBar, { backgroundColor: colors.nav_background }]}>
            <TabButton routeName="Article" label="Article" IconComponent={ArticleIcon} target="Article" />
            <TabButton routeName="Statistic" label="Statistic" IconComponent={StatisticIcon} target="Statistic" />
            <TabButton routeName="Home" label="Home" IconComponent={HomeIcon} target="Home" />
            <TabButton routeName="Reminder" label="Reminder" IconComponent={ReminderIcon} target="Reminder" />
            <TabButton routeName="Setting" label="Setting" IconComponent={SettingIcon} target="Setting" />
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: -10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 5,
        height: 75,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        height: 60,
    },
    tabText: {
        fontSize: 12,
        fontFamily: 'Cera_Bold',
    },
    selectedTabText: {
        fontSize: 13,
        fontFamily: 'Cera_Bold',
    },
    roundIcon: {
        width: windowWidth * 0.19,
        height: windowWidth * 0.19,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -windowWidth * 0.065,
        borderRadius: windowWidth * 0.095,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
    },
    smallIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#0ea6e9',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    icon1: {
        bottom: 15,
        left: windowWidth * 0.43,
        right: windowWidth * 0.5,
    },
    icon2: {
        bottom: -10,
        left: windowWidth * 0.26,
        right: windowWidth * 0.5,
    },
    icon3: {
        bottom: -10,
        left: windowWidth * 0.6,
        right: windowWidth * 0.5,
    },
});
