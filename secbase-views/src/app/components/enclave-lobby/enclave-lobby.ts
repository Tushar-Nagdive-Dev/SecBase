import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { HasValuePipe } from '../../common/pipes/has-value-pipe';
import {
  APP_MESSAGES,
  CryptoService,
  EnclaveStateService,
  hasValue,
  LoadingService,
  safeCompare,
  ToastService,
} from '@core';
import { CredentialApiService } from '../../services/credential-api-service';
import { ProfileApiService } from '../../services/profile-api-service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { IProfileResponse, ViewMode } from '../../interfaces/profile.interface';
import { CredentialBaseResponse, CredentialType } from '../../interfaces/credential.interface';
import { firstValueFrom } from 'rxjs';
import { SecurePasswordInput } from '../secure-password-input/secure-password-input';

type LobbyWorkspaceMode = 'LIST' | 'CREATE' | 'DETAIL';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HasValuePipe,
    RouterModule,
    SecurePasswordInput,
  ],
  selector: 'sec-enclave-lobby',
  styleUrl: './enclave-lobby.scss',
  templateUrl: './enclave-lobby.html',
})
export class EnclaveLobby implements OnInit {
  // Core state signals
  profiles = signal<IProfileResponse[]>([]);
  activeProfile = signal<IProfileResponse | null>(null);
  workspaceMode = signal<LobbyWorkspaceMode>('LIST');
  viewMode = signal<ViewMode>('CARD');

  credentials = signal<CredentialBaseResponse[]>([]);
  unLockPassword = signal('');
  isUnlocking = signal<boolean>(false);

  // Creation form state
  selectedCredentialType = signal<CredentialType>('LOGIN');
  credentialForm!: FormGroup;
  isCurrentProfileUnlocked = computed(() => {
    const selected = this.activeProfile();
    const unlockId = this.enclaveState.currentProfileId();
    // Coerce both to Numbers to prevent string vs number comparison bugs
    return hasValue(selected) && Number(unlockId) === Number(selected.id);
  });

  readonly expiryMonths = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' },
  ];

  readonly expiryYears = Array.from({ length: 25 }, (_, i) =>
    (new Date().getFullYear() + i).toString(),
  );

  constructor(
    protected enclaveState: EnclaveStateService,
    private cryptoService: CryptoService,
    private credentialApi: CredentialApiService,
    private profileApi: ProfileApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    public loading: LoadingService,
    private fb: FormBuilder,
  ) {}

  async ngOnInit() {
    this.credentialForm = this.fb.group({
      name: ['', Validators.required],
      type: ['LOGIN' as CredentialType, Validators.required],
      description: [''],
      isFavorite: [false],
      login: this.fb.group({ url: [''], loginId: [''], password: [''], pin: [''], totpSeed: [''] }),
      card: this.fb.group({
        cardholderName: [''],
        number: [''],
        cardBrand: ['VISA'],
        expiryMonth: [''],
        expiryYear: [''],
        cvv: [''],
        pin: [''],
      }),
      note: this.fb.group({ noteType: ['SECURE_TEXT'], content: [''] }),
    });

    await this.fetchProfiles();

    // Reactively watch URL route parameter changes
    this.activatedRoute.paramMap.subscribe((params) => {
      const routeProfileId = Number(params.get('profileId'));
      if (routeProfileId && this.profiles().length > 0) {
        const found = this.profiles().find((p) => safeCompare(p.id, routeProfileId));
        if (hasValue(found) && this.activeProfile()?.id !== found.id) {
          this.selectProfile(found);
        }
      }
    });

    // Sub-mode switch listener for creation panel
    this.credentialForm.get('type')?.valueChanges.subscribe((val) => {
      if (val) this.selectedCredentialType.set(val as CredentialType);
    });
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
    this.workspaceMode.set('LIST');
    if (this.isCurrentProfileUnlocked()) {
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
      } else {
        this.credentials.set([]);
      }
    } catch (error) {
      this.credentials.set([]);
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
      const keys = await this.cryptoService.deriveEnclaveKeys(
        this.unLockPassword(),
        profile.cryptoSalt,
      );
      if (keys.verifierBase64 !== profile.cryptoVerifier) {
        throw new Error('Master password verification failed');
      }

      this.enclaveState.lock();
      this.enclaveState.unlock(profile.id, keys.aesKey);
      this.unLockPassword.set('');
      await this.fetchCredentials(profile.id);
      this.route.navigate(['/enclave', profile.id]);
      this.toastService.success('Enclave unlocked successfully');
    } catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.UNLOCK_FAILED);
    } finally {
      this.isUnlocking.set(false);
      this.loading.hide();
    }
  }

  setWorkspaceMode(mode: LobbyWorkspaceMode) {
    this.workspaceMode.set(mode);
  }

  setCredentialType(type: CredentialType) {
    this.credentialForm.patchValue({ type });
  }

  async onSaveCredential() {
    if (this.credentialForm.invalid) return;
    const profileId = this.activeProfile()?.id;
    if (!profileId) return;

    this.loading.show();
    try {
      const aesKey = this.enclaveState.getHotKey();
      const rawData = this.credentialForm.value;
      const encrypt = async (text?: string | null) =>
        text ? await this.cryptoService.encrypt(text, aesKey) : undefined;

      const payload: any = {
        name: rawData.name,
        type: rawData.type,
        description: rawData.description,
        isFavorite: rawData.isFavorite,
      };

      switch (rawData.type) {
        case 'LOGIN':
          payload.login = {
            url: rawData.login?.url,
            loginId: rawData.login?.loginId,
            encryptedPassword: await encrypt(rawData.login?.password),
            encryptedPin: await encrypt(rawData.login?.pin),
            encryptedTotpSeed: await encrypt(rawData.login?.totpSeed),
          };
          break;
        case 'CARD':
          const fullNum = rawData.card?.number || '';
          const masked = fullNum.length >= 4 ? `**** **** **** ${fullNum.slice(-4)}` : '';
          payload.card = {
            cardholderName: rawData.card?.cardholderName,
            maskedNumber: masked,
            cardBrand: rawData.card?.cardBrand,
            expiryMonth: rawData.card?.expiryMonth,
            expiryYear: rawData.card?.expiryYear,
            encryptedNumber: await encrypt(fullNum),
            encryptedCvv: await encrypt(rawData.card?.cvv),
            encryptedPin: await encrypt(rawData.card?.pin),
          };
          break;
        case 'NOTE':
          payload.note = {
            noteType: rawData.note?.noteType,
            encryptedContent: await encrypt(rawData.note?.content),
          };
          break;
      }

      await firstValueFrom(this.credentialApi.createCredential(profileId, payload));
      this.toastService.success('Secret encrypted and sealed!');
      this.credentialForm.reset({
        type: 'LOGIN',
        isFavorite: false,
        card: { cardBrand: 'VISA' },
        note: { noteType: 'SECURE_TEXT' },
      });
      this.workspaceMode.set('LIST');
      await this.fetchCredentials(profileId);
    } catch (error) {
      this.toastService.error('Failed to encrypt or save data.');
    } finally {
      this.loading.hide();
    }
  }

  openCredential(credId: number) {
    const profileId = this.activeProfile()?.id;
    if (profileId) {
      this.route.navigate(['/enclave', profileId, 'item', credId]);
    }
  }

  safeCompare(value1: any, value2: any): boolean {
    return safeCompare(value1, value2);
  }
}
