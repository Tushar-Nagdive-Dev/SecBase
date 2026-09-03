package org.secbase.auth.application;

import org.secbase.auth.application.dtos.LoginRequest;
import org.secbase.auth.application.dtos.RegisterRequest;

public interface IAuthService {
    Long register(RegisterRequest registerRequest);
    String login(LoginRequest loginRequest);
}
