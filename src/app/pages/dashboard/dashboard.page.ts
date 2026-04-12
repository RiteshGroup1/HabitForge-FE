import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { AuthService } from '../../services/auth.service';
import { Habit, HabitLog, TodayStats } from '../../models/habit.model';
import { User, UserProgress } from '../../models/user.model';
import { ProgressService } from '../../services/progress.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AddHabitModalComponent } from '../habits/components/add-habit-modal/add-habit-modal.component';
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
    private progressService: ProgressService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
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

  async addHabit() {
    const modal = await this.modalCtrl.create({
      component: AddHabitModalComponent,
      breakpoints: [0, 0.8, 1],
      initialBreakpoint: 0.8,
      handle: true
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.habitService.addHabit(data).subscribe({
        next: () => {
          this.showToast('Habit ignited!', 'success');
          this.loadData(); // Refresh dashboard
        },
        error: () => this.showToast('Failed to create habit.', 'danger')
      });
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
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
