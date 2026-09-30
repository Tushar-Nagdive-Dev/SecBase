CREATE SCHEMA IF NOT EXISTS secrets;

-- 1. Create Secrets Profile (The Enclave Root for this Bounded Context)
CREATE TABLE secrets.secrets_profile (
     id BIGSERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     user_id BIGINT NOT NULL,
     description TEXT,
     icon VARCHAR(50),                  -- UI Icon
     color VARCHAR(20),                 -- UI Color
     crypto_salt VARCHAR(255) NOT NULL, -- For zero-knowledge UI decryption
     crypto_verifier TEXT NOT NULL,     -- Validates master password on the UI
     is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- BaseEntity Audit Fields
     version INTEGER NOT NULL DEFAULT 0,
     created_time TIMESTAMP WITH TIME ZONE,
     modified_time TIMESTAMP WITH TIME ZONE,
     creator VARCHAR(255),
     created_id BIGINT,
     created_by VARCHAR(255),
     modifier VARCHAR(255),
     modified_id BIGINT,
     modified_by VARCHAR(255)
);

-- 2. Generic Reference Table: Type (Replaces Category + Type)
CREATE TABLE secrets.secret_type (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Transactional Table: Environment (Scoped to secrets_profile)
CREATE TABLE secrets.environment (
    id BIGSERIAL PRIMARY KEY,
    profile_id BIGINT NOT NULL REFERENCES secrets.secrets_profile(id),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(20) DEFAULT '#000000',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- BaseEntity Audit Fields
    version INTEGER NOT NULL DEFAULT 0,
    created_time TIMESTAMP WITH TIME ZONE,
    modified_time TIMESTAMP WITH TIME ZONE,
    creator VARCHAR(255),
    created_id BIGINT,
    created_by VARCHAR(255),
    modifier VARCHAR(255),
    modified_id BIGINT,
    modified_by VARCHAR(255),

    UNIQUE(profile_id, code)
);

-- 4. Transactional Table: User Secret
CREATE TABLE secrets.user_secrets (
    id BIGSERIAL PRIMARY KEY,
    profile_id BIGINT NOT NULL REFERENCES secrets.secrets_profile(id),
    type_id BIGINT NOT NULL REFERENCES secrets.secret_type(id),
    environment_id BIGINT NOT NULL REFERENCES secrets.environment(id),

    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    current_version INTEGER NOT NULL DEFAULT 1,
    deleted_at TIMESTAMP WITH TIME ZONE,

    -- BaseEntity Audit Fields
    version INTEGER NOT NULL DEFAULT 0,
    created_time TIMESTAMP WITH TIME ZONE,
    modified_time TIMESTAMP WITH TIME ZONE,
    creator VARCHAR(255),
    created_id BIGINT,
    created_by VARCHAR(255),
    modifier VARCHAR(255),
    modified_id BIGINT,
    modified_by VARCHAR(255),

    UNIQUE(profile_id, environment_id, name)
);

-- 5. Transactional Table: SecretValue Value Ledger (Uses BaseEntity)
CREATE TABLE secrets.secret_value (
    id BIGSERIAL PRIMARY KEY,
    secret_id BIGINT NOT NULL REFERENCES secrets.user_secrets(id) ON DELETE CASCADE,
    payload_version INTEGER NOT NULL,

    encrypted_payload TEXT NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoked_by BIGINT,

    -- BaseEntity Audit Fields
    version INTEGER NOT NULL DEFAULT 0,
    created_time TIMESTAMP WITH TIME ZONE,
    modified_time TIMESTAMP WITH TIME ZONE,
    creator VARCHAR(255),
    created_id BIGINT,
    created_by VARCHAR(255),
    modifier VARCHAR(255),
    modified_id BIGINT,
    modified_by VARCHAR(255),

    UNIQUE(secret_id, payload_version)
);

-- 6. Constraints & Indexes
CREATE UNIQUE INDEX ux_secret_current_version ON secrets.secret_value(secret_id) WHERE is_current = TRUE;
CREATE INDEX idx_secrets_dashboard ON secrets.user_secrets(profile_id, environment_id) WHERE deleted_at IS NULL;