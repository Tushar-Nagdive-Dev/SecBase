package org.secbase.secrets.infrastructure;

import org.secbase.secrets.domain.UserSecret;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSecretRepository extends CrudRepository<UserSecret, Long> {

    @Query("SELECT count(id) > 0 FROM secrets.user_secrets WHERE profile_id = :profileId AND environment_id = :environmentId AND name = :name, AND deleted_at IS NULL")
    boolean existsByProfileAndEnvironmentAndName(@Param("profileId") Long profileId, @Param("environmentId") Long environmentId, @Param("name") String name);
}
