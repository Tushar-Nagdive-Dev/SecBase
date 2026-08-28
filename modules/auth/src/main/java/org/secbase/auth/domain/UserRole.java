package org.secbase.auth.domain;

import org.springframework.data.relational.core.mapping.Table;

@Table(schema = "auth", name = "user_roles")
public record UserRole(String role) {
    public static UserRole of(Role roleEnum) {
        return new UserRole(roleEnum.name());
    }
}
