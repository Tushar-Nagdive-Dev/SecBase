package org.secbase.secrets.presentation;

import lombok.RequiredArgsConstructor;
import org.secbase.common.presentation.ApiResponse;
import org.secbase.common.security.SecbasePrincipal;
import org.secbase.secrets.application.ISecretTaxonomyService;
import org.secbase.secrets.application.ISecretsProfileService;
import org.secbase.secrets.application.dtos.SecretTypeDto;
import org.secbase.secrets.application.dtos.request.CreateSecretsProfileRequest;
import org.secbase.secrets.application.dtos.request.UpdateSecretsProfileRequest;
import org.secbase.secrets.application.dtos.response.SecretsProfileResponse;
import org.secbase.secrets.domain.SecretsProfile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationConstants.ApiConstants.*;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.SuccessMsg.*;

@RestController
@RequestMapping(SECRETS_PATH)
@RequiredArgsConstructor
public class SecretsController {

    private final ISecretTaxonomyService secretTaxonomyService;

    private final ISecretsProfileService secretsProfileService;

    @GetMapping(TAXONOMY)
    public ResponseEntity<ApiResponse<List<SecretTypeDto>>> getTaxonomy() {
        return ResponseEntity.ok(ApiResponse.success(RETRIEVE_SECRETS_TAXONOMY, this.secretTaxonomyService.getActiveTaxonomy()));
    }

    @GetMapping(PROFILE)
    public ResponseEntity<ApiResponse<List<SecretsProfileResponse>>> getProfile(@AuthenticationPrincipal SecbasePrincipal principal) {
        List<SecretsProfileResponse> response = this.secretsProfileService.getProfiles(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(SECRETS_PROFILES_RETRIEVED_SUCCESSFULLY, response));
    }

    @GetMapping(PROFILE_WITH_ID)
    public ResponseEntity<ApiResponse<SecretsProfileResponse>> getProfileById(@AuthenticationPrincipal SecbasePrincipal principal, @PathVariable Long id) {
        SecretsProfileResponse response = this.secretsProfileService.getProfileById(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(SECRETS_PROFILES_RETRIEVED_SUCCESSFULLY, response));
    }

    @PostMapping(PROFILE)
    public ResponseEntity<ApiResponse<SecretsProfileResponse>> createProfile(@AuthenticationPrincipal SecbasePrincipal principal, @RequestBody CreateSecretsProfileRequest request) {
        SecretsProfileResponse response = this.secretsProfileService.createProfile(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(SECRETES_PROFILE_CREATED_SUCCESSFULLY, response));
    }

    @PutMapping(PROFILE_WITH_ID)
    public ResponseEntity<ApiResponse<SecretsProfileResponse>> updateProfile(@AuthenticationPrincipal SecbasePrincipal principal, @PathVariable Long id, @RequestBody UpdateSecretsProfileRequest request) {
        SecretsProfileResponse response = this.secretsProfileService.updateProfile(principal.getId(), id, request);
        return ResponseEntity.ok(ApiResponse.success(SECRETES_PROFILE_UPDATED_SUCCESSFULLY, response));
    }

    @DeleteMapping(PROFILE_WITH_ID)
    public ResponseEntity<ApiResponse<Void>> deactiveProfile(@AuthenticationPrincipal SecbasePrincipal principal, @PathVariable Long id) {
        this.secretsProfileService.deactivateProfile(principal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(SECRETS_PROFILE_DEACTIVATED_SUCCESSFULLY, null));
    }
}
