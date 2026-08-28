package org.secbase.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.modulith.Modulithic;

@Modulithic(systemName = "Secbase")
@SpringBootApplication(scanBasePackages = "org.secbase")
@EnableJdbcRepositories(basePackages = "org.secbase")
public class PlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlatformApplication.class, args);
	}

}
