plugins {
	java
	id("org.springframework.boot") version "4.1.1" apply false
	id("io.spring.dependency-management") version "1.1.7" apply false
}

allprojects {
	group = "org.secbase"
	version = "0.0.1"

	repositories {
		mavenCentral()
	}
}

subprojects {
	apply(plugin = "java")

	java {
		toolchain {
			languageVersion = JavaLanguageVersion.of(25)
		}
	}

	tasks.withType<Test> {
		useJUnitPlatform()
	}
}