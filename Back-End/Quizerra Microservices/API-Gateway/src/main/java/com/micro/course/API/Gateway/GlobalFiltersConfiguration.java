package com.micro.course.API.Gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class GlobalFiltersConfiguration {
    final Logger logger = LoggerFactory.getLogger(GlobalFiltersConfiguration.class);

    @Bean
    public CorsWebFilter corsWebFilter() {
        List<String> headers = new ArrayList<>();
        headers.add("token");
        headers.add("userId");
        final CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Collections.singletonList("*"));
        corsConfig.setMaxAge(3600L);
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST"));
        corsConfig.addAllowedHeader("*");
//        corsConfig.setAllowedHeaders(headers);
//        corsConfig.setAllowCredentials(true);
//        configuration.setAllowedOrigins(Arrays.asList(FRONT_END_SERVER));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        corsConfig.setAllowedHeaders(Arrays.asList("X-Requested-With","Origin","Content-Type","Accept","Authorization","token","userId"));

        // This allow us to expose the headers
        corsConfig.setExposedHeaders(Arrays.asList("Access-Control-Allow-Headers", "Authorization, x-xsrf-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, " +
                "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers","token","userId"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }

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
