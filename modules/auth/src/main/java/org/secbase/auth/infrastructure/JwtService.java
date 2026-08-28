package org.secbase.auth.infrastructure;

import org.secbase.auth.domain.Users;

public interface JwtService {
    public String generateToken(Users user);
}
