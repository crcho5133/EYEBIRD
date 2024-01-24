package com.sixback.eyebird.config;

import com.sixback.eyebird.api.dto.Room;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Value("${spring.data.redis.host}")
    private String host;
    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){
        return  new LettuceConnectionFactory(host, port);
    }

    @Bean
    public RedisTemplate<String, Room> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Room> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // 직렬화 방식 설정
        Jackson2JsonRedisSerializer<Room> serializer = new Jackson2JsonRedisSerializer<>(Room.class);
        redisTemplate.setValueSerializer(serializer);
        redisTemplate.setKeySerializer(new StringRedisSerializer());


        return redisTemplate;
    }
}
