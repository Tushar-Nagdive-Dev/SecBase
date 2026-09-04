package org.secbase.credentials.application.dtos;

public record CardDto(
        String cardholderName, String maskedNumber,
        String cardBrand, String expiryMonth,
        String expiryYear, String encryptedNumber,
        String encryptedCvv, String encryptedPin
) {}
