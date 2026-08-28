package org.secbase.auth.domain;

import lombok.Getter;
import lombok.Setter;
import org.secbase.common.domain.BaseEntity;
import org.springframework.data.relational.core.mapping.Table;

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
