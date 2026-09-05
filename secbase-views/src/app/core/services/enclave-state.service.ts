// ./src/app/core/services/enclave-state.service.ts

import { computed, inject, Injectable, signal } from '@angular/core';
import { APP_MESSAGES, ToastService } from '@core';

@Injectable({
  providedIn: 'root',
})
export class EnclaveStateService {
  private readonly toastService = inject(ToastService);

  // Internal private signals
  private activeKey = signal<CryptoKey | null>(null);
  private activeProfileId = signal<number | null>(null);
  private autoLockTimer: any;

  // Public computed signals with correct signal invocation ()
  public readonly isUnlocked = computed(() => this.activeKey() !== null);
  public readonly currentProfileId = computed(() => this.activeProfileId());

  /**
   * Loads the AES key into memory and starts the auto-lock countdown.
   */
  unlock(profileId: number, key: CryptoKey, timeoutMinutes: number = 15): void {
    this.activeProfileId.set(profileId);
    this.activeKey.set(key);
    this.resetAutoLock(timeoutMinutes);
  }

  /**
   * Retrieves the hot key for encryption/decryption.
   */
  getHotKey(): CryptoKey {
    const key = this.activeKey();
    if (!key) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.ENCLAVE_IS_CURRENTLY_LOCKED);
      throw new Error(APP_MESSAGES.TOAST_MSG.ENCLAVE_IS_CURRENTLY_LOCKED);
    }

    this.resetAutoLock(15);
    return key;
  }

  /**
   * Instantly purges the AES key from memory and clears the active profile.
   */
  lock(): void {
    this.activeKey.set(null);
    this.activeProfileId.set(null);
    if (this.autoLockTimer) {
      clearTimeout(this.autoLockTimer);
    }
  }

  /**
   * Enforces the auto-seal mechanism after a period of inactivity.
   */
  private resetAutoLock(minutes: number): void {
    if (this.autoLockTimer) {
      clearTimeout(this.autoLockTimer);
    }

    this.autoLockTimer = setTimeout(
      () => {
        this.lock();
        this.toastService.warning(APP_MESSAGES.TOAST_MSG.ENCLAVE_AUTO_LOCK_DUE_TO_INACTIVITY);
        console.warn(APP_MESSAGES.TOAST_MSG.ENCLAVE_AUTO_LOCK_DUE_TO_INACTIVITY);
      },
      minutes * 60 * 1000,
    );
  }
}
