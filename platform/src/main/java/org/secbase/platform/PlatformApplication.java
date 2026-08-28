package org.secbase.platform;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.modulith.Modulithic;

@Modulithic(systemName = "Secbase")
@SpringBootApplication(scanBasePackages = "org.secbase")
@EnableJdbcRepositories(basePackages = "org.secbase")
public class PlatformApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().directory("./").ignoreIfMissing().load();
		if (dotenv.entries().isEmpty()) {
			dotenv = Dotenv.configure().directory("../").ignoreIfMissing().load();
		}
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(PlatformApplication.class, args);
	}

}
