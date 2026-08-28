package org.secbase.common.domain;

import org.jspecify.annotations.NonNull;
import org.secbase.common.security.SecbasePrincipal;
import org.springframework.data.relational.core.mapping.event.BeforeConvertCallback;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import static org.secbase.common.constants.SecBaseApplicationConstants.*;

@Component
public class AuditEntityInterceptor implements BeforeConvertCallback<BaseEntity> {

    @Override
    public BaseEntity onBeforeConvert(@NonNull BaseEntity aggregate) {
        // 1. Default to SYSTEM constants for unauthenticated actions
        Long currentPrincipalId = ONE;
        String currentPrincipalName = SECBASE_SYSTEM;
        String currentSystem = SECBASE_CORE;

        // 2. Safely extract the live authentication from Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
            if (authentication.getPrincipal() instanceof SecbasePrincipal principal) {
                currentPrincipalId = principal.getId();
                currentPrincipalName = principal.getUsername();
            } else {
                currentPrincipalName = authentication.getName();
            }
        }

        if (aggregate.getVersion() == null || aggregate.getVersion() == 0) {
            aggregate.setCreatedBy(currentSystem);
            aggregate.setCreatedId(currentPrincipalId);
            aggregate.setCreator(currentPrincipalName);
        }

        aggregate.setModifiedBy(currentSystem);
        aggregate.setModifiedId(currentPrincipalId);
        aggregate.setModifier(currentPrincipalName);
        return aggregate;
    }
}
