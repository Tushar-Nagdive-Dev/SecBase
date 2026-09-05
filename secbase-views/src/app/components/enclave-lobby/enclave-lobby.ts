import {Component, computed, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HasValuePipe} from '../../common/pipes/has-value-pipe';
import {
  APP_MESSAGES,
  CryptoService,
  EnclaveStateService,
  hasValue,
  LoadingService,
  safeCompare,
  ToastService
} from '@core';
import {CredentialApiService} from '../../services/credential-api-service';
import {ProfileApiService} from '../../services/profile-api-service';
import {Router, RouterModule} from '@angular/router';
import {IProfileResponse, ViewMode} from '../../interfaces/profile.interface';
import {CredentialBaseResponse} from '../../interfaces/credential.interface';
import {firstValueFrom} from 'rxjs';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    HasValuePipe,
    RouterModule
  ],
  selector: 'sec-enclave-lobby',
  styleUrl: './enclave-lobby.scss',
  templateUrl: './enclave-lobby.html',
})
export class EnclaveLobby implements OnInit {

  profiles = signal<IProfileResponse[]>([]);
  activeProfile = signal<IProfileResponse | null>(null);
  viewMode = signal<ViewMode>('CARD');

  credentials = signal<CredentialBaseResponse[]>([]);
  unLockPassword = signal('');
  isUnlocking = signal<boolean>(false);

  isCurrentProfileUnlocked = computed(() => {
    const selected = this.activeProfile();
    const unlockId = this.enclaveState.currentProfileId();
    return hasValue(selected) && safeCompare(unlockId, selected.id);
  });

  constructor(
    protected enclaveState: EnclaveStateService,
    private cryptoService: CryptoService,
    private credentialApi: CredentialApiService,
    private profileApi: ProfileApiService,
    private route: Router,
    private toastService: ToastService,
    private loading: LoadingService,
  ) {}

  async ngOnInit() {
    await this.fetchProfiles();
    const unlockedId = this.enclaveState.currentProfileId();
    if (unlockedId) {
      const profile = this.profiles().find(profile => safeCompare(profile.id, unlockedId));
      if (hasValue(profile)) {
        this.selectProfile(profile);
      }
    }
  }

  async fetchProfiles() {
    this.loading.show();
    try {
      const res = await firstValueFrom(this.profileApi.getProfiles());
      if (hasValue(res) && hasValue(res.data)) this.profiles.set(res.data);
    } catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.FAILED_TO_FETCH_PROFILES + error);
    } finally {
      this.loading.hide();
    }
  }

  selectProfile(profile: IProfileResponse) {
    this.activeProfile.set(profile);
    this.unLockPassword.set('');
    if(this.isCurrentProfileUnlocked()) {
      this.fetchCredentials(profile.id);
    } else {
      this.credentials.set([]);
    }
  }

  async fetchCredentials(profileId: number) {
    this.loading.show();
    try {
      const res = await firstValueFrom(this.credentialApi.getBaseCredentials(profileId));
      if (hasValue(res) && hasValue(res.data)) {
        this.credentials.set(res.data);
      }
    } catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.FAILED_TO_FETCH_PROFILES + error);
    } finally {
      this.loading.hide();
    }
  }

  async attemptUnlock() {
    const profile = this.activeProfile();
    if (!profile || !this.unLockPassword()) return;

    this.isUnlocking.set(true);
    this.loading.show();
    
    try {
      // 1. Locally derive keys using salt
      const keys = await this.cryptoService.deriveEnclaveKeys(this.unLockPassword(), profile.cryptoSalt);
      
      // 2. Validate verifier hash
      if (keys.verifierBase64 !== profile.cryptoVerifier) {
        throw new Error('Master password verification failed');
      }

      // 3. Unlock enclave state into RAM
      this.enclaveState.lock();
      this.enclaveState.unlock(profile.id, keys.aesKey);
      this.unLockPassword.set('');
      
      // 4. Fetch the credential items
      await this.fetchCredentials(profile.id);

      // 5. Explicitly update the browser URL to match the active profile path 
      // This ensures your route parameter stays in sync with the unlocked session
      this.route.navigate(['/enclave', profile.id]);

      this.toastService.success('Enclave unlocked successfully');
    } catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.UNLOCK_FAILED);
    } finally {
      this.isUnlocking.set(false);
      this.loading.hide();
    }
  }

  openCredential(credId: number) {
    const profileId = this.activeProfile()?.id;
    if (profileId) {
      // Navigates cleanly to your credential detail/decrypt view using absolute path parameters
      this.route.navigate(['/enclave', profileId, 'item', credId]);
    }
  }

  setViewMode(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  safeCompare(value1: any, value2: any): boolean {
    return safeCompare(value1, value2);
  }
}