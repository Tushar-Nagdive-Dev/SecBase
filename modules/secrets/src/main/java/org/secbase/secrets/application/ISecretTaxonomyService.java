package org.secbase.secrets.application;

import org.secbase.secrets.application.dtos.SecretTypeDto;

import java.util.List;

public interface ISecretTaxonomyService {
    List<SecretTypeDto> getActiveTaxonomy();
}
