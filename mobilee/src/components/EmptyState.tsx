import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  style,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={64} color="#D1D5DB" />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}
