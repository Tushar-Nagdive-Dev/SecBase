-- ==============================================================================
-- V6__seed_taxonomy_data.sql
-- Purpose: Seeds the system-defined reference data for Secret Types (Flattened Taxonomy)
-- ==============================================================================

INSERT INTO secrets.secret_type (code, name, description) VALUES
    ('API_KEY', 'API Key', 'Standard API keys and webhooks (e.g., OpenAI, Stripe)'),
    ('TOKEN', 'Token', 'Authentication tokens, JWTs, and session credentials'),
    ('CERTIFICATE', 'Certificate', 'Cryptographic certificates, SSL, and PKI chains'),
    ('CLOUD_KEY', 'Cloud Key', 'Cloud provider access keys (e.g., AWS, GCP, Azure)'),
    ('DATABASE', 'Database Credential', 'Database connection strings and passwords'),
    ('OTHER', 'Other / Custom', 'Generic secure text or JSON payload')
ON CONFLICT (code) DO NOTHING;