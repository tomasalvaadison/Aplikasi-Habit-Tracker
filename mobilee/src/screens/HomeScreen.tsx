import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { habitAPI, logAPI, quoteAPI } from '../services/api';
import { Habit, Quote } from '../types';
import HabitCard from '../components/HabitCard';
import EmptyState from '../components/EmptyState';

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { habitAPI, logAPI, quoteAPI } from '../services/api';
import { Habit, Quote } from '../types';
import HabitCard from '../components/HabitCard';
import EmptyState from '../components/EmptyState';

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const [habitsRes, quoteRes] = await Promise.all([
        habitAPI.getAll(),
        quoteAPI.getRandom(),
      ]);
      setHabits(habitsRes.data);
      setQuote(quoteRes.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const toggleHabit = async (habitId: number) => {
    try {
      await logAPI.toggle(habitId, {});
      loadData();
    } catch (error) {
      Alert.alert('Error', 'Failed to update habit');
    }
  };
  const deleteHabit = (habitId: number) => {
    Alert.alert('Delete Habit', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await habitAPI.delete(habitId);
            loadData();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete habit');
          }
        },
      },
    ]);
  };
  const renderHabit = ({ item }: { item: Habit }) => {
    const today = new Date().toISOString().split('T')[0];
    const isCompletedToday = item.last_completed === today;
    return (
      <HabitCard
        habit={item}
        isCompletedToday={isCompletedToday}
        onPress={() => navigation.navigate('HabitDetail', { habitId: item.id })}
        onLongPress={() => deleteHabit(item.id)}
        onToggle={() => toggleHabit(item.id)}
      />
    );
  };
