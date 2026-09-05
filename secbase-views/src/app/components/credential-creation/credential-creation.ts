import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {APP_MESSAGES, CryptoService, EnclaveStateService, LoadingService, ToastService} from '@core';
import {CredentialApiService} from '../../services/credential-api-service';
import {CredentialType} from '../../interfaces/credential.interface';
import {firstValueFrom} from 'rxjs';
import { CommonModule } from '@angular/common';
import { SecurePasswordInput } from '../secure-password-input/secure-password-input';

@Component({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule,
    SecurePasswordInput
  ],
  selector: 'sec-credential-creation',
  styleUrl: './credential-creation.scss',
  templateUrl: './credential-creation.html',
})
export class CredentialCreation implements OnInit {
  credentialForm!: FormGroup;
  profileId!: number | string;
  selectedType = signal<CredentialType>('LOGIN');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cryptoService: CryptoService,
    private enclaveState: EnclaveStateService,
    private credentialApi: CredentialApiService,
    public loading : LoadingService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.credentialForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['LOGIN' as CredentialType, Validators.required],
      description: [''],
      isFavorite: [false],

      login: this.formBuilder.group({
        url: [''],
        loginId: [''],
        password: [''],
        pin: [''],
        totpSeed: ['']
      }),

      card: this.formBuilder.group({
        cardholderName: [''],
        maskedNumber: [''],
        cardBrand: ['VISA'],
        expiryMonth: [''],
        expiryYear: [''],
        number: [''],
        cvv: [''],
        pin: ['']
      }),

      note: this.formBuilder.group({
        noteType: ['SECURE_TEXT'],
        content: ['']
      })
    });

    this.profileId = Number(this.route.snapshot.paramMap.get('profileId'));
    this.credentialForm.get('type')?.valueChanges.subscribe(val => {
      if (val) this.selectedType.set(val as CredentialType);
    });
  }

  setType(type: CredentialType) {
    this.credentialForm.patchValue({type});
  }

  async onSubmit() {
    if (this.credentialForm.invalid) return;

    this.loading.show();
    try {
      const aesKey = this.enclaveState.getHotKey();
      const rawData = this.credentialForm.value;

      const encrypt = async (text?: string | null) => text ? await this.cryptoService.encrypt(text, aesKey) : undefined;

      const payload: any = {
        name: rawData.name,
        type: rawData.type,
        description: rawData.description,
        isFavorite: rawData.isFavorite,
        encryptedCustomFields: undefined
      };

      switch (rawData.type) {
        case 'LOGIN':
          payload.login = {
            url: rawData.login?.url,
            loginId: rawData.login?.loginId,
            encryptedPassword: await encrypt(rawData.login?.password),
            encryptedPin: await encrypt(rawData.login?.pin),
            encryptedTotpSeed: await encrypt(rawData.login?.totpSeed)
          }
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
            encryptedNumber: await encrypt(rawData.card?.number),
            encryptedCvv: await encrypt(rawData.card?.cvv),
            encryptedPin: await encrypt(rawData.card?.pin)
          };
          break;
        case 'NOTE':
          payload.note = {
            noteType: rawData.note?.noteType,
            encryptedContent: await encrypt(rawData.note?.content)
          };
          break;
      }

      await firstValueFrom(this.credentialApi.createCredential(this.profileId, payload));
      this.router.navigate(['/enclave', this.profileId]);
    }catch (error) {
      this.toastService.error(APP_MESSAGES.TOAST_MSG.ENCRYPTION_OR_NETWORK_FAILURE+error);
    } finally {
      this.loading.hide();
    }
  }
}