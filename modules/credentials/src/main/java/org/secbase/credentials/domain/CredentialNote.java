package org.secbase.credentials.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(schema = "creds", name = "credential_notes")
public class CredentialNote {

    private String noteType;

    private String encryptedContent;
}
