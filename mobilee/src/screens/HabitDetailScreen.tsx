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

