package com.colcampo.colcampo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.colcampo.colcampo.repositorios")
@EntityScan(basePackages = "com.colcampo.colcampo.entidades")
public class ColcampoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ColcampoApplication.class, args);
	}

}
