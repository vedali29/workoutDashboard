import { Component, OnInit, PLATFORM_ID, Inject, ViewChild, ElementRef } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../models/workout';
Chart.register(...registerables);

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- User Selection -->
      <div class="flex gap-4 mb-6 overflow-x-auto">
        <button 
          *ngFor="let user of users" 
          (click)="selectUser(user.id)"
          [class.bg-blue-500]="selectedUserId === user.id"
          [class.text-white]="selectedUserId === user.id"
          class="px-4 py-2 rounded-full transition-colors duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{user.name}}
        </button>
      </div>

      <!-- Chart Container -->
      <div class="h-[400px] w-full">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `
})
export class WorkoutChartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  
  users: any[] = [];
  selectedUserId: number = 0;
  chart: Chart | null = null;
  isBrowser: boolean;

  constructor(
    private workoutService: WorkoutService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.workoutService.getUsers().subscribe(users => {
        this.users = users;
        const defaulthUser = users[0];
        if(defaulthUser){
          this.selectedUserId = defaulthUser.id;
          this.createChart();
        }
      });
    }
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart(): void {
    if (!this.chartCanvas) return;

    const selectedUser = this.users.find(u => u.id === this.selectedUserId);
    if (!selectedUser) return;

    const workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
    const workoutMinutes = workoutTypes.map(type => 
      selectedUser.workouts
        .filter((w: Workout) => w.type === type)
        .reduce((acc: number, curr: Workout) => acc + curr.minutes, 0)
    );

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [{
          label: `${selectedUser.name}'s Workout Minutes`,
          data: workoutMinutes,
          backgroundColor: [
            '#60A5FA', // blue-400
            '#34D399', // green-400
            '#F87171', // red-400
            '#FBBF24'  // yellow-400
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Minutes'
            }
          }
        }
      }
    });
  }
}
