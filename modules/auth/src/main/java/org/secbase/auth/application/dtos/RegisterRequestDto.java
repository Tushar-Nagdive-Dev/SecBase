package org.secbase.auth.application.dtos;

public record RegisterRequestDto(
        String username, String email, String password, String firstName, String lastName
) {}
