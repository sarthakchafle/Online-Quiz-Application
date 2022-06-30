package com.cts.mfpe.EvaluationService;

import com.cts.mfpe.EvaluationService.models.UserScore;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class EvaluationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EvaluationServiceApplication.class, args);
    }

    @Bean
    public UserScore userScore(){
        return new UserScore();
    }
}
