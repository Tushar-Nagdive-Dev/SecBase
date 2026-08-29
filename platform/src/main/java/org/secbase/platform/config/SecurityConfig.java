package org.secbase.platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.secbase.common.constants.SecBaseApplicationConstants.*;
import static org.secbase.common.constants.SecBaseApplicationConstants.ApiConstants.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(FORWARD_SLASH+AUTH_PATH+MATCH_ALL).permitAll()
                        .requestMatchers(V3_API_DOCS, SWAGGER_V3_API_DOCS, SWAGGER_UI_HTML).permitAll()
                        .requestMatchers(FORWARD_SLASH+ADMIN_PATH+MATCH_ALL).hasRole(ADMIN)
                        .anyRequest().authenticated());

        return http.build();
    }
}
