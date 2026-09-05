import {Component, computed, OnInit, signal, WritableSignal} from '@angular/core';
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
      const res = await this.profileApi.getProfiles().toPromise();
      if (hasValue(res) && hasValue(res.data)) this.profiles.set(res.data);
      this.loading.hide();
    } catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.FAILED_TO_FETCH_PROFILES+error);
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
      const res = await this.credentialApi.getBaseCredentials(profileId).toPromise();
      if (hasValue(res) && hasValue(res.data)) {
        this.credentials.set(res.data);
      }
    } catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.FAILED_TO_FETCH_PROFILES+error);
    } finally {
      this.loading.hide();
    }
  }

  async attemptUnlock() {
    this.loading.show();
    const profile = this.activeProfile();
    if(!profile || !this.unLockPassword()) return;

    this.isUnlocking.set(true);
    try {
      const keys = await this.cryptoService.deriveEnclaveKeys(this.unLockPassword());
      this.enclaveState.lock();
      this.enclaveState.unlock(profile.id, keys.aesKey);
      this.unLockPassword.set('');
      await this.fetchCredentials(profile.id);
    }catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.UNLOCK_FAILED);
    } finally {
      this.isUnlocking.set(false);
      this.loading.hide();
    }
  }

  setViewMode(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  openCredential(credId: number) {
    this.route.navigate(['/enclave/item', credId]);
  }

  safeCompare(value1: any, value2: any): boolean {
    return safeCompare(value1, value2);
  }
}
