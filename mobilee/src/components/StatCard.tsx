import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackgroundColor?: string;
  value: string | number;
  label: string;
  style?: ViewStyle;
}

export default function StatCard({
  icon,
  iconColor,
  iconBackgroundColor,
  value,
  label,
  style,
}:
