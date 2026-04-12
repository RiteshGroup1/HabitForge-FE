import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AddHabitModalComponent } from './add-habit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [AddHabitModalComponent],
  exports: [AddHabitModalComponent]
})
export class AddHabitModalComponentModule {}
