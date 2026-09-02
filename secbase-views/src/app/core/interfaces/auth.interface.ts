export interface IRegisterRequest {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface ILoginRequest {
  loginId: string;
  password: string;
}
