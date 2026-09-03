package org.secbase.auth.application.dtos;

public record RegisterRequest(
        String username, String email, String password, String firstName, String lastName
) {}
