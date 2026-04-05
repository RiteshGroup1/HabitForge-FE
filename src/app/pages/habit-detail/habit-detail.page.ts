import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitService } from '../../services/habit.service';
import { Habit, HabitLog } from '../../models/habit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.page.html',
  styleUrls: ['./habit-detail.page.scss'],
  standalone: false
})
export class HabitDetailPage implements OnInit {
  habit: Habit | null = null;
  history: HabitLog[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private habitService: HabitService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHabit(id);
    }
  }

  loadHabit(id: string) {
    this.isLoading = true;
    this.habitService.getHabitById(id).subscribe(habit => {
      this.habit = habit;
      this.loadHistory(id);
    });
  }

  loadHistory(id: string) {
    this.habitService.getHabitHistory(id).subscribe(logs => {
      this.history = logs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.isLoading = false;
    });
  }

  onToggleStatus(isCompleted: boolean) {
    if (this.habit) {
      this.habitService.logHabit(this.habit.id!, isCompleted).subscribe(() => {
        this.habit!.completedToday = isCompleted;
        this.loadHistory(this.habit!.id!);
      });
    }
  }

  formatDate(dateStr: string): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }
}
