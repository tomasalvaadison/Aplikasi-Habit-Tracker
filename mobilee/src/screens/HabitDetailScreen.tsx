import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { habitAPI, logAPI } from '../services/api';
import { Habit, HabitLog } from '../types';

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
        <View style={styles.statCard}>
          <Ionicons name="flame" size={32} color="#EF4444" />
          <Text style={styles.statValue}>{habit.current_streak}</Text>
          <Text style={styles.statLabel}>Current Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={32} color="#10B981" />
          <Text style={styles.statValue}>{habit.total_completions}</Text>
          <Text style={styles.statLabel}>Total Done</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={32} color="#F59E0B" />
          <Text style={styles.statValue}>{habit.target_days}</Text>
          <Text style={styles.statLabel}>Target Days</Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
});