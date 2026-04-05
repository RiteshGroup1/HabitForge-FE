export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  totalPoints: number;
  currentLevel: number;
  xpProgress: number;
  currentStreak: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface HabitProgress {
  category: string;
  totalHabits: number;
  completedHabits: number;
  completionRate: number;
}
