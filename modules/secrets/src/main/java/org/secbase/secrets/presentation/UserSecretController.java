package org.secbase.secrets.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.secbase.common.presentation.ApiResponse;
import org.secbase.common.security.SecbasePrincipal;
import org.secbase.secrets.application.IUserSecretService;
import org.secbase.secrets.application.dtos.request.CreateSecretRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.secbase.common.constants.SecBaseApplicationConstants.ApiConstants.SECRETS_PATH;
import static org.secbase.common.constants.SecBaseApplicationMSGConstants.SuccessMsg.SECRETS_CREATED_SUCCESSFULLY;

@RestController
@RequiredArgsConstructor
@RequestMapping(SECRETS_PATH)
public class UserSecretController {

    private final IUserSecretService userSecretService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createSecret(@AuthenticationPrincipal SecbasePrincipal principal, @Valid @RequestBody CreateSecretRequest request) {
        this.userSecretService.createSecret(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(SECRETS_CREATED_SUCCESSFULLY, null));
    }

}
