package org.secbase.common.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.UUID;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    private static final String TRACE_ID = "traceId";

    @Pointcut("execution(public * org.secbase..*(..)) && !within(org.secbase.common.logging..*) && !within(org.secbase.common.exception..*)")
    public void applicationPackagePointcut() {}

    @Around("applicationPackagePointcut()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        // 1. Thread Sequence Tracking: Generate a Trace ID if one doesn't exist in this thread
        boolean isNewTrace = false;
        if (MDC.get(TRACE_ID) == null) {
            MDC.put(TRACE_ID, UUID.randomUUID().toString().substring(0, 8));
            isNewTrace = true;
        }

        String className = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        long start = System.currentTimeMillis();

        // 2. Enhanced Entry Logging (Includes Arguments)
        log.info("▶ [ENTER] {}.{}() | Args: {}", className, methodName, Arrays.toString(args));

        try {
            Object result = joinPoint.proceed();
            long elapsedTime = System.currentTimeMillis() - start;

            // 3. Enhanced Exit Logging (Includes Execution Time)
            log.info("◀ [EXIT ] {}.{}() | Executed in {}ms", className, methodName, elapsedTime);

            return result;

        } catch (Throwable ex) {
            long elapsedTime = System.currentTimeMillis() - start;

            // 4. Exception Interception: Log exactly where the thread failed
            log.error("✖ [ERROR] {}.{}() failed after {}ms | Cause: {}",
                    className, methodName, elapsedTime, ex.getMessage());
            throw ex;

        } finally {
            // 5. Clean up MDC to prevent memory leaks in thread pools
            if (isNewTrace) {
                MDC.remove(TRACE_ID);
            }
        }
    }
}