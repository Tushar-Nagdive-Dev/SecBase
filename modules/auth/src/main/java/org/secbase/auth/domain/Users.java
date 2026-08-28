package org.secbase.auth.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(schema = "auth", name = "users")
public class Users extends BaseEntity {

    private String username;

    private String email;

    private String passwordHash;

    private String firstName;

    private String lastName;

    private Boolean active;

    @MappedCollection(idColumn = "user_id")
    private Set<UserRole> roles = new HashSet<>();

    public void addRole(Role role) {
        this.roles.add(UserRole.of(role));
    }

    public static Users create(String username, String email, String passwordHash, String firstName, String lastName) {
        Users user = new Users();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordHash);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setActive(true);
        return user;
    }
}
