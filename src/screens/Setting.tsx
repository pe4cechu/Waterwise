import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import TabBar from '../components/TabBar';
import { useTheme } from '../contexts/ThemeContext';
import { useWaterTracker } from '../contexts/WaterTrackerContext';

export default function HistoryScreen() {
    const { isDarkTheme, toggleTheme, colors } = useTheme();
    const { selectedValue, maxLevel } = useWaterTracker();
    const [activeTab, setActiveTab] = useState('history');

    const weekDays = [
        { id: 1, label: 'CN', completed: true },
        { id: 2, label: 'T2', completed: true },
        { id: 3, label: 'T3', completed: true },
        { id: 4, label: 'T4', completed: true },
        { id: 5, label: 'T5', completed: true },
        { id: 6, label: 'T6', completed: false },
        { id: 7, label: 'T7', completed: false },
    ];

    const reports = [
        {
            id: 1,
            label: 'Trung bình tuần',
            value: '0 ml / Ngày',
            color: 'green',
        },
        {
            id: 2,
            label: 'Trung bình tháng',
            value: '0 ml / Ngày',
            color: 'orange',
        },
        { id: 3, label: 'Trung bình hoàn thành', value: '0%', color: 'red' },
        { id: 4, label: 'Tần suất uống', value: '0 lần / Ngày', color: 'blue' },
    ];

    const renderWeekDay = ({ item }: { item: any }) => (
        <View
            style={[
                styles.weekDay,
                item.completed ? styles.completedDay : styles.incompleteDay,
            ]}
        >
            <Text style={styles.weekDayText}>{item.label}</Text>
        </View>
    );

    const renderReportItem = ({ item }: { item: any }) => (
        <View style={styles.reportItem}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={[styles.reportLabel, { color: colors.text }]}>
                {item.label}
            </Text>
            <Text style={styles.reportValue}>{item.value}</Text>
        </View>
    );

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            {/* Tab Header */}
            <View style={styles.tabHeader}>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab('history')}
                >
                    <Text
                        style={
                            activeTab === 'history'
                                ? styles.activeTabText
                                : styles.inactiveTabText
                        }
                    >
                        Lịch sử
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab('settings')}
                >
                    <Text
                        style={
                            activeTab === 'settings'
                                ? styles.activeTabText
                                : styles.inactiveTabText
                        }
                    >
                        Cài đặt
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'history' ? (
                <>
                    <View style={styles.weekDaysContainer}>
                        <Text style={styles.weekDaysTitle}>
                            Hoàn thành hàng tuần
                        </Text>
                        <FlatList
                            horizontal
                            data={weekDays}
                            renderItem={renderWeekDay}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.weekDaysList}
                        />
                    </View>

                    <View style={styles.reportHeader}>
                        <Text
                            style={[
                                styles.reportHeaderTitle,
                                { color: colors.text },
                            ]}
                        >
                            Báo cáo lượng nước
                        </Text>
                    </View>

                    <View style={styles.reportContainer}>
                        <FlatList
                            data={reports}
                            renderItem={renderReportItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.reportList}
                        />
                    </View>
                </>
            ) : (
                <View style={styles.settingsContainer}>
                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: colors.text },
                            ]}
                        >
                            Cài đặt nhắc nhở
                        </Text>

                        <View style={styles.option}>
                            <Text
                                style={[
                                    styles.optionText,
                                    { color: colors.text },
                                ]}
                            >
                                Chế độ nhắc nhở
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: colors.text },
                            ]}
                        >
                            Cài đặt chung
                        </Text>

                        <TouchableOpacity
                            style={styles.unitOption}
                            onPress={toggleTheme}
                        >
                            <Text
                                style={[
                                    styles.unitText,
                                    { color: colors.text },
                                ]}
                            >
                                Chế độ sáng tối
                            </Text>
                            <Text
                                style={[
                                    styles.unitText,
                                    { color: colors.primary },
                                ]}
                            >
                                {isDarkTheme ? 'Dark' : 'Light'}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.unitOption}>
                            <Text
                                style={[
                                    styles.unitText,
                                    { color: colors.text },
                                ]}
                            >
                                Đơn vị
                            </Text>
                            <Text
                                style={[
                                    styles.unitText,
                                    { color: colors.primary },
                                ]}
                            >
                                {selectedValue === 'bottle'
                                    ? 'Bottle'
                                    : 'ml'}
                            </Text>
                        </View>
                        <View style={styles.unitOption}>
                            <Text
                                style={[
                                    styles.unitText,
                                    { color: colors.text },
                                ]}
                            >
                                Mục tiêu uống
                            </Text>
                            <Text
                                style={[
                                    styles.unitText,
                                    { color: colors.primary },
                                ]}
                            >
                                {maxLevel * 200}ml
                            </Text>
                        </View>
                    </View>
                </View>
            )}
            <TabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    tabHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        height: 96,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    activeTabText: {
        color: '#1976D2',
        fontWeight: 'bold',
        fontSize: 18,
    },
    inactiveTabText: {
        color: '#888',
        fontSize: 18,
    },
    weekDaysContainer: {
        backgroundColor: '#1976D2',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekDaysTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF',
        textAlign: 'left',
        marginBottom: 10,
    },
    weekDaysList: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    weekDay: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    completedDay: {
        backgroundColor: '#FFF',
    },
    incompleteDay: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    weekDayText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1976D2',
    },
    reportHeader: {
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 15,
        marginTop: 18,
    },
    reportHeaderTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 16,
    },
    reportContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    reportList: {
        marginTop: 10,
    },
    reportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 15,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    reportLabel: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    reportValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1976D2',
    },
    settingsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsText: {
        fontSize: 18,
        color: '#888',
    },
    section: {
        marginBottom: 20,
        width: '100%',
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        width: '100%',
        marginLeft: 16,
    },

    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        justifyContent: 'flex-start',
    },

    optionText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'left',
        width: '100%',
        marginLeft: 16,
    },
    unitOption: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    unitText: {
        fontSize: 16,
        color: '#1976D2',
    },
});
