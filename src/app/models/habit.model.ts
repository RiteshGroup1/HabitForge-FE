export interface Habit {
  id: number;
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  createdAt: string;
  completedToday?: boolean; // Virtual property for UI
}

export type HabitCategory = 'HEALTH' | 'FITNESS' | 'LEARNING' | 'CAREER' | 'PRODUCTIVITY' | 'SOCIAL' | 'FINANCIAL' | 'SPIRITUAL' | 'CREATIVE' | 'OTHER';
export type HabitFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface HabitLog {
  id?: number;
  habitId: number;
  date: string; // ISO yyyy-MM-dd
  status: boolean;
  createdAt?: string;
}

export interface TodayStats {
  completed: number;
  total: number;
  percentage: number;
}
