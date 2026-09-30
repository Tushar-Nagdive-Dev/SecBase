package org.secbase.secrets.application;

import org.secbase.secrets.application.dtos.request.CreateSecretsProfileRequest;
import org.secbase.secrets.application.dtos.request.UpdateSecretsProfileRequest;
import org.secbase.secrets.application.dtos.response.SecretsProfileResponse;

import java.util.List;

public interface ISecretsProfileService {

    List<SecretsProfileResponse> getProfiles(Long userId);

    SecretsProfileResponse getProfileById(Long userId, Long id);

    SecretsProfileResponse createProfile(Long userId, CreateSecretsProfileRequest request);

    SecretsProfileResponse updateProfile(Long userId, Long id, UpdateSecretsProfileRequest request);

    void deactivateProfile(Long userId, Long id);
}
