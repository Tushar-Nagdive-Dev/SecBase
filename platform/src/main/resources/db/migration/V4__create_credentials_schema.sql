CREATE TABLE creds.credentials (
    id BIGSERIAL PRIMARY KEY,
    profile_id BIGINT NOT NULL REFERENCES creds.credential_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,

    -- New Master Enhancements
    is_favorite BOOLEAN DEFAULT FALSE,
    encrypted_custom_fields TEXT,

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

CREATE TABLE creds.credential_logins (
     credential_id BIGINT PRIMARY KEY REFERENCES creds.credentials(id) ON DELETE CASCADE,
     url VARCHAR(500),
     login_id VARCHAR(255),
     encrypted_password TEXT,
     encrypted_pin TEXT,
     encrypted_totp_seed TEXT
);

CREATE TABLE creds.credential_cards (
    credential_id BIGINT PRIMARY KEY REFERENCES creds.credentials(id) ON DELETE CASCADE,
    cardholder_name VARCHAR(255),
    masked_number VARCHAR(20),

-- New Card Enhancements
    card_brand VARCHAR(50),
    expiry_month VARCHAR(2),
    expiry_year VARCHAR(4),

    encrypted_number TEXT NOT NULL,
    encrypted_cvv TEXT,
    encrypted_pin TEXT
);

CREATE TABLE creds.credential_notes (
    credential_id BIGINT PRIMARY KEY REFERENCES creds.credentials(id) ON DELETE CASCADE,

    -- New Note Enhancement
    note_type VARCHAR(50) NOT NULL,    -- 'MARKDOWN', 'LICENSE_KEY', 'WIFI', etc.

    encrypted_content TEXT NOT NULL
);