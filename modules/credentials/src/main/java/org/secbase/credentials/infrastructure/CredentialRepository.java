package org.secbase.credentials.infrastructure;

import org.secbase.credentials.domain.Credential;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CredentialRepository extends CrudRepository<Credential, Long> {

    @Query("SELECT * FROM creds.credentials WHERE profile_id=:profileId ORDER BY created_time DESC")
    List<Credential> findBaseByProfileId(@Param("profileId") Long profileId);

    @Query("SELECT * FROM creds.credentials WHERE profile_id=:profileId AND is_favorite=true ORDER BY name ASC")
    List<Credential> findBaseFavoriteByProfileId(@Param("profileId") Long profileId);
}
