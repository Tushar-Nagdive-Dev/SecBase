package org.secbase.credentials.application.dtos.request;

import org.secbase.credentials.application.dtos.CardDto;
import org.secbase.credentials.application.dtos.LoginDto;
import org.secbase.credentials.application.dtos.NoteDto;

public record UpdateCredentialRequest(
        String name, String description,
        Boolean isFavorite, String encryptedCustomFields,
        LoginDto login, CardDto card, NoteDto note
) {}
