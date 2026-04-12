import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AddHabitModalComponent } from './components/add-habit-modal/add-habit-modal.component';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
  standalone: false
})
export class HabitListPage implements OnInit {
  habits: Habit[] = [];
  isLoading = true;

  constructor(
    private habitService: HabitService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.habitService.habits$.subscribe(habits => {
      this.habits = habits;
    });
    this.loadHabits();
  }

  loadHabits() {
    this.isLoading = true;
    this.habitService.getHabits().subscribe({
      next: (habits) => {
        this.habits = habits;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  async openHabitModal(habit?: Habit) {
    const modal = await this.modalCtrl.create({
      component: AddHabitModalComponent,
      componentProps: { habit },
      breakpoints: [0, 0.8, 1],
      initialBreakpoint: 0.8,
      handle: true
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      if (data.delete) {
        this.deleteHabit(habit!.id!);
      } else if (habit) {
        // Handle Update
        this.habitService.updateHabit(habit.id!, data).subscribe({
          next: () => this.showToast('Habit reforged successfully!', 'success'),
          error: () => this.showToast('Failed to update habit.', 'danger')
        });
      } else {
        // Handle Create
        this.habitService.addHabit(data).subscribe({
          next: () => this.showToast('Habit ignited successfully!', 'success'),
          error: () => this.showToast('Failed to create habit.', 'danger')
        });
      }
    }
  }

  async deleteHabit(habitId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Erase Habit?',
      message: 'This will permanently remove your progress for this habit. Are you sure?',
      buttons: [
        { text: 'Keep It', role: 'cancel' },
        {
          text: 'Erase',
          role: 'destructive',
          handler: () => {
            this.habitService.deleteHabit(habitId).subscribe({
              next: () => {
                this.showToast('Habit erased from the forge.', 'medium');
              },
              error: () => {
                this.showToast('Error removing habit.', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
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

  doRefresh(event: any) {
    this.loadHabits();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
