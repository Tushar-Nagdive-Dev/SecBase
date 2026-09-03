import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from '../../services/auth-service';
import { ROUTES_PATHS } from '@core/constants/route.constants';
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
  selector: 'sec-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register implements OnInit{

  registerForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastService.warning(APP_MESSAGES.TOAST_MSG.PLEASE_FILL_ALL_REGISTRATION_REQUIRED_FIELDS);
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: (response) => {
        this.toastService.success(APP_MESSAGES.TOAST_MSG.BLACK_BOX_INITIALIZED);
        this.router.navigate([ROUTES_PATHS.AUTH.SIGNING]);
      },
      error: (err) => {
        const errorMsg = err.error?.message || err.message || APP_MESSAGES.TOAST_MSG.REGISTRATION_FAILED;
        this.toastService.error(errorMsg);
      }
    });
  }
}
