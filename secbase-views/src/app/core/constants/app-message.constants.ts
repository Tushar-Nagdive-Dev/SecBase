// ./src/app/core/constants/app-message.constants.ts
export const APP_MESSAGES = Object.freeze({
    TOAST_MSG: {
        PLEASE_FILL_ALL_REGISTRATION_REQUIRED_FIELDS: 'Please fill in all registration required fields correctly.',
        BLACK_BOX_INITIALIZED: 'SecBase BlackBox initialized! Please sign in.',
        REGISTRATION_FAILED: 'Registration failed.',
        PLEASE_ENTER_BOTH_YOUR_IDENTIFIER_AND_MASTER_PASSWORD: 'Please enter both your identifier and master password.',
        ACCESS_GRANTED: 'Access granted. Welcome back!',
        FAILED_TO_AUTHENTICATE: 'Failed to authenticate.',
        SECBASE_SYSTEM_LOGOUT: 'SecBase System Logout Successfully',
        ENCLAVE_IS_CURRENTLY_LOCKED: 'Enclave is currently locked. No cryptographic key in memory.',
        ENCLAVE_AUTO_LOCK_DUE_TO_INACTIVITY: 'Enclave auto-locked due to inactivity.',
        FAILED_TO_FETCH_PROFILES: 'Failed to fetch profiles',
        UNLOCK_FAILED: 'Unlock failed',
        CREDENTIAL_TYPE_NOT_SUPPORTED: 'Credential type not supported',
        COPY_TO_CLIPBOARD: 'Copied to clipboard',
        COPY_FAILED: 'Failed to copy to clipboard',
        DECRYPTION_FAILED_OR_ENCLAVE_LOCKED: 'Decryption failed or Enclave locked',
        CREDENTIAL_DETAILS_NOT_FOUND: 'Credential details not found',
        ENCRYPTION_OR_NETWORK_FAILURE: 'Encryption or network failure:'
    }
});
