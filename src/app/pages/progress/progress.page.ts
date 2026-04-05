import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: false
})
export class ProgressPage implements OnInit {
  user: User | null = null;
  isLoading = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  doRefresh(event: any) {
    this.authService.fetchUserProfile().subscribe(() => {
      event.target.complete();
    });
  }
}
