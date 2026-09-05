import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RecoveryPdfTemplateComponent} from '../../common/recovery-pdf-template/recovery-pdf-template.component';
import {Router} from '@angular/router';
import {CryptoService} from '@core/services/crypto.service';
import {ProfileApiService} from '../../services/profile-api-service';
import {DialogService, EnclaveStateService, hasValue, ToastService} from '@core';
import {PdfRecoveryService} from '../../common/pdf-recovery.service';
import {firstValueFrom} from 'rxjs';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecoveryPdfTemplateComponent
],
  selector: 'sec-profile-creation',
  styleUrl: './profile-creation.scss',
  templateUrl: './profile-creation.html',
})
export class ProfileCreation implements OnInit {

  profileForm!: FormGroup;

  isProcessing = false;

  colors = ['#00E5FF', '#FF00FF', '#FFFF00', '#00FF00', '#FF3366'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cryptoService: CryptoService,
    private enclaveState: EnclaveStateService,
    private profileApi: ProfileApiService,
    private dialogService: DialogService,
    private pdfRecovery: PdfRecoveryService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['heroicons:shield-check', Validators.required],
      color: ['00E5FF', Validators.required],
      masterPassword: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  selectColor(color: string) {
    this.profileForm.patchValue({color});
  }

  async onSubmit() {
    if (this.profileForm.invalid || this.isProcessing) return;
    const profileName = this.profileForm.value.name!;

    this.dialogService.openZeroKnowledgeWarning(profileName).subscribe(async action => {
      if (action === 'DOWNLOAD') {
        await this.pdfRecovery.generateAndDownload(profileName);
        await this.finalizeProfileCreation();
      } else if (action === 'ACKNOWLEDGED') {
        await this.finalizeProfileCreation();
      }
    });
  }

  private async finalizeProfileCreation() {
    this.isProcessing = true;
    const formVals = this.profileForm.value;

    try {
      const keys = await this.cryptoService.deriveEnclaveKeys(formVals.masterPassword!);
      const requestPayload = {
        name: formVals.name!,
        icon: formVals.icon!,
        color: formVals.color!,
        cryptoSalt: keys.saltBase64,
        verifierHash: keys.verifierBase64
      };

      const response = await firstValueFrom(this.profileApi.createProfile(requestPayload));
      if (hasValue(response) && hasValue(response.data) && hasValue(response.data.id)) {
        const profileId = response.data.id;
        this.enclaveState.unlock(profileId, keys.aesKey);
        this.router.navigate(['/credentials-enclave', profileId]);
      } else {
        this.toastService.error(response.message || 'Something went wrong');
      }

    } catch (error) {
      this.toastService.error('Cryptographic derivation or server error: '+error);
      console.error('Cryptographic derivation or server error: ', error);
    } finally {
      this.isProcessing = false;
    }
  }
}
