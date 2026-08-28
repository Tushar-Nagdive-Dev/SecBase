package org.secbase.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class SecbaseException extends RuntimeException {
    private final HttpStatus status;

    protected SecbaseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
