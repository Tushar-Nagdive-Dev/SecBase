// ./src/app/core/interfaces/app.interface.ts
export interface ToastData {
    message: string;
    type: ToastType;
}

export interface IEnclaveKeys {
  aesKey: CryptoKey;
  saltBase64: string;
  verifierBase64: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
