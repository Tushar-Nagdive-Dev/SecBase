package org.secbase.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.secbase.common.presentation.ApiResponse;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.UNEXPECTED_ERROR_TRY_AGAIN;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String TRACE_ID = "traceId";

    @ExceptionHandler(SecbaseException.class)
    public ResponseEntity<ApiResponse<Void>> handleSecBaseException(SecbaseException ex) {
        String traceId = MDC.get(TRACE_ID);
        log.warn("⚠ [Business Violation] Trace: {} | {}", traceId, ex.getMessage());

        return ResponseEntity.status(ex.getStatus())
                // Optionally append the trace ID to the message for frontend debugging
                .body(ApiResponse.error(ex.getMessage() + " [Ref: " + traceId + "]"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception e) {
        String traceId = MDC.get(TRACE_ID);

        // 1. Extract exact crash location details
        StackTraceElement source = e.getStackTrace()[0];
        String className = source.getClassName();
        String methodName = source.getMethodName();
        int lineNumber = source.getLineNumber();
        String fileName = source.getFileName();

        // 2. Highly detailed internal log
        log.error("💥 [CRITICAL FAILURE] Trace: {}", traceId);
        log.error("   Location : {}.{}({}:{})", className, methodName, fileName, lineNumber);
        log.error("   Message  : {}", e.getMessage(), e);

        // 3. Safe external response (Never leak stack traces to the client)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(UNEXPECTED_ERROR_TRY_AGAIN + " [Error Ref: " + traceId + "]"));
    }
}