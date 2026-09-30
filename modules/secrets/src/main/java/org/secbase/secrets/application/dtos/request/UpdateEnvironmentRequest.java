package org.secbase.secrets.application.dtos.request;

public record UpdateEnvironmentRequest(
        String name,
        String description,
        String color
) {}
