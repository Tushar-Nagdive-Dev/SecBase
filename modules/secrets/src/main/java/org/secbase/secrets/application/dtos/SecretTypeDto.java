package org.secbase.secrets.application.dtos;

public record SecretTypeDto(
        Long id,
        String name,
        String code,
        String description
) {}
