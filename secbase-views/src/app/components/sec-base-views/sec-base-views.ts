import {Component, inject, OnInit, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {APP_MESSAGES, AuthStateService, ToastService} from '@core';

@Component({
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  selector: 'sec-sec-base-views',
  styleUrl: './sec-base-views.scss',
  templateUrl: './sec-base-views.html',
})
export class SecBaseViews implements OnInit {

  readonly isLeftOpen = signal<boolean>(true);
  readonly isRightOpen = signal<boolean>(false);
  readonly isTopOpen = signal<boolean>(false);

  readonly credentialsProfileCount = signal<number>(2);
  readonly secretsProfileCount = signal<number>(4);

  private readonly authService = inject(AuthService);
  private readonly authStateService = inject(AuthStateService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  ngOnInit(): void {

  }

  toggleLeft() {
    this.isLeftOpen.update(v => !v);
  }

  toggleRight() {
    this.isRightOpen.update(v => !v);
  }

  toggleTop() {
    this.isTopOpen.update(v => !v);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.authStateService.setAuthenticated(false);
        this.toastService.success(res.message || APP_MESSAGES.TOAST_MSG.SECBASE_SYSTEM_LOGOUT);
        this.router.navigate(['/']);
      },
      error: () => {
        this.authStateService.setAuthenticated(false);
        this.router.navigate(['/']);
      }
    });
  }
}
