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
