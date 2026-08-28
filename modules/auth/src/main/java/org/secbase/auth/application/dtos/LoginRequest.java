package org.secbase.auth.application.dtos;

public record LoginRequest(
        String loginId, String password
) {}
