import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  imports: [
    MatIconModule
  ],
  selector: 'sec-toast',
  styleUrl: './toast.scss',
  templateUrl: './toast.html',
})
export class Toast {
  data = inject(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef);

  get icon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'priority_high';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return '';
    }
  }
}
