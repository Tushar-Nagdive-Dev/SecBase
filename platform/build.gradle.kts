plugins {
    id("org.springframework.boot")
    id("io.spring.dependency-management")
}

dependencies {
    // Internal modules
    implementation(project(":common"))
    implementation(project(":modules:auth"))
    implementation(project(":modules:secrets"))
    implementation(project(":modules:credentials"))
    implementation(project(":modules:cli"))

    // .env reader
    implementation("me.paulschwarz:spring-dotenv:4.0.0")

    // Spring Boot Infrastructure
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-flyway")

    // Modulith runtime
    implementation("org.springframework.modulith:spring-modulith-starter-core")
    implementation("org.springframework.modulith:spring-modulith-starter-jdbc")
    runtimeOnly("org.springframework.modulith:spring-modulith-runtime")

    // Database
    implementation("org.flywaydb:flyway-database-postgresql")
    runtimeOnly("org.postgresql:postgresql")

    // OpenAPI
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:3.1.0")

    // Platform-specific Tests (JDBC/Flyway)
    testImplementation("org.springframework.boot:spring-boot-starter-data-jdbc-test")
    testImplementation("org.springframework.boot:spring-boot-starter-flyway-test")
}