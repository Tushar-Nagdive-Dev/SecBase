package org.secbase.secrets.application.impl;

import lombok.RequiredArgsConstructor;
import org.secbase.secrets.application.ISecretTaxonomyService;
import org.secbase.secrets.application.dtos.SecretTypeDto;
import org.secbase.secrets.infrastructure.SecretTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SecretTaxonomyService implements ISecretTaxonomyService {

    private final SecretTypeRepository secretTypeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SecretTypeDto> getActiveTaxonomy() {
        return this.secretTypeRepository.findAllByIsActiveTrue().stream()
                .map(type -> new SecretTypeDto(type.getId(), type.getName(), type.getCode(), type.getDescription())).toList();
    }
}