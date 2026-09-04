package org.secbase.credentials.application;

import org.secbase.credentials.application.dtos.request.CreateCredentialRequest;
import org.secbase.credentials.application.dtos.request.UpdateCredentialRequest;
import org.secbase.credentials.application.dtos.response.CredentialBaseResponse;
import org.secbase.credentials.application.dtos.response.CredentialDetailResponse;

import java.util.List;

public interface ICredentialService {

    List<CredentialBaseResponse> getBaseCredentials(Long userId, Long profileId);

    CredentialDetailResponse getCredentialDetail(Long userId, Long credentialId);

    CredentialDetailResponse createCredential(Long userId, Long profileId, CreateCredentialRequest request);

    CredentialDetailResponse updateCredential(Long userId, Long credentialId, UpdateCredentialRequest request);
}
