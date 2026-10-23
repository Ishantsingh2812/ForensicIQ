package com.forensicai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Value("${ai-service.url:http://localhost:8000}")
    private String aiServiceUrl;

    @Value("${ai-service.connect-timeout-ms:5000}")
    private int connectTimeout;

    @Value("${ai-service.read-timeout-ms:45000}")
    private int readTimeout;

    @Bean
    public RestClient aiRestClient() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(connectTimeout);
        requestFactory.setReadTimeout(readTimeout);

        return RestClient.builder()
                .baseUrl(aiServiceUrl)
                .requestFactory(requestFactory)
                .build();
    }
}
