package org.secbase.secrets.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Getter
@Setter
@Table(schema = "secrets", name = "secret_value")
public class SecretValue extends BaseEntity {

    private AggregateReference<UserSecret, Long> secretId;

    private Integer payloadVersion;

    private String encryptedPayload;

    private Boolean isCurrent = false;

    private Instant revokedAt;

    private Long revokedBy;

    public void activate() {
        this.isCurrent = true;
    }

    public void revoke(Long actorId) {
        this.isCurrent = false;
        this.revokedBy = actorId;
        this.revokedAt = Instant.now();
    }
}
