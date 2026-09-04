package org.secbase.credentials.application.dtos.response;

import org.secbase.credentials.domain.CredentialType;

public record CredentialBaseResponse(
        Long id, String name, CredentialType type, String description, Boolean isFavorite
) {}
