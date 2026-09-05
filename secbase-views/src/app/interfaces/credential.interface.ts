// ./src/app/interface/credential.interface.ts
/**
 * The lightweight DTO used for the Enclave Lobby lists (Card/Table/Bubble views).
 * Contains NO encrypted payload data, just metadata.
 */
export interface CredentialBaseResponse {
  id: number;
  profileId: number | string;
  name: string;
  type: CredentialType;
  description: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * The heavy DTO used for the Detail View.
 * Contains the raw iv:ciphertext strings that the browser will decrypt.
 */
export interface CredentialDetailResponse extends CredentialBaseResponse {
  encryptedCustomFields: string;
  login?: LoginDto;
  card?: CardDto;
  note?: NoteDto;
}

export interface LoginDto {
  url: string;
  loginId: string; // e.g., username or email
  encryptedPassword?: string;
  encryptedPin?: string;
  encryptedTotpSeed?: string;
}

export interface CardDto {
  cardholderName: string;
  maskedNumber: string; // e.g., **** **** **** 1234
  cardBrand: string;    // e.g., VISA, MASTERCARD
  expiryMonth: string;
  expiryYear: string;
  encryptedNumber?: string;
  encryptedCvv?: string;
  encryptedPin?: string;
}

export interface NoteDto {
  noteType: string;
  encryptedContent?: string;
}

export interface CreateCredentialRequest {
  name: string;
  type: string;
  description: string;
  isFavorite: boolean;
  encryptedCustomFields: string;
  login: LoginDto;
  card: CardDto;
  note: NoteDto;
}

export type CredentialType = 'LOGIN' | 'CARD' | 'NOTE';
