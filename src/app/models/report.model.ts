export interface Report {
  startDate: string;
  endDate: string;
  totalDays: number;
  completedDays: number;
  successRate: number;
  dailyProgress: DailyProgress[];
  categoryPerformance: Map<string, number>;
}

export interface DailyProgress {
  date: string;
  totalHabits: number;
  completedHabits: number;
  successRate: number;
}
