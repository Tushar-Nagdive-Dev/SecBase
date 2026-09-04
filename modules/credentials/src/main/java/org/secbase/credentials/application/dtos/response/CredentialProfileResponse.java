package org.secbase.credentials.application.dtos.response;

import org.secbase.credentials.domain.CredentialProfile;

public record CredentialProfileResponse(
        Long id, String name, String icon, String color, String cryptoSalt
) {
    public static CredentialProfileResponse fromEntity(CredentialProfile profile) {
        return new CredentialProfileResponse(profile.getId(), profile.getName(), profile.getIcon(), profile.getColor(), profile.getCryptoSalt());
    }
}
