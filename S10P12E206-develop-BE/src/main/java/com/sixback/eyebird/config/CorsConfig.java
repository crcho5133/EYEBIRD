package com.sixback.eyebird.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // TODO 추후 배포시 수정
                .allowedMethods("GET", "POST", "PUT","PATCH", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
