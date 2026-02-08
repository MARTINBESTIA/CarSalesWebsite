package com.martin.autobazar.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // uploadDir points to .../images/listings; expose parent 'images' folder under /images/**
        try {
            Path p = Paths.get(uploadDir).toAbsolutePath().normalize();
            Path imagesRoot = p.getParent();
            if (imagesRoot != null) {
                String location = "file:" + imagesRoot.toString() + "/";
                registry.addResourceHandler("/images/**")
                        .addResourceLocations(location)
                        .setCachePeriod(3600);
            }
        } catch (Exception ex) {
            // fallback: do nothing
            ex.printStackTrace();
        }
    }
}
