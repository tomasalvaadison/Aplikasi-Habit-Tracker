import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { habitAPI } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
  '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
];

export default function AddHabitScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [targetDays, setTargetDays] = useState('30');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{title?: string}>({});

    const navigation = useNavigation();

    const validateForm = () => {
    const newErrors: {title?: string} = {};

          if (!title.trim()) {
      newErrors.title = 'Habit title is required';
    }

  
