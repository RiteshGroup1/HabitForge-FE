import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { AuthService } from '../../services/auth.service';
import { Habit, HabitLog } from '../../models/habit.model';
import { User } from '../../models/user.model';
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
  todayHabits: Habit[] = [];
  completionPercentage: number = 0;
  isLoading = true;
  habitsRemaining = 0;

  constructor(
    private habitService: HabitService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    
    // Use combineLatest + take(1) so it doesn't wait for completion of the Subjects
    combineLatest({
      user: this.authService.user$,
      habits: this.habitService.getHabits()
    }).pipe(take(1)).subscribe({
      next: (data) => {
        this.user = data.user;
        this.todayHabits = data.habits;
        this.calculateProgress();
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  calculateProgress() {
    if (this.todayHabits.length === 0) {
      this.completionPercentage = 0;
      this.habitsRemaining = 0;
      return;
    }
    const completed = this.todayHabits.filter(h => h.completedToday).length;
    this.habitsRemaining = this.todayHabits.length - completed;
    this.completionPercentage = (completed / this.todayHabits.length) * 100;
  }

  toggleHabit(habit: Habit) {
    const isCompleted = !habit.completedToday;
    const log: HabitLog = {
      habitId: habit.id!,
      date: new Date().toISOString().split('T')[0],
      isCompleted: isCompleted
    };

    this.habitService.toggleCompletion(habit.id!, log).subscribe(() => {
      this.loadData(); // Re-fetch to update streaks/progress
    });
  }

  doRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
