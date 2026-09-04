package org.secbase.credentials.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(schema = "creds", name = "credential_logins")
public class CredentialLogin {

    private String url;

    private String loginId;

    private String encryptedPassword;

    private String encryptedPin;

    private String encryptedTotpSeed;
}
