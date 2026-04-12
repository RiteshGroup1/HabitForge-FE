import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProgress, CategoryStats } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<UserProgress | null>(null);
  public progress$ = this.progressSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchProgress(): Observable<UserProgress> {
    return this.http.get<UserProgress>(`${environment.apiUrl}/progress`).pipe(
      tap(progress => this.progressSubject.next(progress))
    );
  }

  getCategoryStats(): Observable<CategoryStats> {
    return this.http.get<CategoryStats>(`${environment.apiUrl}/progress/categories`);
  }

  getCurrentProgress(): UserProgress | null {
    return this.progressSubject.value;
  }
}
