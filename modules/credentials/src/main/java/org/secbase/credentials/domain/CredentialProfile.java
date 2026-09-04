package org.secbase.credentials.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(schema = "creds", name = "credential_profiles")
public class CredentialProfile extends BaseEntity {

    private Long userId;
    private String name;
    private String icon;
    private String color;
    private String cryptoSalt;
    private String cryptoVerifier;

    public static CredentialProfile create(Long userId, String name, String icon, String color, String cryptoSalt, String cryptoVerifier) {
        CredentialProfile profile = new CredentialProfile();
        profile.setUserId(userId);
        profile.setName(name);
        profile.setIcon(icon);
        profile.setColor(color);
        profile.setCryptoSalt(cryptoSalt);
        profile.setCryptoVerifier(cryptoVerifier);
        return profile;
    }
}
