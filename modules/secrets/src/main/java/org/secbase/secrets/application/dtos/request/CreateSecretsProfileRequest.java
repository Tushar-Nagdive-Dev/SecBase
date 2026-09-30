package org.secbase.secrets.application.dtos.request;

public record CreateSecretsProfileRequest(
        String name,
        String description,
        String icon,
        String color,
        String cryptoSalt,
        String cryptoVerifier
) {}
