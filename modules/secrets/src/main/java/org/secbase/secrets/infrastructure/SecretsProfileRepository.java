package org.secbase.secrets.infrastructure;

import org.secbase.secrets.domain.SecretsProfile;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecretsProfileRepository extends CrudRepository<SecretsProfile, Long> {

    @Query("SELECT * FROM secrets.secrets_profile WHERE user_id=:userId AND is_active=true")
    List<SecretsProfile> findAllActiveByUserId(@Param("userId") Long userId);

    @Query("SELECT * FROM secrets.secrets_profile WHERE id=:id AND user_id=:userId AND is_active=true")
    Optional<SecretsProfile> findActiveByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);

    @Query("SELECT count(id) > 0 FROM secrets.secrets_profile WHERE user_id=:userId AND name=:name AND is_active=true")
    Boolean existsByNameAndUserId(@Param("name") String name, @Param("userId") Long userId);
}
