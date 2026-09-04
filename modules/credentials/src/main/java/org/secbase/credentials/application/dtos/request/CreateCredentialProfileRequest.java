package org.secbase.credentials.application.dtos.request;

public record CreateCredentialProfileRequest(
        String name, String icon, String color,
        String cryptoSalt, String cryptoVerifier
) {}
