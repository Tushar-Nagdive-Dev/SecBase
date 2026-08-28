package org.secbase.common.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Pointcut("execution(public * org.secbase..*(..)) && !within(org.secbase.common.logging..*)")
    public void applicationPackagePointcut() {}

    @Around("applicationPackagePointcut()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        String methodSignature = joinPoint.getSignature().toShortString();

        log.info("--> Enter: {}", methodSignature);
        try {
            Object result = joinPoint.proceed();
            long elapsedTime = System.currentTimeMillis() - start;
            log.info("<-- Exit: {} |Executed in {}ms ", methodSignature, elapsedTime);
            return result;
        } catch (IllegalArgumentException ex) {
            log.error("! Illegal argument in {}: {}", methodSignature, ex.getMessage());
            throw ex;
        }
    }
}
