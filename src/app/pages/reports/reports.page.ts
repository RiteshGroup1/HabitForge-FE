import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/report.service';
// import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false
})
export class ReportsPage implements OnInit {
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  /*
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'x',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { min: 0, max: 100 }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { 
        data: [0, 0, 0, 0, 0, 0, 0], 
        label: 'Completion %',
        backgroundColor: '#3880ff',
        borderRadius: 8
      }
    ]
  };
  */

  totalCompleted = 0;
  successRate = 0;
  isLoading = true;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.fetchWeeklyData();
  }

  fetchWeeklyData() {
    this.isLoading = true;
    this.reportService.getWeeklyReport().subscribe({
      next: (data) => {
        // Mapping labels and data if charts were enabled
        // this.barChartData.labels = data.dailyProgress.map(p => p.date);
        // this.barChartData.datasets[0].data = data.dailyProgress.map(p => p.successRate);
        this.totalCompleted = data.completedDays;
        this.successRate = data.successRate;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  doRefresh(event: any) {
    this.fetchWeeklyData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
