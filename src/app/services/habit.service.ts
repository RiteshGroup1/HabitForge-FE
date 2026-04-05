import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Habit, HabitLog } from '../models/habit.model';
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
    return this.http.get<Habit[]>(this.apiUrl).pipe(
      tap(habits => this.habitsSubject.next(habits))
    );
  }

  getHabitById(id: string): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/${id}`);
  }

  addHabit(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(this.apiUrl, habit).pipe(
      tap(() => this.getHabits().subscribe()) // Refresh habits list
    );
  }

  updateHabit(id: string, habit: Habit): Observable<Habit> {
    return this.http.put<Habit>(`${this.apiUrl}/${id}`, habit).pipe(
      tap(() => this.getHabits().subscribe())
    );
  }

  deleteHabit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getHabits().subscribe())
    );
  }

  // Log habit status for a specific date
  logHabit(habitId: string, isCompleted: boolean): Observable<HabitLog> {
    const log: HabitLog = { 
      habitId, 
      date: new Date().toISOString().split('T')[0], 
      isCompleted 
    };
    return this.toggleCompletion(habitId, log);
  }

  // Fetch history/logs for a specific habit
  getHabitHistory(habitId: string): Observable<HabitLog[]> {
    return this.getHabitLogs(habitId);
  }

  // Toggle completion for today
  toggleCompletion(habitId: string, log: HabitLog): Observable<HabitLog> {
    return this.http.post<HabitLog>(`${environment.apiUrl}/habit-log`, log).pipe(
      tap(() => this.getHabits().subscribe())
    );
  }

  getHabitLogs(habitId: string): Observable<HabitLog[]> {
    return this.http.get<HabitLog[]>(`${environment.apiUrl}/habit-log/${habitId}`);
  }
}
