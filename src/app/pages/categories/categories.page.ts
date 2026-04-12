import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CategoryStats, CategoryPerformance } from '../../models/user.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit {
  stats: CategoryStats | null = null;
  analytics: CategoryPerformance[] = [];
  isLoading = true;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    this.isLoading = true;
    this.reportService.getCategoryAnalytics().subscribe({
      next: (data) => {
        this.stats = data;
        this.analytics = data.categories;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  doRefresh(event: any) {
    this.fetchAnalytics();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
