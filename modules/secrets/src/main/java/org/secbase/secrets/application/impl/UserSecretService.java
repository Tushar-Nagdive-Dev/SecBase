package org.secbase.secrets.application.impl;

import lombok.extern.slf4j.Slf4j;
import org.secbase.common.exception.SecbaseIllegalArgumentException;
import org.secbase.secrets.application.IUserSecretService;
import org.secbase.secrets.application.dtos.request.CreateSecretRequest;
import org.secbase.secrets.application.dtos.response.SecretOverviewResponse;
import org.secbase.secrets.domain.SecretValue;
import org.secbase.secrets.domain.UserSecret;
import org.secbase.secrets.infrastructure.SecretQueryDao;
import org.secbase.secrets.infrastructure.SecretValueRepository;
import org.secbase.secrets.infrastructure.SecretsProfileRepository;
import org.secbase.secrets.infrastructure.UserSecretRepository;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.SECRET_NAME_ALREADY_EXISTS_WITHIN_ENVIRONMENT;

@Slf4j
@Service
public class UserSecretService implements IUserSecretService {

    private final UserSecretRepository userSecretRepository;
    private final SecretsProfileRepository secretsProfileRepository;
    private final SecretValueRepository secretValueRepository;
    private final SecretQueryDao secretQueryDao;

    public UserSecretService(UserSecretRepository userSecretRepository, SecretsProfileRepository secretsProfileRepository, SecretQueryDao secretQueryDao, SecretValueRepository secretValueRepository) {
        this.userSecretRepository = userSecretRepository;
        this.secretsProfileRepository = secretsProfileRepository;
        this.secretQueryDao = secretQueryDao;
        this.secretValueRepository = secretValueRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SecretOverviewResponse> getSecretsForProfile(Long userId, Long profileId) {
        log.info("Getting secrets for user {} and profile {}", userId, profileId);
        validateProfileOwnership(userId, profileId);
        return this.secretQueryDao.getActiveSecretsForProfile(profileId);
    }

    @Override
    @Transactional
    public void createSecret(Long userId, CreateSecretRequest request) {
        log.info("Creating secret for user {}", userId);
        validateProfileOwnership(userId, request.profileId());

        if (this.userSecretRepository.existsByProfileAndEnvironmentAndName(request.profileId(), request.environmentId(), request.name())) {
            throw new SecbaseIllegalArgumentException(SECRET_NAME_ALREADY_EXISTS_WITHIN_ENVIRONMENT);
        }

        UserSecret userSecret = new UserSecret();
        userSecret.setProfileId(AggregateReference.to(request.profileId()));
        userSecret.setTypeId(AggregateReference.to(request.typeId()));
        userSecret.setEnvironmentId(AggregateReference.to(request.environmentId()));
        userSecret.setName(request.name());
        userSecret.setDescription(request.description());
        userSecret = this.userSecretRepository.save(userSecret);

        SecretValue secretValue = new SecretValue();
        secretValue.setSecretId(AggregateReference.to(userSecret.getId()));
        secretValue.setPayloadVersion(userSecret.getCurrentVersion());
        secretValue.setEncryptedPayload(request.encryptedPayload());
        secretValue.activate();

        this.secretValueRepository.save(secretValue);
    }

    private void validateProfileOwnership(Long userId, Long profileId) {
        this.secretsProfileRepository.findActiveByIdAndUserId(profileId, userId);
    }
}
