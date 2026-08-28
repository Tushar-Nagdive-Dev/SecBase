package org.secbase.auth.infrastructure.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.secbase.auth.domain.UserRole;
import org.secbase.auth.domain.Users;
import org.secbase.auth.infrastructure.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationConstants.SECBASE_AUTH;

@Service
public class JwtServiceImpl implements JwtService {

    // Injected from application.yaml or .env (e.g., JWT_SECRET)
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-hours}")
    private int expirationHours;

    @Override
    public String generateToken(Users user) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
        Instant now = Instant.now();
        List<String> roleNames = user.getRoles().stream().map(UserRole::role).toList();

        return JWT.create()
                .withIssuer(SECBASE_AUTH)
                .withSubject(user.getId().toString())
                .withClaim("username", user.getUsername())
                .withClaim("email", user.getEmail())
                .withClaim("roles", roleNames)
                .withIssuedAt(now)
                .withExpiresAt(now.plus(expirationHours, ChronoUnit.HOURS))
                .sign(algorithm);
    }
}
