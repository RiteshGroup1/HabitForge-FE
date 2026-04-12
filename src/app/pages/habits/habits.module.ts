import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HabitListPage } from './habits.page';
import { AddHabitModalComponentModule } from './components/add-habit-modal/add-habit-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddHabitModalComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HabitListPage
      }
    ])
  ],
  declarations: [HabitListPage]
})
export class HabitListPageModule {}
