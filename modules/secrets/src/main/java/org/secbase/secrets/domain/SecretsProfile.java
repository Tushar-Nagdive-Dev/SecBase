package org.secbase.secrets.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(schema = "secrets", name = "secrets_profile")
public class SecretsProfile extends BaseEntity {

    private Long userId;

    private String name;

    private String description;

    private String icon;

    private String color;

    private String cryptoSalt;

    private String cryptoVerifier;

    private Boolean isActive = true;

    public void deactivate() {
        this.isActive = false;
    }

    public static SecretsProfile create(Long userId, String name, String description, String icon, String color, String cryptoSalt, String cryptoVerifier) {
        SecretsProfile profile = new SecretsProfile();
        profile.setUserId(userId);
        profile.setName(name);
        profile.setDescription(description);
        profile.setIcon(icon);
        profile.setColor(color);
        profile.setCryptoSalt(cryptoSalt);
        profile.setCryptoVerifier(cryptoVerifier);
        return profile;
    }
}
