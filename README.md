# Workout Tracker Dashboard

A modern Angular application for tracking and visualizing workout data with interactive charts and real-time filtering.

## Features

- **User Management**
  - Add new users with workout details
  - Delete existing users
  - Combine workouts for users with same name
  - Real-time data updates

- **Workout Tracking**
  - Support for multiple workout types (Running, Cycling, Swimming, Yoga)
  - Track workout duration in minutes
  - Automatic total time calculation

- **Data Visualization**
  - Interactive charts showing workout distribution
  - Real-time chart updates
  - Visual breakdown by workout type

- **Advanced Filtering**
  - Search users by name
  - Filter by workout type
  - Paginated results

## Tech Stack

- Angular 19
- Chart.js for data visualization
- Angular Material for UI components
- TypeScript
- RxJS for state management
- Local Storage for data persistence

src/
├── app/
│   ├── components/
│   │   ├── workout-form/
│   │   ├── workout-list/
│   │   └── workout-chart/
│   ├── services/
│   │   └── workout.service.ts
│   └── models/
│       └── workout.ts


## Key Components##
WorkoutFormComponent: Handles user and workout data input
WorkoutListComponent: Displays workout data in a filterable table
WorkoutChartComponent: Visualizes workout statistics
WorkoutService: Manages data and state
