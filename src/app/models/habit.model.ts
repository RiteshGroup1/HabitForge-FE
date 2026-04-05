export interface Habit {
  id?: string;
  name: string;
  category: string;
  frequency: string; // DAILY, WEEKLY, etc.
  description?: string;
  userId: string;
  completedToday?: boolean;
}

export interface HabitLog {
  id?: string;
  habitId: string;
  date: string;
  isCompleted: boolean;
}
