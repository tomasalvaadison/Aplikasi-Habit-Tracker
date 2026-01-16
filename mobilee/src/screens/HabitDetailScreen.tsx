import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRoute, useNavigation } from '@react-navigation/native';
import { habitAPI, logAPI } from '../services/api';
import { Habit, HabitLog } from '../types';
import StatCard from '../components/StatCard';

export default function HabitDetailScreen() {
  const [habit, setHabit] = useState<Habit | null>(null);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [markedDates, setMarkedDates] = useState({});
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { habitId } = route.params;

    useEffect(() => {
    loadData();
  }, []);

    const loadData = async () => {
    try {
      const [habitRes, logsRes] = await Promise.all([
        habitAPI.getById(habitId),
        logAPI.getHabitLogs(habitId),
      ]);

            setHabit(habitRes.data);
      setLogs(logsRes.data);

            const marked: any = {};
      logsRes.data.forEach((log: HabitLog) => {
        marked[log.completed_date] = {
          selected: true,
          selectedColor: habitRes.data.color,
        };
      });

            setMarkedDates(marked);
    } catch (error) {
      Alert.alert('Error', 'Failed to load habit details');
    }
  };

    const onDayPress = async (day: any) => {
    try {
      await logAPI.toggle(habitId, { date: day.dateString });
      loadData();
    } catch (error) {
      Alert.alert('Error', 'Failed to update log');
    }
  };

    if (!habit) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: habit.color }]}>
        <Text style={styles.title}>{habit.title}</Text>
        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}
      </View>
      <View style={styles.statsContainer}>
        <StatCard
          icon="flame"
          iconColor="#EF4444"
          value={habit.current_streak}
          label="Current Streak"
        />
        <StatCard
          icon="checkmark-circle"
          iconColor="#10B981"
          value={habit.total_completions}
          label="Total Done"
        />
        <StatCard
          icon="trophy"
          iconColor="#F59E0B"
          value={habit.target_days}
          label="Target Days"
        />
      </View>
      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>Calendar</Text>
        <Calendar
          markedDates={markedDates}
          onDayPress={onDayPress}
          theme={{
            todayTextColor: habit.color,
            arrowColor: habit.color,
          }}
        />
      </View>
    </ScrollView>
  );
}


