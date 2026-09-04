package org.secbase.credentials.application.dtos.response;

import org.secbase.credentials.domain.CredentialCard;
import org.secbase.credentials.domain.CredentialLogin;
import org.secbase.credentials.domain.CredentialNote;
import org.secbase.credentials.domain.CredentialType;

public record CredentialDetailResponse(
        Long id, String name, CredentialType type, String description, Boolean isFavorite, String encryptedCustomFields,
        CredentialLogin login, CredentialCard card, CredentialNote note
) {}
