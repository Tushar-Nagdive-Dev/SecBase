package org.secbase.common.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationConstants.*;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = extractTokenFromCookie(request);

        if (token != null) {
            try {
                Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
                DecodedJWT decodedJWT = JWT.require(algorithm).withIssuer(SECBASE_AUTH).build().verify(token);
                Long userId = Long.valueOf(decodedJWT.getSubject());
                String username = decodedJWT.getClaim(USERNAME).asString();
                List<String> roles = decodedJWT.getClaim(ROLES).asList(String.class);
                List<SimpleGrantedAuthority> authorities = roles.stream().map(SimpleGrantedAuthority::new).toList();
                SecbaseUserDetails userDetails = new SecbaseUserDetails(userId, username, authorities);
                UsernamePasswordAuthenticationToken springSecurityContextToken = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(springSecurityContextToken);
            } catch (Exception ex) {
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie: request.getCookies()) {
                if (cookie.getName().equals(SECBASE_ACCESS_TOKEN)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
