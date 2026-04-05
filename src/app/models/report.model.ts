export interface WeeklyReport {
  weekStarting: string;
  data: number[]; // counts of completed habits per day Mon-Sun
  labels: string[]; // ["Mon", "Tue", ...]
  totalCompleted: number;
  successRate: number;
}

export interface MonthlyReport {
  month: string;
  year: number;
  totalCompleted: number;
  completionRate: number;
  data: { date: string; count: number }[];
}

export interface CategoryAnalytics {
  category: string;
  successRate: number;
  streak: number;
  color: string;
  icon: string;
}
