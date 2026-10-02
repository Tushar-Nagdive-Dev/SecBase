package org.secbase.secrets.application.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateSecretRequest(
    @NotNull(message = "Profile ID is required")
    Long profileId,

    @NotNull(message = "Type ID is required")
    Long typeId,

    @NotNull(message = "Environment ID is required")
    Long environmentId,

    @Size(max = 255)
    @NotBlank(message = "Name is required")
    String name,

    String description,

    @NotBlank(message = "Encrypted payload is required")
    String encryptedPayload
) {}
