package org.secbase.common.exception;

import org.springframework.http.HttpStatus;

public class SecbaseIllegalArgumentException extends SecbaseException {
    public SecbaseIllegalArgumentException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
