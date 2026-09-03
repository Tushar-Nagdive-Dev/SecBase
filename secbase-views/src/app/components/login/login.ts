import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from '../../services/auth-service';
import { ToastService } from '@core/services/toast.service';
import { APP_MESSAGES } from '@core';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  selector: 'sec-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.warning(APP_MESSAGES.TOAST_MSG.PLEASE_ENTER_BOTH_YOUR_IDENTIFIER_AND_MASTER_PASSWORD);
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.toastService.success(response.message || APP_MESSAGES.TOAST_MSG.ACCESS_GRANTED);
        // Direct to main vault/dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.message || APP_MESSAGES.TOAST_MSG.FAILED_TO_AUTHENTICATE;
        this.toastService.error(errorMsg);
      }
    });
  }
}
