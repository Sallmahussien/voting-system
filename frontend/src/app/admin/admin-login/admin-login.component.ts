import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/services/token';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  onLogin(form: FormGroup,) {
    if (form.invalid) {
      return;
    }

    this.authService.login(form.value).subscribe({
      next: (response) => {
        this.tokenService.storeToken(response.token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
