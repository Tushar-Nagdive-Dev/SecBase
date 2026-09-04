package org.secbase.credentials.application.dtos;

public record LoginDto(
        String url, String loginId,
        String encryptedPassword, String encryptedPin,
        String encryptedTotpSeed
) {
}
