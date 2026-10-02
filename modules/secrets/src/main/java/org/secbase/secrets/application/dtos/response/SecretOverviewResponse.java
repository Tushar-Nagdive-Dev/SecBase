package org.secbase.secrets.application.dtos.response;

public record SecretOverviewResponse(
        Long id,
        Long profileId,
        String name,
        String description,
        String status,
        Integer currentVersion,
        String typeName,
        String environmentName,
        String environmentColor
) {}
