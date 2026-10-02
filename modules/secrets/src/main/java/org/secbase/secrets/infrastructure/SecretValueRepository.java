package org.secbase.secrets.infrastructure;

import org.secbase.secrets.domain.SecretValue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecretValueRepository extends CrudRepository<SecretValue, Long> {
}
