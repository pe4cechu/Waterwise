import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabBar from '../components/TabBar';
import { useTheme } from '../contexts/ThemeContext';

type RootStackParamList = {
    Article: undefined;
    WebViewScreen: { link: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Article'>;

const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 60;

export default function Statistic() {
    const { colors } = useTheme();
    const [dailyStats, setDailyStats] = useState([]);
    const [weeklyAverage, setWeeklyAverage] = useState('Not enough data');
    const [monthlyAverage, setMonthlyAverage] = useState('Not enough data');
    const [completionRate, setCompletionRate] = useState('Not enough data');
    const [drinkFrequency, setDrinkFrequency] = useState('Not enough data');
    const [mostDrink, setMostDrink] = useState('Not enough data');
    const [highestVolume, setHighestVolume] = useState('Not enough data');
    const [activeSection, setActiveSection] = useState('days');

    useEffect(() => {
        const fetchDailyStats = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const stats = [];
                for (const key of keys) {
                    if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        const data = await AsyncStorage.getItem(key);
                        if (data) {
                            stats.push({ date: key, ...JSON.parse(data) });
                        }
                    }
                }
                setDailyStats(stats);
                calculateStatistics(stats);
            } catch (e) {
                console.error('Failed to fetch daily stats.', e);
            }
        };

        fetchDailyStats();
    }, []);

    const calculateStatistics = (stats) => {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);

        const weeklyStats = stats.filter(stat => new Date(stat.date) >= weekAgo);
        const monthlyStats = stats.filter(stat => new Date(stat.date) >= monthAgo);

        if (weeklyStats.length >= 7) {
            const totalDrank = weeklyStats.reduce((sum, stat) => sum + stat.drank, 0);
            setWeeklyAverage(`${(totalDrank / 7).toFixed(2)} ml / day`);
        } else {
            setWeeklyAverage('Not enough data');
        }

        if (monthlyStats.length >= 30) {
            const totalDrank = monthlyStats.reduce((sum, stat) => sum + stat.drank, 0);
            setMonthlyAverage(`${(totalDrank / 30).toFixed(2)} ml / day`);
        } else {
            setMonthlyAverage('Not enough data');
        }

        if (stats.length > 0) {
            const totalDrank = stats.reduce((sum, stat) => sum + stat.drank, 0);
            const totalDays = stats.length;
            setCompletionRate(`${((totalDrank / (totalDays * 2000)) * 100).toFixed(2)}%`);
            const totalDrinks = stats.reduce((sum, stat) => sum + stat.count, 0);
            setDrinkFrequency(`${(totalDrinks / totalDays).toFixed(2)} times / day`);

            const mostDrinkDay = stats.reduce((max, stat) => stat.drank > max.drank ? stat : max, stats[0]);
            setMostDrink(`${mostDrinkDay.date}: ${mostDrinkDay.drank} ml`);

            const highestVolumeDay = stats.reduce((max, stat) => stat.count > max.count ? stat : max, stats[0]);
            setHighestVolume(`${highestVolumeDay.date}: ${highestVolumeDay.count} drinks`);
        }
    };

    const sections = [
        {
            id: 'days',
            title: 'Days',
            onPress: () => setActiveSection('days'),
        },
        {
            id: 'weeks',
            title: 'Weeks',
            onPress: () => setActiveSection('weeks'),
        },
        {
            id: 'months',
            title: 'Months',
            onPress: () => setActiveSection('months'),
        },
        { id: 'all', title: 'All', onPress: () => setActiveSection('all') },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={[styles.itemText, { color: colors.text }]}>
                {item.date}: {item.drank} ml, {item.count} drinks
            </Text>
        </View>
    );

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                        height: screenHeight - tabBarHeight,
                    },
                ]}
            >
                <Text style={[styles.header, { color: colors.text }]}>
                    Statistic
                </Text>
                <View
                    style={[
                        styles.horizontalBar,
                        { backgroundColor: colors.sub_background },
                    ]}
                >
                    {sections.map((section, index) => (
                        <TouchableOpacity
                            key={section.id}
                            style={[
                                styles.barItem,
                                index === sections.length - 1 &&
                                    styles.lastBarItem,
                                { borderRightColor: colors.background },
                            ]}
                            onPress={section.onPress}
                        >
                            <Text
                                style={[
                                    styles.barItemText,
                                    { color: colors.text },
                                ]}
                            >
                                {section.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <FlatList
                    data={dailyStats}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.date}
                />
                {activeSection === 'weeks' && (
                    <View style={styles.statisticsContainer}>
                        <Text style={[styles.statisticsText, { color: colors.text }]}>
                            Weekly Average: {weeklyAverage}
                        </Text>
                    </View>
                )}
                {activeSection === 'months' && (
                    <View style={styles.statisticsContainer}>
                        <Text style={[styles.statisticsText, { color: colors.text }]}>
                            Monthly Average: {monthlyAverage}
                        </Text>
                    </View>
                )}
                {(activeSection === 'weeks' || activeSection === 'months') && (
                    <View style={styles.statisticsContainer}>
                        <Text style={[styles.statisticsText, { color: colors.text }]}>
                            Completion Rate: {completionRate}
                        </Text>
                        <Text style={[styles.statisticsText, { color: colors.text }]}>
                            Drink Frequency: {drinkFrequency}
                        </Text>
                        <Text style={[styles.statisticsText, { color: colors.text }]}>
                            Most Drink: {mostDrink}
                        </Text>
                        <Text style={[styles.statisticsText, { color: colors.text }]}>
                            Highest Volume: {highestVolume}
                        </Text>
                    </View>
                )}
            </View>
            <TabBar />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontFamily: 'Cera_Black',
        textAlign: 'left',
        marginLeft: 28,
        marginTop: 10,
    },
    horizontalBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        marginVertical: 20,
        alignSelf: 'center',
    },
    barItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        height: '100%',
        borderRightWidth: 2,
    },
    lastBarItem: {
        borderRightWidth: 0,
    },
    barItemText: {
        fontSize: 16,
        fontFamily: 'Cera_Bold',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Cera_Bold',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'Cera_Regular',
    },
    statisticsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    statisticsText: {
        fontSize: 16,
        fontFamily: 'Cera_Regular',
        marginBottom: 10,
    },
});
