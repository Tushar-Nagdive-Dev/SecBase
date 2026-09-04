// ./src/app/core/services/crypto.service.ts
import { Injectable } from '@angular/core';
import { IEnclaveKeys } from '@core/interfaces/app.interface';
import { SecBaseAppConstants } from '@core/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private readonly ITERATION = 250_000;

  /**
   * Derives a 512-bit payload from the password.
   * Splits it: 256 bits for the AES key, 256 bits for the Server Verifier Hash.
   */
  async deriveEnclaveKeys(password: string, existingSaltBase64?: string): Promise<IEnclaveKeys> {
    const enc = new TextEncoder();

    // Use existing salt for login, or generate a new 16-byte salt for creation
    const saltBuffer = existingSaltBase64 ? this.base64ToArrayBuffer(existingSaltBase64) : crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), { name : 'PBKDF2'}, false, ['deriveBits']);
    const derivedBits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: saltBuffer, iterations: this.ITERATION, hash: 'SHA-256' }, keyMaterial, 512);
    const aesKeyBuffer = derivedBits.slice(0,32);
    const verifierBuffer = derivedBits.slice(32, 64);
    const aesKey = await crypto.subtle.importKey('raw', aesKeyBuffer, { name: 'AES-GCM'}, false, ['encrypt', 'decrypt']);

    return { aesKey, saltBase64: this.arrayBufferToBase64(saltBuffer), verifierBase64:this.arrayBufferToBase64(verifierBuffer) };
  }

  /**
   * Encrypts plaintext and returns the "iv_base64:ciphertext_base64" string format.
   */
  async encrypt(plaintext: string, aesKey: CryptoKey): Promise<string> {
    if (!plaintext) return SecBaseAppConstants.EMPTY_STRING;

    // AES-GCM requires a unique 12-byte IV for every single encryption
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();

    const ciphertextBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, aesKey, enc.encode(plaintext));
    const ivBase64 = this.arrayBufferToBase64(iv);
    const cipherBase64 = this.arrayBufferToBase64(ciphertextBuffer);

    return `${ivBase64}:${cipherBase64}`;
  }

  /**
   * Decrypts an "iv_base64:ciphertext_base64" string back to plaintext.
   */
  async decrypt(payload: string, aesKey: CryptoKey): Promise<string> {
    if (!payload || !payload.includes(':')) return SecBaseAppConstants.EMPTY_STRING;

    const [ivBase64, cipherBase64] = payload.split(":");
    const iv = this.base64ToArrayBuffer(ivBase64);
    const cipherBuffer = this.base64ToArrayBuffer(cipherBase64);
    const decryptedBuffer = await crypto.subtle.decrypt({ name : 'AES-GCM', iv : iv }, aesKey, cipherBuffer);
    const dec = new TextDecoder();
    return dec.decode(decryptedBuffer);
  }

  private arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i=0;i<binary.length;i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
