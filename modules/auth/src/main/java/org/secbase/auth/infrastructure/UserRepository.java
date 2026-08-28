package org.secbase.auth.infrastructure;

import org.secbase.auth.domain.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {
    Optional<Users> findByUsernameOrEmail(String username, String email);
    Optional<Users> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
