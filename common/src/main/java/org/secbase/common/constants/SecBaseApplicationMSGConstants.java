package org.secbase.common.constants;

public final class SecBaseApplicationMSGConstants {
    private SecBaseApplicationMSGConstants() {
        throw new IllegalArgumentException("SecBaseApplicationMSGConstants is a utility class and cannot be instantiated.");
    }

    public static final class ErrorMsg {
        private ErrorMsg() {
            throw new  IllegalArgumentException("errorMsg is a utility class and cannot be instantiated.");
        }

        public static final String USERNAME_IS_ALREADY_TAKEN = "Username is already taken.";
        public static final String EMAIL_IS_ALREADY_REGISTERED = "Email is already registered.";
        public static final String INVALID_CREDENTIALS = "Invalid credentials.";
        public static final String ACCOUNT_IS_DEACTIVATED = "Account is deactivated.";
        public static final String UNEXPECTED_ERROR_TRY_AGAIN = "An unexpected error occurred. Please try again later.";
        public static final String PROFILE_ALREADY_EXISTS = "An enclave with this profile name already exists.";
        public static final String PROFILE_MASTER_PASSWORD_EXISTS = "Master password already in use. Each enclave must have a distinct password.";
        public static final String ACCESS_DENIED_TO_THIS_ENCLAVE = "Access denied to this Enclave.";
        public static final String CREDENTIAL_NOT_FOUND = "Credential not found";
    }

    public static final class SuccessMsg {
        private SuccessMsg() {
        }

        public static final String REGISTRATION_SUCCESSFUL = "Registration successful";
        public static final String LOGIN_SUCCESSFUL = "Login successful";
        public static final String SECBASE_LOGOUT = "SecBase locked and session terminated.";
        public static final String CREDENTIAL_ENCLAVE_CREATED = "Credential enclave profile created successfully";
        public static final String CREDENTIAL_ENCLAVE_PROFILE_FETCHED = "Credential enclave profiles fetched.";
        public static final String CREDENTIAL_LIST_RETRIEVED_SUCCESSFULLY = "Credential list retrieved successfully";
        public static final String CREDENTIAL_DETAILS_RETRIEVED_SUCCESSFULLY = "Credential details retrieved successfully";
        public static final String CREDENTIAL_SECURELY_STORED = "Credential securely stored.";
        public static final String CREDENTIAL_UPDATED = "Credential updated.";
    }

}
