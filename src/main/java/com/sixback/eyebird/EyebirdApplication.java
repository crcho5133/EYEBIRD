package com.sixback.eyebird;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing // JPA auditing 활성화
@EnableScheduling // redis 스케쥴링
public class EyebirdApplication {

	public static void main(String[] args) {
		SpringApplication.run(EyebirdApplication.class, args);
	}

}
