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
    const numId = parseInt(id, 10);
    this.isLoading = true;
    this.habitService.getHabitById(numId).subscribe(habit => {
      this.habit = habit;
      this.loadHistory(numId);
    });
  }

  loadHistory(id: number) {
    this.habitService.getHabitLogs(id).subscribe(logs => {
      this.history = logs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.isLoading = false;
    });
  }

  onToggleStatus(status: boolean) {
    if (this.habit) {
      this.habitService.logHabit(this.habit.id, status).subscribe(() => {
        this.habit!.completedToday = status;
        this.loadHistory(this.habit!.id);
      });
    }
  }

  formatDate(dateStr: string): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }
}
