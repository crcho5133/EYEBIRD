package com.sixback.eyebird.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sixback.eyebird.api.dto.FriendAcceptReqDto;
import com.sixback.eyebird.api.dto.MessageReqDto;
import com.sixback.eyebird.api.dto.MessageResDto;
import com.sixback.eyebird.api.service.MessageService;
import com.sixback.eyebird.api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class MessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;
    private final UserService userService;
    private final MessageService messageService;

    //  나의 메세지 모두 가져오기(REST)
    @GetMapping("")
    public ResponseEntity<List<MessageResDto>> getMessages(Authentication authentication) {
        String email = authentication.getName();

        // 나에게 온 메세지를 모두 검색
        List<MessageResDto> myMessages = messageService.getMessages(email);

        return ResponseEntity.ok().body(myMessages);
    }

    // 특정 메세지 확인하기(REST)
    @PatchMapping("")
    public ResponseEntity<Void> readMessage(@RequestParam("messageId") Long messageId) {
        messageService.readMessage(messageId);

        return ResponseEntity.ok().build();
    }

    // 메세지 보내기(Websocket)
    @MessageMapping("/private")
    public void sendMessage(MessageReqDto messageReqDto, Authentication authentication) throws JsonProcessingException {
        // 메세지의 발신자의 이메일과 닉네임
        String userFromEmail = authentication.getName();
        String userFromNickname = userService.getNicknameFromEmail(userFromEmail);

        // 메세지의 수신자의 닉네임과 이메일
        String userToNickname = messageReqDto.getUserToNickname();
        String userToEmail = userService.getEmailFromNickname(userToNickname);

        int msgType = messageReqDto.getMsgType();
        String msgText = messageReqDto.getMsgText();

        // webSocket으로 메세지의 수신자에게 메세지를 보내줌
        MessageResDto messageResDto = MessageResDto.builder().msgType(msgType).msgText(msgText).userFromNickname(userFromNickname)
                .build();
        String jsonMessageResDto = objectMapper.writeValueAsString(messageResDto);

        // 수신자의 url
        messagingTemplate.convertAndSend("/user/private/" + userToEmail, jsonMessageResDto);

        // 송신한 메세지 저장
        messageService.saveMessage(messageReqDto, userFromNickname);

    }

    // 메세지 삭제(REST API)
    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable String messageId) {
        Long id = Long.parseLong(messageId);
        messageService.deleteMessage(id);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/friend")
    public ResponseEntity<Void> acceptFriendRequest(@RequestBody @Valid FriendAcceptReqDto friendAcceptReqDto, Authentication authentication) {
        String userFromNickname = friendAcceptReqDto.getUserFrom();
        String userToEmail = authentication.getName();

        // 친구 요청 메세지를 삭제한다
        messageService.acceptFriend(userFromNickname, userToEmail);

        // webSocket으로 상대방에게 친구 수락이 되었음을 알려준다
        String userFromEmail = userService.getEmailFromNickname(userFromNickname);
        String userToNickname = userService.getNicknameFromEmail(userToEmail);
        messagingTemplate.convertAndSend("/user/private/" + userFromEmail, userToNickname + "님이 친구 요청을 수락했습니다");

        return ResponseEntity.ok().build();

    }


}
