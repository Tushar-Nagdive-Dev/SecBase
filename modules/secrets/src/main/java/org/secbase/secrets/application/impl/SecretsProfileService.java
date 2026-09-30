package org.secbase.secrets.application.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.secbase.common.exception.SecbaseException;
import org.secbase.common.exception.SecbaseIllegalArgumentException;
import org.secbase.secrets.application.ISecretsProfileService;
import org.secbase.secrets.application.dtos.request.CreateSecretsProfileRequest;
import org.secbase.secrets.application.dtos.request.UpdateSecretsProfileRequest;
import org.secbase.secrets.application.dtos.response.SecretsProfileResponse;
import org.secbase.secrets.domain.SecretsProfile;
import org.secbase.secrets.infrastructure.SecretsProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.PROFILE_WITH_SAME_NAME_EXISTS;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.SECRETS_PROFILE_NOT_FOUND_OR_INACTIVE;

@Slf4j
@Service
@RequiredArgsConstructor
public class SecretsProfileService implements ISecretsProfileService {

    private final SecretsProfileRepository secretsProfileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SecretsProfileResponse> getProfiles(Long userId) {
        log.debug("Getting profiles for user {}", userId);
        return this.secretsProfileRepository.findAllActiveByUserId(userId).stream().map(this::mapToDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SecretsProfileResponse getProfileById(Long userId, Long id) {
        log.debug("Getting profile for user {} with id {}", userId, id);
        SecretsProfile profile = this.secretsProfileRepository.findActiveByIdAndUserId(id, userId)
                .orElseThrow(() -> new SecbaseException(SECRETS_PROFILE_NOT_FOUND_OR_INACTIVE, HttpStatus.NOT_FOUND));
        return mapToDto(profile);
    }

    @Override
    @Transactional
    public SecretsProfileResponse createProfile(Long userId, CreateSecretsProfileRequest request) {
        log.debug("Creating new profile for user {}", userId);
        if (this.secretsProfileRepository.existsByNameAndUserId(request.name(), userId)) {
            throw new SecbaseException(PROFILE_WITH_SAME_NAME_EXISTS.formatted(request.name()), HttpStatus.CONFLICT);
        }
        SecretsProfile profile = SecretsProfile.create(userId, request.name(), request.description(), request.icon(), request.color(), request.cryptoSalt(), request.cryptoVerifier());

        return mapToDto(this.secretsProfileRepository.save(profile));
    }

    @Override
    public SecretsProfileResponse updateProfile(Long userId, Long id, UpdateSecretsProfileRequest request) {
        log.debug("Updating profile for user {} with id {}", userId, id);
        SecretsProfile profile = this.secretsProfileRepository.findActiveByIdAndUserId(id, userId)
                .orElseThrow(() -> new  SecbaseException(SECRETS_PROFILE_NOT_FOUND_OR_INACTIVE, HttpStatus.NOT_FOUND));
        if (!profile.getName().equals(request.name()) && this.secretsProfileRepository.existsByNameAndUserId(request.name(), userId)) {
            throw new SecbaseIllegalArgumentException(PROFILE_WITH_SAME_NAME_EXISTS.formatted(request.name()));
        }

        profile.setName(request.name());
        profile.setDescription(request.description());
        profile.setIcon(request.icon());
        profile.setColor(request.color());

        return mapToDto(this.secretsProfileRepository.save(profile));
    }

    @Override
    public void deactivateProfile(Long userId, Long id) {
        log.debug("Deactivating profile for user {} with id {}", userId, id);
        SecretsProfile profile = this.secretsProfileRepository.findActiveByIdAndUserId(id, userId)
                .orElseThrow(() -> new SecbaseIllegalArgumentException(SECRETS_PROFILE_NOT_FOUND_OR_INACTIVE));
        profile.deactivate();
        this.secretsProfileRepository.save(profile);
    }

    private SecretsProfileResponse mapToDto(SecretsProfile profile) {
        return new SecretsProfileResponse(
                profile.getId(),
                profile.getName(),
                profile.getDescription(),
                profile.getIcon(),
                profile.getColor(),
                profile.getCryptoSalt(),
                profile.getCryptoVerifier()
        );
    }
}
