import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, UserProgress } from '../../models/user.model';
import { ProgressService } from '../../services/progress.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: false
})
export class ProgressPage implements OnInit {
  user: User | null = null;
  progress: UserProgress | null = null;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private progressService: ProgressService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    combineLatest({
      user: this.authService.user$,
      progress: this.progressService.fetchProgress()
    }).subscribe({
      next: (data) => {
        this.user = data.user;
        this.progress = data.progress;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  doRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
