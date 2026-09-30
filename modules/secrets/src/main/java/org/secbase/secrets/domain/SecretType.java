package org.secbase.secrets.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Getter
@Setter
@Table(schema = "secrets", name = "secret_type")
public class SecretType {

    @Id
    private Long id;

    private String name;

    private String code;

    private String description;

    private Boolean isSystem;

    private Boolean isActive = true;

    @Column("created_at")
    private Instant createdAt;

    @Column("updated_at")
    private Instant updatedAt;
}
