import {inject, Service} from '@angular/core';
import { ApiClient } from '@core/services/api-client.service';
import { APIs_PATH } from '@core/constants/api.constants';
import { ILoginRequest, IRegisterRequest } from '@core/interfaces/auth.interface';

@Service()
export class AuthService {
  private readonly apiClient = inject(ApiClient);

  login(payload: ILoginRequest) {
    return this.apiClient.post<void, ILoginRequest>(APIs_PATH.AUTH.LOGIN, payload, {withCredentials: true});
  }

  register(payload: IRegisterRequest) {
    return this.apiClient.post<{ userId: number}, IRegisterRequest>(APIs_PATH.AUTH.REGISTER, payload, {withCredentials: true});
  }
}
