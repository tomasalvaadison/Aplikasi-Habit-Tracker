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
}: StatCardProps) {
  return (
    <View style={[styles.card, style]}>
      {iconBackgroundColor ? (
        <View style={[styles.iconCircle, { backgroundColor: iconBackgroundColor }]}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
      ) : (
        <Ionicons name={icon} size={32} color={iconColor} />
      )}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
