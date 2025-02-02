import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../../services/workout.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['addUser']);
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: WorkoutService, useValue: spy }
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate form inputs', () => {
    const form = component.workoutForm;
    expect(form.valid).toBeFalsy();
    
    form.controls['name'].setValue('John');
    form.controls['type'].setValue('Running');
    form.controls['minutes'].setValue(30);
    
    expect(form.valid).toBeTruthy();
  });

  it('should call service on form submit', () => {
    const form = component.workoutForm;
    form.controls['name'].setValue('John');
    form.controls['type'].setValue('Running');
    form.controls['minutes'].setValue(30);
    
    component.onSubmit();
    
    expect(workoutService.addUser).toHaveBeenCalledWith('John', {
      type: 'Running',
      minutes: 30
    });
  });
});
