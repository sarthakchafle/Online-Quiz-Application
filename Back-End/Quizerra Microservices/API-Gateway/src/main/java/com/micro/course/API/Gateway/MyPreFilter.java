package com.micro.course.API.Gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Set;


@Component
public class MyPreFilter implements GlobalFilter, Ordered {
    final Logger logger = LoggerFactory.getLogger(MyPreFilter.class);
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        logger.info("My first Pre-filter is executed...");
        ServerHttpRequest requestPath =exchange.getRequest();
        logger.info("Request path ="+requestPath);
        HttpHeaders headers = exchange.getRequest().getHeaders();
       Set<String> headerNames = headers.keySet();
       headerNames.forEach(e->{
           String headerValue = headers.getFirst(e);
           logger.info(e + " "+ headerValue);
       });
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 0;
    }
}