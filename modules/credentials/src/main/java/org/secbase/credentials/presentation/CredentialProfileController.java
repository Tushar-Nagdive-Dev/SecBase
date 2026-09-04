package org.secbase.credentials.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.secbase.common.presentation.ApiResponse;
import org.secbase.common.security.SecbasePrincipal;
import org.secbase.credentials.application.ICredentialProfileService;
import org.secbase.credentials.application.dtos.request.CreateCredentialProfileRequest;
import org.secbase.credentials.application.dtos.response.CredentialProfileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationConstants.ApiConstants.CREDENTIALS_PATH;
import static org.secbase.common.constants.SecBaseApplicationConstants.PROFILES;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.SuccessMsg.CREDENTIAL_ENCLAVE_CREATED;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.SuccessMsg.CREDENTIAL_ENCLAVE_PROFILE_FETCHED;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(CREDENTIALS_PATH)
public class CredentialProfileController {

    private final ICredentialProfileService profileService;

    @PostMapping(PROFILES)
    public ResponseEntity<ApiResponse<CredentialProfileResponse>> createProfile(@AuthenticationPrincipal SecbasePrincipal principal, @RequestBody CreateCredentialProfileRequest request) {
        log.info("createProfile {}", principal);
        CredentialProfileResponse response = this.profileService.createProfile(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(CREDENTIAL_ENCLAVE_CREATED, response));
    }

    @GetMapping(PROFILES)
    public ResponseEntity<ApiResponse<List<CredentialProfileResponse>>> getProfiles(@AuthenticationPrincipal SecbasePrincipal principal) {
        log.info("getProfiles {}", principal);
        List<CredentialProfileResponse> profiles = this.profileService.getProfiles(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(CREDENTIAL_ENCLAVE_PROFILE_FETCHED, profiles));
    }
}
