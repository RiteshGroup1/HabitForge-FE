import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { AuthService } from '../../services/auth.service';
import { Habit, HabitLog, TodayStats } from '../../models/habit.model';
import { User, UserProgress } from '../../models/user.model';
import { ProgressService } from '../../services/progress.service';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  user: User | null = null;
  progress: UserProgress | null = null;
  todayHabits: Habit[] = [];
  todayStats: TodayStats | null = null;
  isLoading = true;

  constructor(
    private habitService: HabitService,
    private authService: AuthService,
    private progressService: ProgressService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    
    combineLatest({
      user: this.authService.user$.pipe(take(1)),
      habits: this.habitService.getHabits().pipe(take(1)),
      progress: this.progressService.fetchProgress().pipe(take(1)),
      stats: this.habitService.getTodayStats().pipe(take(1))
    }).subscribe({
      next: (data) => {
        this.user = data.user;
        this.todayHabits = data.habits;
        this.progress = data.progress;
        this.todayStats = data.stats;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  toggleHabit(habit: Habit) {
    const newStatus = !habit.completedToday;
    
    this.habitService.logHabit(habit.id, newStatus).subscribe(() => {
      this.loadData();
    });
  }

  doRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
