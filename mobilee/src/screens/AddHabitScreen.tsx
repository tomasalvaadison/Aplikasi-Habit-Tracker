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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

          setLoading(true);
    try {
      await habitAPI.create({
        title: title.trim(),
        description: description.trim(),
        color: selectedColor,
        target_days: parseInt(targetDays) || 30,
      });

            navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create habit');
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Input
          label="Habit Title *"
          placeholder="e.g., Drink 8 glasses of water"
          value={title}
          onChangeText={setTitle}
          error={errors.title}
        />
        <Input
          label="Description"
          placeholder="Add some notes about this habit..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={styles.textArea}
        />
        <Text style={styles.label}>Color</Text>
        <View style={styles.colorGrid}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                selectedColor === color && styles.colorSelected,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
        <Input
          label="Target Days"
          placeholder="30"
          value={targetDays}
          onChangeText={setTargetDays}
          keyboardType="numeric"
        />
        <Button
          title="Create Habit"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
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

  
