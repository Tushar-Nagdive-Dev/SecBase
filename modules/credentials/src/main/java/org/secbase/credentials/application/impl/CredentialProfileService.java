package org.secbase.credentials.application.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.secbase.common.exception.SecbaseException;
import org.secbase.credentials.application.ICredentialProfileService;
import org.secbase.credentials.application.dtos.request.CreateCredentialProfileRequest;
import org.secbase.credentials.application.dtos.response.CredentialProfileResponse;
import org.secbase.credentials.domain.CredentialProfile;
import org.secbase.credentials.infrastructure.CredentialProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.PROFILE_ALREADY_EXISTS;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.PROFILE_MASTER_PASSWORD_EXISTS;

@Slf4j
@Service
@RequiredArgsConstructor
public class CredentialProfileService implements ICredentialProfileService {

    private final CredentialProfileRepository repository;

    @Override
    @Transactional
    public CredentialProfileResponse createProfile(Long userId, CreateCredentialProfileRequest request) {
        log.info("Creating profile with id {}", userId);
        if (this.repository.existsByUserIdAndName(userId, request.name())) {
            throw new SecbaseException(PROFILE_ALREADY_EXISTS, HttpStatus.CONFLICT);
        }

        if (this.repository.existsByUserIdAndCryptoVerifier(userId, request.cryptoVerifier())) {
            throw new SecbaseException(PROFILE_MASTER_PASSWORD_EXISTS, HttpStatus.CONFLICT);
        }

        CredentialProfile profile = CredentialProfile.create(userId, request.name(), request.icon(), request.color(), request.cryptoSalt(), request.cryptoVerifier());
        CredentialProfile saved = this.repository.save(profile);
        return CredentialProfileResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CredentialProfileResponse> getProfiles(Long userId) {
        return this.repository.findAllByUserId(userId).stream().map(CredentialProfileResponse::fromEntity).toList();
    }
}
