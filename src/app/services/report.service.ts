import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeeklyReport, MonthlyReport, CategoryAnalytics } from '../models/report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getWeeklyReport(): Observable<WeeklyReport> {
    return this.http.get<WeeklyReport>(`${this.apiUrl}/weekly`);
  }

  getMonthlyReport(): Observable<MonthlyReport> {
    return this.http.get<MonthlyReport>(`${this.apiUrl}/monthly`);
  }

  getCategoryAnalytics(): Observable<CategoryAnalytics[]> {
    return this.http.get<CategoryAnalytics[]>(`${environment.apiUrl}/progress/categories`);
  }
}
