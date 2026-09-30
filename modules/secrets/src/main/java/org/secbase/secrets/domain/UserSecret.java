package org.secbase.secrets.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

import static org.secbase.common.constants.SecBaseApplicationConstants.*;

@Setter
@Getter
@Table(schema = "secrets", name = "user_secrets")
public class UserSecret extends BaseEntity {

    private AggregateReference<SecretsProfile, Long> profileId;

    private AggregateReference<SecretType, Long> typeId;

    private AggregateReference<Environment, Long> environmentId;

    private String name;

    private String description;

    private String status = ACTIVE;

    private Integer currentVersion = 1;

    private Instant deletedAt;

    public void incrementVersion() {
        this.currentVersion++;
    }

    public void revoke() {
        this.status = REVOKED;
    }

    public void markAsDeleted() {
        this.status = DELETED;
        this.deletedAt = Instant.now();
    }
}
