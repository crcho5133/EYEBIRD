package com.sixback.eyebird.uncategorized;

import com.sixback.eyebird.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

    private final JwtTokenUtil jwtTokenUtil;
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // websocket 연결 시
        if ((StompCommand.CONNECT.equals(accessor.getCommand()))) {
            String authorizationHeader = accessor.getFirstNativeHeader("Authorization");

            // Authorization header의
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);

                jwtTokenUtil.validateToken(token);

            }

        }

        return message;

    }
}
