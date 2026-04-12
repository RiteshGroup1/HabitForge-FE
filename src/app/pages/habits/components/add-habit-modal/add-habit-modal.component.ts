import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Habit, HabitCategory } from '../../../../models/habit.model';

@Component({
  selector: 'app-add-habit-modal',
  templateUrl: './add-habit-modal.component.html',
  styleUrls: ['./add-habit-modal.component.scss'],
  standalone: false
})
export class AddHabitModalComponent implements OnInit {
  @Input() habit?: Habit;
  
  habitForm: FormGroup;
  categories: HabitCategory[] = [
    'OTHER', 'PRODUCTIVITY', 'FITNESS', 'FINANCIAL', 'HEALTH', 
    'SOCIAL', 'CAREER', 'SPIRITUAL', 'LEARNING', 'CREATIVE'
  ];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.habitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(200)]],
      category: ['OTHER', Validators.required],
      frequency: ['DAILY', Validators.required]
    });
  }

  ngOnInit() {
    if (this.habit) {
      this.habitForm.patchValue({
        name: this.habit.name,
        description: this.habit.description,
        category: this.habit.category,
        frequency: this.habit.frequency
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.habitForm.valid) {
      this.modalCtrl.dismiss(this.habitForm.value);
    }
  }

  delete() {
    this.modalCtrl.dismiss({ delete: true });
  }
}
