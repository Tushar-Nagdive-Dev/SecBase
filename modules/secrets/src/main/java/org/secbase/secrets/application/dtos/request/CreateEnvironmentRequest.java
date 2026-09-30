package org.secbase.secrets.application.dtos.request;

public record CreateEnvironmentRequest(
        String name,
        String code,
        String description,
        String color
) {}
