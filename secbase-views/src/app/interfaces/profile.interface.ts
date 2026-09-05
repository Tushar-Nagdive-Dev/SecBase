export interface IProfile {}

export interface ICreateProfileRequest {
  name: string;
  icon: string;
  color: string;
  cryptoSalt: string;
  cryptoVerifier: string;
}

export interface IProfileResponse {
  id: number;
  name: string;
  icon: string;
  color: string;
  cryptoSalt: string;
  cryptoVerifier: string;
}

export type ViewMode = 'CARD' | 'TABLE' | 'BUBBLE';
