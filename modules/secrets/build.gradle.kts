dependencies {
    // Required for @RestControllerAdvice
    implementation(project(":common"))

    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    api("org.springframework.boot:spring-boot-starter-data-jdbc")
}