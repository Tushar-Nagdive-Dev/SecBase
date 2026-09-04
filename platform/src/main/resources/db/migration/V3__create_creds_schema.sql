CREATE SCHEMA IF NOT EXISTS creds;

CREATE TABLE creds.credential_profiles (
   id BIGSERIAL PRIMARY KEY,
   user_id BIGINT NOT NULL,

-- UI & Presentation Metadata
   name VARCHAR(100) NOT NULL,
   icon VARCHAR(50) NOT NULL,
   color VARCHAR(50) NOT NULL,

-- Zero-Knowledge Cryptographic Material
   crypto_salt VARCHAR(255) NOT NULL,
   crypto_verifier VARCHAR(255) NOT NULL,

-- BaseEntity Audit Columns
   version INTEGER,
   created_time TIMESTAMP,
   modified_time TIMESTAMP,
   creator VARCHAR(255),
   created_id BIGINT,
   created_by VARCHAR(255),
   modifier VARCHAR(255),
   modified_id BIGINT,
   modified_by VARCHAR(255)
);

-- Enforce unique profile name per user
CREATE UNIQUE INDEX idx_cred_profile_user_name ON creds.credential_profiles(user_id, name);

-- Zero-knowledge: Prevent master password reuse across enclaves for the same user
CREATE UNIQUE INDEX idx_cred_profile_user_verifier ON creds.credential_profiles(user_id, crypto_verifier);