package org.secbase.secrets.infrastructure;

import lombok.RequiredArgsConstructor;
import org.secbase.common.exception.SecbaseIllegalArgumentException;
import org.secbase.secrets.application.dtos.response.SecretOverviewResponse;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.secbase.common.constants.SecBaseApplicationMSGConstants.ErrorMsg.LOAD_SQL_QUERY_STRING_MSG;

@Component
@RequiredArgsConstructor
public class SecretQueryDao {

    private final JdbcClient jdbcClient;

    private final ResourceLoader resourceLoader;

    public List<SecretOverviewResponse> getActiveSecretsForProfile(Long profileId) {
        String sql = loadSqlQuery();

        return jdbcClient.sql(sql)
                .param("profileId", profileId)
                .query((rs, rowNum) -> new SecretOverviewResponse(
                        rs.getLong("id"),
                        rs.getLong("profile_id"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("status"),
                        rs.getInt("current_version"),
                        rs.getString("type_name"),
                        rs.getString("environment_name"),
                        rs.getString("environment_color")
                )).list();
    }

    private String loadSqlQuery() {
        try {
            return this.resourceLoader.getResource("classpath:sql/get-active-secrets-for-profile.sql").getContentAsString(StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new SecbaseIllegalArgumentException(String.format(LOAD_SQL_QUERY_STRING_MSG, e));
        }
    }
}
