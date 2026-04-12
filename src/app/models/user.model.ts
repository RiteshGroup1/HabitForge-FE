export interface User {
  id: number;
  name: string;
  email: string;
  provider: 'GOOGLE' | 'LOCAL';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

export interface UserProgress {
  id: number;
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastUpdated: string;
  totalCompletedTasks: number;
  completionRatio: number;
}

export interface CategoryStats {
  categories: CategoryPerformance[];
  strongestCategory: string;
  weakestCategory: string;
  insight: string;
}

export interface CategoryPerformance {
  category: string;
  totalHabits: number;
  completedTasks: number;
  completionRate: number;
  percentage: number;
}
