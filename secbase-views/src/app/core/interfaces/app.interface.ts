// ./src/app/core/interfaces/app.interface.ts
export interface ToastData {
    message: string;
    type: ToastType;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';