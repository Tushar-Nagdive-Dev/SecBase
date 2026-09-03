package org.secbase.auth.application.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.secbase.auth.application.IAuthService;
import org.secbase.auth.application.dtos.LoginRequest;
import org.secbase.auth.application.dtos.RegisterRequest;
import org.secbase.auth.domain.Role;
import org.secbase.auth.domain.Users;
import org.secbase.auth.infrastructure.JwtService;
import org.secbase.auth.infrastructure.UserRepository;
import org.secbase.common.exception.SecbaseIllegalArgumentException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    @Override
    @Transactional
    public Long register(RegisterRequest registerRequest) {
        log.info("Register request username: {}", registerRequest.username());

        if (userRepository.existsByUsername(registerRequest.username())) {
            throw new SecbaseIllegalArgumentException(USERNAME_IS_ALREADY_TAKEN);
        }

        if (userRepository.existsByEmail(registerRequest.email())) {
            throw new SecbaseIllegalArgumentException(EMAIL_IS_ALREADY_REGISTERED);
        }

        String hashedPassword = passwordEncoder.encode(registerRequest.password());
        Users user = Users.create(registerRequest.username(), registerRequest.email(), hashedPassword, registerRequest.firstName(), registerRequest.lastName());

        user.addRole(Role.ROLE_USER);
        return this.userRepository.save(user).getId();
    }

    @Override
    public String login(LoginRequest loginRequest) {
        log.info("Login attempt for identifier: {}", loginRequest.loginId());
        Users user = this.userRepository.findByUsernameOrEmail(loginRequest.loginId(), loginRequest.loginId())
                .orElseThrow(() -> new SecbaseIllegalArgumentException(INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(loginRequest.password(), user.getPasswordHash())) {
            throw new SecbaseIllegalArgumentException(INVALID_CREDENTIALS);
        }

        if(!user.getActive()) {
            throw new SecbaseIllegalArgumentException(ACCOUNT_IS_DEACTIVATED);
        }
        return this.jwtService.generateToken(user);
    }
}
