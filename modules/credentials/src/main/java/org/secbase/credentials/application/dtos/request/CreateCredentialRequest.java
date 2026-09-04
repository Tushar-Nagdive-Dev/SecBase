package org.secbase.credentials.application.dtos.request;

import org.secbase.credentials.application.dtos.CardDto;
import org.secbase.credentials.application.dtos.LoginDto;
import org.secbase.credentials.application.dtos.NoteDto;
import org.secbase.credentials.domain.CredentialType;

public record CreateCredentialRequest(
        String name, CredentialType type,
        String description, Boolean isFavorite,
        String encryptedCustomFields,
        LoginDto login,
        CardDto card,
        NoteDto note
) {}
