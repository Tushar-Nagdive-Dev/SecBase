package org.secbase.secrets.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table(schema = "secrets", name = "environment")
public class Environment extends BaseEntity {

    private AggregateReference<SecretsProfile, Long> profileId;

    private String name;

    private String code;

    private String description;

    private String color;

    private Boolean isActive = true;

    // DDD Behavior: Deactivate environment
    public void deactivate() {
        this.isActive = false;
    }
}
