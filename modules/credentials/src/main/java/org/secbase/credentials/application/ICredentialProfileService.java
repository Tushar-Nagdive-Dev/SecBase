package org.secbase.credentials.application;

import org.secbase.credentials.application.dtos.request.CreateCredentialProfileRequest;
import org.secbase.credentials.application.dtos.response.CredentialProfileResponse;

import java.util.List;

public interface ICredentialProfileService {
    CredentialProfileResponse createProfile(Long userId, CreateCredentialProfileRequest request);
    List<CredentialProfileResponse> getProfiles(Long userId);
}
