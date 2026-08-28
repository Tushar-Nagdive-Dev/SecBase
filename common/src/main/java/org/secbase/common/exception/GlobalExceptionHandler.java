package org.secbase.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.secbase.common.presentation.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.UNEXPECTED_ERROR_TRY_AGAIN;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SecbaseException.class)
    public ResponseEntity<ApiResponse<Void>> handleSecBaseException(SecbaseException ex) {
        log.warn("Business rule violation: {}", ex.getMessage());
        return ResponseEntity.status(ex.getStatus()).body(ApiResponse.error(ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception e) {
        log.error("Unhandled exception intercepted {}",e.getMessage(), e);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(UNEXPECTED_ERROR_TRY_AGAIN));
    }
}
