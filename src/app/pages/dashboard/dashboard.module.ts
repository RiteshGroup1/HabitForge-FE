import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { AddHabitModalComponentModule } from '../habits/components/add-habit-modal/add-habit-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddHabitModalComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPage
      }
    ])
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
