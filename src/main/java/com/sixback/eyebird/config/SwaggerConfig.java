package com.sixback.eyebird.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("eyebird")
                .pathsToMatch("/api/**")
                .build();
    }
    @Bean
    public GroupedOpenApi publicApiRoom() {
        return GroupedOpenApi.builder()
                .group("room")
                .pathsToMatch("/api/room/**")
                .build();
    }

    @Bean
    public GroupedOpenApi publicApiUser() {
        return GroupedOpenApi.builder()
                .group("user")
                .pathsToMatch("/api/user/**")
                .build();
    }

    @Bean
    public GroupedOpenApi publicApiAuth() {
        return GroupedOpenApi.builder()
                .group("auth")
                .pathsToMatch("/api/auth/**")
                .build();
    }

}
