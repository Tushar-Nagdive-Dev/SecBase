export interface IProfile {}

export interface ICreateProfileRequest {
  name: string;
  icon: string;
  color: string;
  cryptoSalt: string;
  verifierHash: string;
}

export interface IProfileResponse {
  id: number;
  name: string;
  icon: string;
  color: string;
  cryptoSalt: string;
}

export type ViewMode = 'CARD' | 'TABLE' | 'BUBBLE';
