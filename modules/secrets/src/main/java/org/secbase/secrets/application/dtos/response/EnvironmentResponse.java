package org.secbase.secrets.application.dtos.response;

public record EnvironmentResponse(
   Long id,
   Long profileId,
   String name,
   String code,
   String description,
   String color
) {}
