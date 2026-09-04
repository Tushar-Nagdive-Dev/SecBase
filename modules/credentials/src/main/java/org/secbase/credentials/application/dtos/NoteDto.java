package org.secbase.credentials.application.dtos;

public record NoteDto(
        String noteType,
        String encryptedContent
) {}
