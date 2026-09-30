package org.secbase.secrets.infrastructure;

import org.secbase.secrets.domain.SecretType;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecretTypeRepository extends CrudRepository<SecretType, Long> {

    @Query("SELECT id, name, code, description, is_active, created_at, updated_at FROM secrets.secret_type WHERE is_active=true")
    List<SecretType> findAllByIsActiveTrue();
}
