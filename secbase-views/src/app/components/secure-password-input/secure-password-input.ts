import {Component, forwardRef, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {hasValue, SecBaseAppConstants} from '@core';

@Component({
  imports: [
    CommonModule, FormsModule
  ],
  selector: 'sec-secure-password-input',
  styleUrl: './secure-password-input.scss',
  templateUrl: './secure-password-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SecurePasswordInput),
      multi: true
    }
  ]
})
export class SecurePasswordInput implements ControlValueAccessor {
  // Internal State
  value = signal<string>('');
  isDisabled = signal<boolean>(false);
  isRevealed = signal<boolean>(false);
  strengthScore = signal<number>(0);

  // CVA Callbacks
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(val: string): void {
    this.value.set(hasValue(val) ? val : '');
    this.calculateStrength(this.value());
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.value.set(input);
    this.calculateStrength(input);
    this.onChange(input);
    this.onTouch();
  }

  toggleReveal() {
    this.isRevealed.update(v => !v);
  }

  /**
   * Cryptographically secure password generation using the Web Crypto API.
   */
  generatePassword() {
    const length = 24;
    let retVal = SecBaseAppConstants.EMPTY_STRING;

    const randomValue = new Uint32Array(length);
    window.crypto.getRandomValues(randomValue);

    for (let i = 0, n = SecBaseAppConstants.CHARACTER_SECRET.length; i < length; ++i) {
      retVal += SecBaseAppConstants.CHARACTER_SECRET.charAt(randomValue[i] % n);
    }

    this.value.set(retVal);
    this.calculateStrength(retVal)
    this.onChange(retVal);
    this.onTouch();
  }

  private calculateStrength(pwd: string) {
    let score = 0;
    if (!hasValue(pwd)) {
      this.strengthScore.set(0);
      return;
    }

    if (pwd.length > 8) score += 1;
    if (pwd.length > 14) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    this.strengthScore.set(Math.min(score, 4));
  }
}
