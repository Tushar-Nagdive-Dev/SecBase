package org.secbase.credentials.presentation;

import lombok.RequiredArgsConstructor;
import org.secbase.common.presentation.ApiResponse;
import org.secbase.common.security.SecbasePrincipal;
import org.secbase.credentials.application.ICredentialService;
import org.secbase.credentials.application.dtos.request.CreateCredentialRequest;
import org.secbase.credentials.application.dtos.request.UpdateCredentialRequest;
import org.secbase.credentials.application.dtos.response.CredentialBaseResponse;
import org.secbase.credentials.application.dtos.response.CredentialDetailResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationConstants.ApiConstants.CREDENTIALS_PATH;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.SuccessMsg.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(CREDENTIALS_PATH)
public class CredentialController {

    private final ICredentialService credentialService;

    @GetMapping("{profileId}/items")
    public ResponseEntity<ApiResponse<List<CredentialBaseResponse>>> getBaseCredentials(@AuthenticationPrincipal SecbasePrincipal principal, @PathVariable("profileId") Long profileId) {
        List<CredentialBaseResponse> items = this.credentialService.getBaseCredentials(principal.getId(), profileId);
        return ResponseEntity.ok(ApiResponse.success(CREDENTIAL_LIST_RETRIEVED_SUCCESSFULLY, items));
    }

    @GetMapping("{credentialId}")
    public ResponseEntity<ApiResponse<CredentialDetailResponse>> getCredentialDetail(@AuthenticationPrincipal SecbasePrincipal principal, @PathVariable("credentialId") Long credentialId) {
        CredentialDetailResponse detail = this.credentialService.getCredentialDetail(principal.getId(), credentialId);
        return ResponseEntity.ok(ApiResponse.success(CREDENTIAL_DETAILS_RETRIEVED_SUCCESSFULLY, detail));
    }

    @PostMapping("{profileId}/items")
    public ResponseEntity<ApiResponse<CredentialDetailResponse>> createCredential(@AuthenticationPrincipal SecbasePrincipal principal, @PathVariable("profileId") Long profileId, @RequestBody CreateCredentialRequest request) {
        CredentialDetailResponse detail = this.credentialService.createCredential(principal.getId(), profileId, request);
        return ResponseEntity.ok(ApiResponse.success(CREDENTIAL_SECURELY_STORED, detail));
    }

    @PutMapping("{credentialId}")
    public ResponseEntity<ApiResponse<CredentialDetailResponse>> updateCredential(@AuthenticationPrincipal SecbasePrincipal principal, @PathVariable("credentialId") Long credentialId, @RequestBody UpdateCredentialRequest request) {
        CredentialDetailResponse detail = this.credentialService.updateCredential(principal.getId(), credentialId, request);
        return ResponseEntity.ok(ApiResponse.success(CREDENTIAL_UPDATED, detail));
    }
}
