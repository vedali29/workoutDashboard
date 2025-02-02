import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-workout-form',
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInputModule
  ],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
  //template -- can directly write html code here
  //styles -- ['.text-danger {color: blue}'] -- directly can add css
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const { name, type, minutes } = this.workoutForm.value;
      this.workoutService.addUser(name, { type, minutes });
      this.workoutForm.reset();
    }
  }
}
