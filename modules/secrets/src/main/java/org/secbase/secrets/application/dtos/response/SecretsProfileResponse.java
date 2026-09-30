package org.secbase.secrets.application.dtos.response;

public record SecretsProfileResponse(
        Long id,
        String name,
        String description,
        String icon,
        String color,
        String cryptoSalt,
        String cryptoVerifier
) {}
