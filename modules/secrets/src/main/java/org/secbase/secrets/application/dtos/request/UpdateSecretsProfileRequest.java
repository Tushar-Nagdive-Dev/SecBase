package org.secbase.secrets.application.dtos.request;

public record UpdateSecretsProfileRequest(
        String name,
        String description,
        String icon,
        String color
) {}
