import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from  '@expo/vector-icons';

import { useAuth } from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import
