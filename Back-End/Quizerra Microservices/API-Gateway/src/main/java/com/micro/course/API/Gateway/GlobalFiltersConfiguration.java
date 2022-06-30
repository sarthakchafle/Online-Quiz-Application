package com.micro.course.API.Gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import reactor.core.publisher.Mono;

@Configuration
public class GlobalFiltersConfiguration {
    final Logger logger = LoggerFactory.getLogger(GlobalFiltersConfiguration.class);

    @Order(1)
    @Bean
    public GlobalFilter secondPreFilter() {
        return ((exchange, chain) -> {
            logger.info("Second global pre-filter executed...");
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                logger.info("My second global post-filter was executed...");
            }));
        });
    }

    @Order(2)
    @Bean
    public GlobalFilter ThirdPreFilter() {
        return ((exchange, chain) -> {
            logger.info("Third global pre-filter executed...");
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                logger.info("My Third global post-filter was executed...");
            }));
        });
    }

    @Order(3)
    @Bean
    public GlobalFilter FourthPreFilter() {
        return ((exchange, chain) -> {
            logger.info("Fourth global pre-filter executed...");
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                logger.info("My Fourth global post-filter was executed...");
            }));
        });
    }
}
