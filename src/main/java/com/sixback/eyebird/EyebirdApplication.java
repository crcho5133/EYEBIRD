package com.sixback.eyebird;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableJpaAuditing // JPA auditing 활성화
public class EyebirdApplication {

	public static void main(String[] args) {
		SpringApplication.run(EyebirdApplication.class, args);
	}

}
