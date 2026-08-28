package org.secbase.common.security;

import org.springframework.security.core.userdetails.UserDetails;

public interface SecbasePrincipal extends UserDetails {
    Long getId();
}
