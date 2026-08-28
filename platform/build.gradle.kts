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

    // Spring Boot
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-flyway")

    // Database
    implementation("org.flywaydb:flyway-database-postgresql")
    runtimeOnly("org.postgresql:postgresql")

    // OpenAPI
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:3.1.0")

    // Lombok
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Tests
    testImplementation("org.springframework.boot:spring-boot-starter-data-jdbc-test")
    testImplementation("org.springframework.boot:spring-boot-starter-flyway-test")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")

    testCompileOnly("org.projectlombok:lombok")
    testAnnotationProcessor("org.projectlombok:lombok")

    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}