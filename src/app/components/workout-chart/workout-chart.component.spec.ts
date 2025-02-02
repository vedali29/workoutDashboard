import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { WorkoutService } from '../../services/workout.service';
import { PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;
  
  beforeEach(async () => {
    const mockWorkoutService = {
      getUsers: () => new BehaviorSubject([{
        id: 1,
        name: 'Test User',
        workouts: [{ type: 'Running', minutes: 30 }]
      }]).asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [WorkoutChartComponent],
      providers: [
        { provide: WorkoutService, useValue: mockWorkoutService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
