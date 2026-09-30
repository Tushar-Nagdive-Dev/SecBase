package org.secbase.common.constants;

public final class SecBaseApplicationConstants {

    private SecBaseApplicationConstants() {
        throw new IllegalAccessError("Utility class");
    }

    public static final class ApiConstants {
        private ApiConstants() {
            throw new IllegalAccessError("Utility class");
        }

        public static final String REGISTER = "register";
        public static final String LOGIN = "login";
        public static final String LOGOUT = "logout";
        public static final String TAXONOMY = "taxonomy";
        public static final String PROFILE = "profile";
        public static final String PROFILE_WITH_ID = "profile/{id}";

        public static final String V3_API_DOCS = "/v3/api-docs/**";
        public static final String SWAGGER_V3_API_DOCS = "/swagger-ui/**";
        public static final String SWAGGER_UI_HTML = "/swagger-ui.html";
        public static final String AUTH_PATH = "api/v1/auth";
        public static final String ADMIN_PATH = "api/v1/admin";
        public static final String CREDENTIALS_PATH = "api/v1/credentials";
        public static final String SECRETS_PATH = "api/v1/secrets";
    }

    public static final int COOKIE_MAX_AGE = 24*60*60;
    public static final Integer ZERO = 0;
    public static final String EMPTY_STRING = "";
    public static final String FORWARD_SLASH = "/";
    public static final String MATCH_ALL = "/**";
    public static final String FORWARD_SLASH_BACKSLASH = "\\";
    public static final Long ONE = 1L;
    public static final String SECBASE = "SecBase";
    public static final String SECBASE_CORE = "SecBase-Core-User";
    public static final String SECBASE_SYSTEM = "SecBase-System-User";
    public static final String SECBASE_AUTH = "secbase-auth";
    public static final String SECBASE_ACCESS_TOKEN = "secbase_access_token";
    public static final String STRICT = "Strict";
    public static final String USERNAME = "username";
    public static final String EMAIL = "email";
    public static final String ROLES = "roles";
    public static final String ADMIN = "ADMIN";
    public static final String PROFILES = "profiles";
    public static final String ACTIVE = "ACTIVE";
    public static final String REVOKED = "REVOKED";
    public static final String DELETED = "DELETED";
}
