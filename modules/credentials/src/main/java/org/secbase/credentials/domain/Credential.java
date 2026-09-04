package org.secbase.credentials.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(schema = "creds", name = "credentials")
public class Credential extends BaseEntity {

    private Long profileId;

    private String name;

    private CredentialType type;

    private String description;

    private Boolean isFavorite;

    private String encryptedCustomFields;

    @MappedCollection(idColumn = "credential_id")
    private CredentialLogin login;

    @MappedCollection(idColumn = "credential_id")
    private CredentialCard card;

    @MappedCollection(idColumn = "credential_id")
    private CredentialNote note;
}
