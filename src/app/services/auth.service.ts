import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, AuthResponse } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {
    // this.loadToken();
  }

  // Google Login - Start Redirect
  loginWithGoogle() {
    // Redirect user to backend Google login endpoint
    window.location.href = `${environment.apiUrl}/auth/google/login`;
  }

  // Handle Auth via token (used by redirect flow)
  handleLoginRedirect(token: string) {
    this.storeToken(token);
    this.fetchUserProfile().subscribe();
  }

  // Handle Auth Callback (if backend redirects back with token and data)
  handleCallback(token: string, userData: User) {
    this.storeToken(token);
    this.userSubject.next(userData);
    this.router.navigate(['/dashboard']);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private loadToken() {
    const token = this.getToken();
    if (token) {
      // Potentially verify token or fetch user profile
      this.fetchUserProfile().subscribe();
    }
  }

  fetchUserProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/profile`).pipe( // Mapping to backend profile if it exists
      tap(user => this.userSubject.next(user)),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
