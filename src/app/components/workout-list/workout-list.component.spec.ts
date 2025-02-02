import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../services/workout.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/workout';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  const usersSubject = new BehaviorSubject<User[]>([]);

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['getUsers', 'deleteUser']);
    spy.getUsers.and.returnValue(usersSubject);
    
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule],
      declarations: [WorkoutListComponent],
      providers: [{ provide: WorkoutService, useValue: spy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter users by name', () => {
    const testUsers: User[] = [
      { id: 1, name: 'John', workouts: [] },
      { id: 2, name: 'Jane', workouts: [] }
    ];
    
    usersSubject.next(testUsers);
    fixture.detectChanges();
    
    const event = { target: { value: 'Jo' } } as any;
    component.applyFilter(event);
    
    expect(component.dataSource.filteredData.length).toBe(1);
  });
});
