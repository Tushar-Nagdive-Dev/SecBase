package org.secbase.secrets.application;

import org.secbase.secrets.application.dtos.request.CreateSecretRequest;
import org.secbase.secrets.application.dtos.response.SecretOverviewResponse;

import java.util.List;

public interface IUserSecretService {

    List<SecretOverviewResponse> getSecretsForProfile(Long userId, Long profileId);

    void createSecret(Long userId, CreateSecretRequest request);


}
