import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/workout';
import { WorkoutService } from '../../services/workout.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SumPipe } from '../../pipes/sum.pipe';
import { JoinPipe } from '../../pipes/join.pipe';
import { MapPipe } from '../../pipes/map.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
@Component({
  selector: 'app-workout-list',
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, SumPipe, JoinPipe
    ,MapPipe, MatButtonModule, MatIconModule
  ],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {

  displayedColumns: string[] = ['name', 'workoutType', 'minutes', 'actions'];
  dataSource!: MatTableDataSource<User>;
  workoutTypes: string[] = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];
  selectedType = 'All';

  deleteUser(userId: number): void {
    this.workoutService.deleteUser(userId);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.name.toLowerCase().includes(filter.toLowerCase());
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByType(): void {
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      if (filter === 'All') return true;
      return data.workouts.some(w => w.type === filter);
    };
    this.dataSource.filter = this.selectedType;
  }
}
