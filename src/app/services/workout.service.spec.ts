import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { PLATFORM_ID } from '@angular/core';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(WorkoutService);
  });

  it('should add new user with workout', () => {
    service.addUser('Test User', { type: 'Running', minutes: 30 });
    service.getUsers().subscribe(users => {
      expect(users.find(u => u.name === 'Test User')).toBeTruthy();
    });
  });

  it('should combine workouts for existing user', () => {
    service.addUser('Test User', { type: 'Running', minutes: 30 });
    service.addUser('Test User', { type: 'Cycling', minutes: 45 });
    
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.name === 'Test User');
      expect(user?.workouts.length).toBe(2);
    });
  });
});
