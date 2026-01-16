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

