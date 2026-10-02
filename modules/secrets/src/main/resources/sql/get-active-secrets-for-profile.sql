SELECT
    s.id,
    s.profile_id,
    s.name,
    s.description,
    s.status,
    s.current_version,
    t.name AS type_name,
    e.name AS environment_name,
    e.color AS environment_color
FROM secrets.user_secrets s
         JOIN secrets.secret_type t ON s.type_id = t.id
         JOIN secrets.environment e ON s.environment_id = e.id
WHERE s.profile_id = :profileId
  AND s.deleted_at IS NULL
ORDER BY e.name, s.name;