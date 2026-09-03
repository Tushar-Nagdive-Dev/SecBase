import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Toast } from "@core/components/toast/toast";
import { ToastData, ToastType } from "@core/interfaces/app.interface";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private readonly snackbar = inject(MatSnackBar);

    success(message: string): void {
        this.show(message, 'success');
    }

    error(message: string): void {
        this.show(message, 'error');
    }
    
    info(message: string): void {
        this.show(message, 'info');
    }

    warning(message: string): void {
        this.show(message, 'warning');
    }

    private show(message: string, type: ToastType): void {
        this.snackbar.openFromComponent(Toast, {
            data: { message, type } satisfies ToastData,
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['sketchy-toast-container']
        });
    }
}