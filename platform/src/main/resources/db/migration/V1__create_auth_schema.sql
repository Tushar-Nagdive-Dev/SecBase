-- V1__create_auth_schema.sql
CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE auth.users (
    id BIGSERIAL PRIMARY KEY,
    version INTEGER,

    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    active BOOLEAN NOT NULL DEFAULT TRUE,

    -- Audit fields matching BaseEntity
    created_time TIMESTAMP,
    modified_time TIMESTAMP,
    creator VARCHAR(255),
    created_id BIGINT,
    created_by VARCHAR(255),
    modifier VARCHAR(255),
    modified_id BIGINT,
    modified_by VARCHAR(255)
);