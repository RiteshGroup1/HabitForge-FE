import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<User | null>(null);
  public progress$ = this.progressSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchProgress(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/progress`).pipe(
      tap(progress => this.progressSubject.next(progress))
    );
  }

  getCurrentProgress(): User | null {
    return this.progressSubject.value;
  }
}
