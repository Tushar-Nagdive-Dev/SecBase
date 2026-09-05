import {inject, Service} from '@angular/core';
import {ApiClient, ApiResponse, APIs_PATH} from '@core';
import {Observable} from 'rxjs';
import {
  CreateCredentialRequest,
  CredentialBaseResponse,
  CredentialDetailResponse
} from '../interfaces/credential.interface';

@Service()
export class CredentialApiService {
  private apiClient = inject(ApiClient);

  /**
   * Fetches the lightweight list of credentials for a specific profile.
   * Used to populate the Lobby.
   */
  getBaseCredentials(profileId: number): Observable<ApiResponse<CredentialBaseResponse[]>> {
    return this.apiClient.get<CredentialBaseResponse[]>(APIs_PATH.CREDENTIALS.GET_BASE_CREDENTIALS_BY_PROFILE_ID(profileId));
  }

  /**
   * Fetches a single credential containing the heavy encrypted ciphertext.
   * Used for the Detail/Decryption View.
   */
  getCredentialDetail(credentialId: number | string): Observable<ApiResponse<CredentialDetailResponse>> {
    return this.apiClient.get<CredentialDetailResponse>(APIs_PATH.CREDENTIALS.GET_CREDENTIAL_BY_ID(credentialId));
  }

  /**
   * Deletes a credential from the vault.
   */
  deleteCredential(credentialId: number): Observable<ApiResponse<null>> {
    return this.apiClient.delete(APIs_PATH.CREDENTIALS.DELETE_CREDENTIAL_BY_ID(credentialId));
  }

  createCredential(profileId: number | string, payload: CreateCredentialRequest): Observable<ApiResponse<CredentialDetailResponse>> {
    return this.apiClient.post<CredentialDetailResponse, CreateCredentialRequest>(APIs_PATH.CREDENTIALS.CREATE_CREDENTIAL_BY_PROFILE_ID(profileId));
  }
}
