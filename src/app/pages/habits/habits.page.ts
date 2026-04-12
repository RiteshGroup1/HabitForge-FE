import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { AlertController, ModalController } from '@ionic/angular';

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
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
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

  async addHabit() {
    const alert = await this.alertCtrl.create({
      header: 'New Habit',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Habit Name e.g. Reading' },
        { name: 'category', type: 'text', placeholder: 'Category e.g. LEARNING' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { 
          text: 'Add', 
          handler: (data) => {
            const habit: any = { 
              name: data.name, 
              category: data.category || 'OTHER', 
              frequency: 'DAILY'
            };
            this.habitService.addHabit(habit).subscribe();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteHabit(habitId: number) {
    this.habitService.deleteHabit(habitId).subscribe();
  }

  doRefresh(event: any) {
    this.loadHabits();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
