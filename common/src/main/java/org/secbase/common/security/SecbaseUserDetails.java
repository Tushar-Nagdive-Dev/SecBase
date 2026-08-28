package org.secbase.common.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@RequiredArgsConstructor
public class SecbaseUserDetails implements SecbasePrincipal {

    private final Long id;
    private final String username;
    private final Collection<? extends GrantedAuthority> authorities;

    @Override
    public @Nullable String getPassword() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return SecbasePrincipal.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return SecbasePrincipal.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return SecbasePrincipal.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return SecbasePrincipal.super.isEnabled();
    }
}
