package com.mata.guesstheimagebackend.config;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.mata.guesstheimagebackend.util.DTOModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.persistence.EntityManager;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final ApplicationContext applicationContext;
    private final EntityManager entityManager;

    @Autowired
    public WebMvcConfig(ApplicationContext applicationContext, EntityManager entityManager) {
        this.applicationContext = applicationContext;
        this.entityManager = entityManager;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().applicationContext(this.applicationContext).build();
        argumentResolvers.add(new DTOModelMapper(objectMapper, entityManager));
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Map "/"
        registry.addViewController("/")
                .setViewName("forward:/index.html");
        // Map "/word", "/word/word", and "/word/word/word" - except for anything starting with "/api/..." or ending with
        // a file extension like ".js" - to index.html. By doing this, the client receives and routes the url. It also
        // allows client-side URLs to be bookmarked.

        // Single directory level - no need to exclude "/api" and "/swagger-ui.html"
        registry.addViewController("/{x:[\\w\\-]+}")
                .setViewName("forward:/index.html");
        // Multi-level directory path, need to exclude "api" on the first part of the path
        registry.addViewController("/{x:^(?!api|swagger\\-ui\\.html).*$}/**/{y:[\\w\\-]+}")
                .setViewName("forward:/index.html");
    }
}
