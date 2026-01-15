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

