-- V2__create_user_roles.sql
CREATE TABLE auth.user_roles (
     user_id BIGINT NOT NULL,
     role VARCHAR(50) NOT NULL,
     CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);