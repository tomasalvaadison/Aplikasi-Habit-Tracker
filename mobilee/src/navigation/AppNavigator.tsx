import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from  '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

import { useAuth } from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import HabitDetailScreen from '../screens/HabitDetailScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
     <Tab.Navigator
       screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Statistics') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if  (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

             return <Ionicons name={iconName} size={size} color={color} />;
           },
           tabBarActiveTintColor: '#3B82F6',
           tabBarInactiveTintColor: '#9CA3AF',
           headerShown: false,
          })}
      >
       <Tab.Screen name="Home" component={HomeScreen} />
       <Tab.Screen name="Statistics" component={StatisticsScreen} />
       <Tab.Screen
