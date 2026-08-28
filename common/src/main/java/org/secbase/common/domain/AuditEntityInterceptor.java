package org.secbase.common.domain;

import org.springframework.context.ApplicationListener;
import org.springframework.data.relational.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import static org.secbase.common.constants.SecBaseApplicationConstants.*;

@Component
public class AuditEntityInterceptor implements ApplicationListener<BeforeConvertEvent<Object>> {

    @Override
    public void onApplicationEvent(BeforeConvertEvent<Object> event) {
        if (event.getEntity() instanceof BaseEntity entity) {
            // TODO: Replace these with actual values from SecurityContextHolder
            Long currentPrincipalId = ONE; // System Admin ID placeholder
            String currentPrincipalName = SECBASE_SYSTEM;
            String currentSystem = SECBASE_CORE;

            // If version is null or 0, it means this is a brand new INSERT
            if (entity.getVersion() == null || entity.getVersion() == 0) {
                entity.setCreatedBy(currentSystem);
                entity.setCreatedId(currentPrincipalId);
                entity.setCreator(currentPrincipalName);
            }

            // These fields update on every save (both INSERT and UPDATE)
            entity.setModifiedBy(currentSystem);
            entity.setModifiedId(currentPrincipalId);
            entity.setModifier(currentPrincipalName);
        }
    }

    @Override
    public boolean supportsAsyncExecution() {
        return ApplicationListener.super.supportsAsyncExecution();
    }
}
