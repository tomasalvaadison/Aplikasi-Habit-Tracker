export interface Habit {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  color: string;
  icon: string;
  frequency: 'daily' | 'weekly';
  target_days: number;
  current_streak: number;
  total_completions: number;
  last_completed?: string;
  created_at: string;
}

export interface HabitLog {
  id: number;
  habit_id: number;
  completed_date: string;
  notes?: string;
  created_at: string;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface Statistics {
  totalHabits: number;
  totalCompletions: number;
  thisMonth: number;
  last7Days: Array<{ completed_date: string; count: number }>;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AddHabit: undefined;
  EditHabit: { habitId: number };
  HabitDetail: { habitId: number };
};

export type MainTabParamList = {
  Home: undefined;
  Statistics: undefined;
  Profile: undefined;
};
