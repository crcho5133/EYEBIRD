package com.sixback.eyebird.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sixback.eyebird.api.dto.MessageReqDto;
import com.sixback.eyebird.api.dto.MessageResDto;
import com.sixback.eyebird.api.service.MessageService;
import com.sixback.eyebird.api.service.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class MessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;
    private final UserService userService;
    private final MessageService messageService;

    //  나의 메세지 모두 가져오기(REST)

    // 특정 메세지 확인하기(REST)
    @PatchMapping("")
    public ResponseEntity<Void> readMessage(@RequestParam("messageId") Long messageId) {
        messageService.readMessage(messageId);

        return ResponseEntity.ok().build();
    }

    // 메세지 보내기(Websocket)
    @MessageMapping("/private")
    public void sendMessage(MessageReqDto messageReqDto, Authentication authentication) throws JsonProcessingException {
        // 메세지의 발신자의 이메일과 수신자의 닉네임
        String userFromNickname = userService.getNicknameFromEmail(authentication.getName());
        String userToNickname = messageReqDto.getUserToNickname();

        int msgType = messageReqDto.getMsgType();
        String msgText = messageReqDto.getMsgText();

        // webSocket으로 메세지의 수신자에게 메세지를 보내줌
        MessageResDto messageResDto = MessageResDto.builder().msgType(msgType).msgText(msgText).userFromNickname(userFromNickname)
                .build();
        String jsonMessageResDto = objectMapper.writeValueAsString(messageResDto);
        messagingTemplate.convertAndSend("/user/private/" + userToNickname, jsonMessageResDto);

        // TODO DB에 메세지 저장
        messageService.saveMessage(messageReqDto, userFromNickname);

    }

    // 메세지 삭제(Websocket)

    // 친구 추가 수락


}
