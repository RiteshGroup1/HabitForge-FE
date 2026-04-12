import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';
import { CategoryStats } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getWeeklyReport(): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/weekly`);
  }

  getMonthlyReport(): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/monthly`);
  }

  getCategoryAnalytics(): Observable<CategoryStats> {
    return this.http.get<CategoryStats>(`${environment.apiUrl}/progress/categories`);
  }
}
