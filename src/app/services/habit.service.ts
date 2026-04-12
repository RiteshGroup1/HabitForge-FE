import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Habit, HabitLog, TodayStats } from '../models/habit.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  public habits$ = this.habitsSubject.asObservable();
  private apiUrl = `${environment.apiUrl}/habits`;

  constructor(private http: HttpClient) {}

  // Fetch all habits for user
  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.apiUrl}/all`).pipe(
      tap(habits => this.habitsSubject.next(habits))
    );
  }

  getHabitById(id: number): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/${id}`);
  }

  addHabit(habit: any): Observable<Habit> {
    return this.http.post<Habit>(this.apiUrl, habit).pipe(
      tap(() => this.getHabits().subscribe())
    );
  }

  updateHabit(id: number, habit: any): Observable<Habit> {
    return this.http.put<Habit>(`${this.apiUrl}/${id}`, habit).pipe(
      tap(() => this.getHabits().subscribe())
    );
  }

  deleteHabit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getHabits().subscribe())
    );
  }

  // Log habit status for a specific date
  logHabit(habitId: number, status: boolean): Observable<HabitLog> {
    const log: Partial<HabitLog> = { 
      habitId, 
      date: new Date().toISOString().split('T')[0], 
      status 
    };
    return this.toggleCompletion(habitId, log);
  }

  // Toggle completion for today
  toggleCompletion(habitId: number, log: Partial<HabitLog>): Observable<HabitLog> {
    return this.http.post<HabitLog>(`${environment.apiUrl}/habit-log`, log).pipe(
      tap(() => this.getHabits().subscribe())
    );
  }

  getHabitLogs(habitId: number): Observable<HabitLog[]> {
    return this.http.get<HabitLog[]>(`${environment.apiUrl}/habit-log/habit/${habitId}`);
  }

  getTodayStats(): Observable<TodayStats> {
    return this.http.get<TodayStats>(`${environment.apiUrl}/habit-log/stats/today`);
  }
}
