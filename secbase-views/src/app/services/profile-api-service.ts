import {inject, Service} from '@angular/core';
import {ICreateProfileRequest, IProfileResponse} from '../interfaces/profile.interface';
import {Observable} from 'rxjs';
import {ApiResponse} from '@core/interfaces/api-client.interface';
import {ApiClient, APIs_PATH} from '@core';

@Service()
export class ProfileApiService {
  private apiClient = inject(ApiClient);

  createProfile(payload: ICreateProfileRequest): Observable<ApiResponse<IProfileResponse>> {
    return this.apiClient.post<IProfileResponse, ICreateProfileRequest>(APIs_PATH.PROFILES.CREDENTIALS_PROFILE, payload);
  }

  getProfiles(): Observable<ApiResponse<IProfileResponse[]>> {
    return this.apiClient.get<IProfileResponse[]>(APIs_PATH.PROFILES.CREDENTIALS_PROFILE);
  }
}
