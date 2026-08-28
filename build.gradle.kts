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
	// Apply java-library so Spring Boot doesn't try to build a server out of every module
	apply(plugin = "java-library")
	apply(plugin = "io.spring.dependency-management")

	java {
		toolchain {
			languageVersion = JavaLanguageVersion.of(25)
		}
	}

	// GLOBALLY MANAGE VERSIONS: Modules won't need to specify version numbers
	// DELETE THIS:
	// ADD THIS INSTEAD:
	configure<io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension> {
		imports {
			mavenBom("org.springframework.boot:spring-boot-dependencies:4.1.1")
			mavenBom("org.springframework.modulith:spring-modulith-bom:2.1.1")
		}
	}

	// GLOBALLY APPLIED DEPENDENCIES: Every module gets these automatically
	dependencies {
		implementation("org.springframework.boot:spring-boot-starter-aspectj")
		// Lombok
		compileOnly("org.projectlombok:lombok")
		annotationProcessor("org.projectlombok:lombok")
		testCompileOnly("org.projectlombok:lombok")
		testAnnotationProcessor("org.projectlombok:lombok")

		// Standard Testing
		testImplementation("org.springframework.boot:spring-boot-starter-test")
		testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	}

	tasks.withType<Test> {
		useJUnitPlatform()
	}
}