import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Workout } from '../models/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private initialData: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.initialData);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      if (!this.getFromStorage('workoutUsers')) {
        this.setToStorage('workoutUsers', this.initialData);
      }
      this.usersSubject.next(this.loadUsers());
    }
  }

  private getFromStorage(key: string): any {
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    }
    return null;
  }

  private setToStorage(key: string, data: any): void {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  private loadUsers(): User[] {
    return this.getFromStorage('workoutUsers') || this.initialData;
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(name: string, workout: Workout): void {
    if (this.isBrowser) {
      const users = this.loadUsers();
      const existingUser = users.find(u => u.name.toLowerCase() === name.toLowerCase());

      if (existingUser) {
        existingUser.workouts.push(workout);
      } else {
        const newUser: User = {
          id: users.length + 1,
          name,
          workouts: [workout]
        };
        users.push(newUser);
      }

      this.setToStorage('workoutUsers', users);
      this.usersSubject.next(users);
    }
  }

  addWorkoutToUser(userId: number, workout: Workout): void {
    if (this.isBrowser) {
      const users = this.loadUsers();
      const user = users.find(u => u.id === userId);
      if (user) {
        user.workouts.push(workout);
        this.setToStorage('workoutUsers', users);
        this.usersSubject.next(users);
      }
    }
  }

  deleteUser(userId: number): void {
    if (this.isBrowser) {
      const users = this.loadUsers();
      const updatedUsers = users.filter(user => user.id !== userId);
      this.setToStorage('workoutUsers', updatedUsers);
      this.usersSubject.next(updatedUsers);
    }
  }
}
