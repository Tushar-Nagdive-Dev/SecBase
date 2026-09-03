package org.secbase.auth.presentation;

import lombok.RequiredArgsConstructor;
import org.secbase.auth.application.IAuthService;
import org.secbase.auth.application.dtos.LoginRequest;
import org.secbase.auth.application.dtos.RegisterRequest;
import org.secbase.common.presentation.ApiResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.secbase.common.constants.SecBaseApplicationConstants.*;
import static org.secbase.common.constants.SecBaseApplicationConstants.ApiConstants.*;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.SuccessMsg.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(AUTH_PATH)
public class AuthController {
    private final IAuthService authService;

    @PostMapping(REGISTER)
    public ResponseEntity<ApiResponse<Map<String, Long>>> register(@RequestBody RegisterRequest request) {
        Long userId = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(REGISTRATION_SUCCESSFUL, Map.of("userId", userId)));
    }

    @PostMapping(LOGIN)
    public ResponseEntity<ApiResponse<Void>> login(@RequestBody LoginRequest  loginRequest) {
        String token = this.authService.login(loginRequest);
        ResponseCookie jwtCookie = ResponseCookie.from(SECBASE_ACCESS_TOKEN, token)
                .httpOnly(true)
                .secure(false)
                .path(FORWARD_SLASH)
                .maxAge(COOKIE_MAX_AGE)
                .sameSite(STRICT)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(ApiResponse.success(LOGIN_SUCCESSFUL));
    }

    @PostMapping(LOGOUT)
    public ResponseEntity<ApiResponse<Void>> logout() {
        ResponseCookie deleteCookie = ResponseCookie.from(SECBASE_ACCESS_TOKEN, EMPTY_STRING)
                .httpOnly(true).secure(false).path(FORWARD_SLASH)
                .maxAge(ZERO).sameSite(STRICT).build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body(ApiResponse.success(SECBASE_LOGOUT));
    }
}
