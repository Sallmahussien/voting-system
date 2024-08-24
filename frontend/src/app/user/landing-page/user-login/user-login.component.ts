import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/services/token';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  onLogin(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    this.authService.login(form.value).subscribe({
      next: (response) => {
        this.tokenService.storeToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
