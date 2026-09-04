package org.secbase.credentials.application.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.secbase.common.exception.SecbaseException;
import org.secbase.credentials.application.ICredentialService;
import org.secbase.credentials.application.dtos.CardDto;
import org.secbase.credentials.application.dtos.LoginDto;
import org.secbase.credentials.application.dtos.NoteDto;
import org.secbase.credentials.application.dtos.request.CreateCredentialRequest;
import org.secbase.credentials.application.dtos.request.UpdateCredentialRequest;
import org.secbase.credentials.application.dtos.response.CredentialBaseResponse;
import org.secbase.credentials.application.dtos.response.CredentialDetailResponse;
import org.secbase.credentials.domain.Credential;
import org.secbase.credentials.domain.CredentialCard;
import org.secbase.credentials.domain.CredentialLogin;
import org.secbase.credentials.domain.CredentialNote;
import org.secbase.credentials.infrastructure.CredentialProfileRepository;
import org.secbase.credentials.infrastructure.CredentialRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.ACCESS_DENIED_TO_THIS_ENCLAVE;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.CREDENTIAL_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class CredentialService implements ICredentialService {

    private final CredentialRepository credentialRepository;

    private final CredentialProfileRepository credentialProfileRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CredentialBaseResponse> getBaseCredentials(Long userId, Long profileId) {
        verifyProfileOwnership(userId, profileId);

        return this.credentialRepository.findBaseByProfileId(profileId).stream()
                .map(credential -> new CredentialBaseResponse(credential.getId(), credential.getName(), credential.getType(),
                        credential.getDescription(), credential.getIsFavorite())).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CredentialDetailResponse getCredentialDetail(Long userId, Long credentialId) {
        log.debug("Get credential detail for credential with id {}", credentialId);
        Credential credential = this.credentialRepository.findById(credentialId)
                .orElseThrow(() -> new SecbaseException(CREDENTIAL_NOT_FOUND, HttpStatus.NOT_FOUND));
        verifyProfileOwnership(userId, credential.getProfileId());

        return new CredentialDetailResponse(credential.getId(), credential.getName(), credential.getType(),
                credential.getDescription(), credential.getIsFavorite(), credential.getEncryptedCustomFields(),
                credential.getLogin(), credential.getCard(), credential.getNote());
    }

    @Override
    @Transactional
    public CredentialDetailResponse createCredential(Long userId, Long profileId, CreateCredentialRequest request) {
        log.info("Create credential: {}", request);
        verifyProfileOwnership(userId, profileId);

        Credential credential = new Credential();
        credential.setProfileId(profileId);
        credential.setName(request.name());
        credential.setType(request.type());
        credential.setDescription(request.description());
        credential.setIsFavorite(request.isFavorite());
        credential.setEncryptedCustomFields(request.encryptedCustomFields());

        mapChildEntity(credential, request.login(), request.card(), request.note());
        Credential saved = this.credentialRepository.save(credential);

        return mapToDetailResponse(saved);
    }

    @Override
    public CredentialDetailResponse updateCredential(Long userId, Long credentialId, UpdateCredentialRequest request) {
        log.info("Update credential: {}", request);
        Credential credential = this.credentialRepository.findById(credentialId)
                .orElseThrow(() -> new SecbaseException(CREDENTIAL_NOT_FOUND, HttpStatus.NOT_FOUND));
        verifyProfileOwnership(userId, credential.getProfileId());
        credential.setName(request.name());
        credential.setDescription(request.description());
        credential.setIsFavorite(request.isFavorite());
        credential.setEncryptedCustomFields(request.encryptedCustomFields());

        mapChildEntity(credential, request.login(), request.card(), request.note());

        Credential saved = this.credentialRepository.save(credential);
        return mapToDetailResponse(saved);
    }

    private void verifyProfileOwnership(Long userId, Long profileId) {
        log.info("Verifying profile owner of user {} with id {}", userId, profileId);
        Boolean ownsProfile = this.credentialProfileRepository.findById(profileId)
                .map(profile -> profile.getUserId().equals(userId)).orElse(false);

        if (!ownsProfile) {
            throw new SecbaseException(ACCESS_DENIED_TO_THIS_ENCLAVE, HttpStatus.FORBIDDEN);
        }
    }

    private void mapChildEntity(Credential credential, LoginDto loginDto, CardDto cardDto, NoteDto noteDto) {
        log.info("Mapping child entity for credential with id {}", credential.getId());
        credential.setLogin(null);
        credential.setCard(null);
        credential.setNote(null);

        switch (credential.getType()) {
            case LOGIN -> {
                if (loginDto != null) {
                    CredentialLogin login = new CredentialLogin();
                    login.setUrl(loginDto.url());
                    login.setLoginId(loginDto.loginId());
                    login.setEncryptedPassword(loginDto.encryptedPassword());
                    login.setEncryptedPin(loginDto.encryptedPin());
                    login.setEncryptedTotpSeed(loginDto.encryptedTotpSeed());
                    credential.setLogin(login);
                }
            }
            case CARD -> {
                if (cardDto != null) {
                    CredentialCard card = new CredentialCard();
                    card.setCardholderName(cardDto.cardholderName());
                    card.setMaskedNumber(cardDto.maskedNumber());
                    card.setCardBrand(cardDto.cardBrand());
                    card.setExpiryMonth(cardDto.expiryMonth());
                    card.setExpiryYear(cardDto.expiryYear());
                    card.setEncryptedNumber(cardDto.encryptedNumber());
                    card.setEncryptedCvv(cardDto.encryptedCvv());
                    card.setEncryptedPin(cardDto.encryptedPin());
                    credential.setCard(card);
                }
            }
            case NOTE -> {
                if (noteDto != null) {
                    CredentialNote note = new CredentialNote();
                    note.setNoteType(noteDto.noteType());
                    note.setEncryptedContent(noteDto.encryptedContent());
                    credential.setNote(note);
                }
            }
        }
    }

    private CredentialDetailResponse mapToDetailResponse(Credential credential) {
        return new CredentialDetailResponse(
                credential.getId(), credential.getName(),
                credential.getType(), credential.getDescription(),
                credential.getIsFavorite(), credential.getEncryptedCustomFields(),
                credential.getLogin(), credential.getCard(), credential.getNote()
        );
    }
}
