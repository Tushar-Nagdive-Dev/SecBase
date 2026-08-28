package org.secbase.auth.application;

import org.secbase.auth.application.dtos.LoginRequest;
import org.secbase.auth.application.dtos.RegisterRequestDto;

public interface IAuthService {
    Long register(RegisterRequestDto registerRequest);
    String login(LoginRequest loginRequest);
}
