import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {HasValuePipe} from '../../common/pipes/has-value-pipe';
import {CredentialApiService} from '../../services/credential-api-service';
import {APP_MESSAGES, CryptoService, EnclaveStateService, hasValue, LoadingService, ToastService} from '@core';
import {CredentialDetailResponse} from '../../interfaces/credential.interface';
import {firstValueFrom} from 'rxjs';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    HasValuePipe
  ],
  selector: 'sec-credential-details',
  styleUrl: './credential-details.scss',
  templateUrl: './credential-details.html',
})
export class CredentialDetails implements OnInit {

  profileId = signal<number | null>(null);
  meta = signal<CredentialDetailResponse | null>(null);
  // The Decrypted Payloads (Held strictly in UI state)
  decryptedLogin = signal<any>(null);
  decryptedCard = signal<any>(null);
  decryptedNote = signal<any>(null);

  // UI Toggles for masking/unmasking secrets
  revealedFields = signal<Record<string, boolean>>({});

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private credentialApi: CredentialApiService,
    private cryptoService: CryptoService,
    private enclaveState: EnclaveStateService,
    private toastService: ToastService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    const credId = Number(this.route.snapshot.paramMap.get('id'));
    this.profileId.set(Number(this.route.snapshot.paramMap.get('profileId')));
    this.loading.show()
    try {
      const aesKey = this.enclaveState.getHotKey();
      const res = await firstValueFrom(this.credentialApi.getCredentialDetail(credId));
      if (hasValue(res) && hasValue(res.data)) {
        const data = res.data;
        this.meta.set(data);

        await this.decryptPayload(data, aesKey);
      } else {
        this.toastService.error(APP_MESSAGES.TOAST_MSG.CREDENTIAL_DETAILS_NOT_FOUND);
      }

    } catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.DECRYPTION_FAILED_OR_ENCLAVE_LOCKED+error);
      if(hasValue(this.profileId())) {
        this.router.navigate(['/enclave', this.profileId()]);
      } else {
        this.router.navigate(['/']);
      }
    } finally {
      this.loading.hide();
    }
  }

  private async decryptPayload(data: CredentialDetailResponse, key: CryptoKey) {
    const decryptStr = async (str?: string) => hasValue(str) ? await this.cryptoService.decrypt(str, key) : '';

    switch (data.type) {
      case 'LOGIN':
        if (data.login) {
          this.decryptedLogin.set({
            url: data.login.url,
            loginId: data.login.loginId,
            password: await decryptStr(data.login.encryptedPassword),
            pin: await decryptStr(data.login.encryptedPin),
            totpSeed: await decryptStr(data.login.encryptedTotpSeed)
          });
        }
        break;
      case 'CARD':
        this.decryptedCard.set({
          cardholderName: data.card?.cardholderName,
          maskedNumber: data.card?.maskedNumber,
          cardBrand: data.card?.cardBrand,
          expiryMonth: data.card?.expiryMonth,
          expiryYear: data.card?.expiryYear,
          number: await decryptStr(data.card?.encryptedNumber),
          cvv: await decryptStr(data.card?.encryptedCvv),
          pin: await decryptStr(data.card?.encryptedPin)
        });
        break;
      case 'NOTE':
        if (data.note) {
          this.decryptedNote.set({
            noteType: data.note.noteType,
            content: await decryptStr(data.note.encryptedContent)
          });
        }
        break;
      default:
        this.toastService.error(APP_MESSAGES.TOAST_MSG.CREDENTIAL_TYPE_NOT_SUPPORTED);
        break;
    }
  }

  toggleReveal(field: string) {
    this.revealedFields.update(state => ({ ...state, [field]: !state[field] }));
  }

  async copyToClipboard(text: string) {
    if (!hasValue(text)) return;
    try {
      await navigator.clipboard.writeText(text);
      this.toastService.success(APP_MESSAGES.TOAST_MSG.COPY_TO_CLIPBOARD);
    } catch (err) {
      this.toastService.error( APP_MESSAGES.TOAST_MSG.COPY_FAILED+ err);
    }
  }
}
