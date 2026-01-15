import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  isCompletedToday: boolean;
  onPress: () => void;
  onLongPress: () => void;
  onToggle: () => void;
}

export default function HabitCard({
  habit,
  isCompletedToday,
  onPress,
  onLongPress,
  onToggle,
}: HabitCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: habit.color }]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.title}>{habit.title}</Text>
          {habit.description && (
            <Text style={styles.description}>{habit.description}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={onToggle}
          style={[
            styles.checkButton,
            isCompletedToday && { backgroundColor: habit.color },
          ]}
        >
          {isCompletedToday && (
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Ionicons name="flame" size={16} color="#EF4444" />
          <Text style={styles.statText}>{habit.current_streak} days</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.statText}>
            {habit.total_completions} completed
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
