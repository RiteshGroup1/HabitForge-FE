import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'grid' },
    { title: 'Habits', url: '/habits', icon: 'list' },
    { title: 'Analytics', url: '/reports', icon: 'bar-chart' },
    { title: 'Leveling', url: '/progress', icon: 'trophy' },
    { title: 'Categories', url: '/categories', icon: 'pie-chart' },
  ];

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
