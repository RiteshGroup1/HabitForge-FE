import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.isLoading = true;
        this.authService.handleLoginRedirect(token);
        // Navigate once profile is loaded (AuthService will handle this internally mostly)
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else if (this.authService.isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onGoogleLogin() {
    this.authService.loginWithGoogle();
  }
}
