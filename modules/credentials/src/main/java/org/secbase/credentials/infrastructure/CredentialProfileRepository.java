package org.secbase.credentials.infrastructure;

import org.secbase.credentials.domain.CredentialProfile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CredentialProfileRepository extends CrudRepository<CredentialProfile, Long> {
    List<CredentialProfile> findAllByUserId(Long userId);
    boolean existsByUserIdAndName(Long userId, String name);
    boolean existsByUserIdAndCryptoVerifier(Long userId, String cryptoVerifier);
}
