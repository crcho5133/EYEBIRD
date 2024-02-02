package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.MessageReqDto;
import com.sixback.eyebird.db.entity.Message;
import com.sixback.eyebird.db.entity.User;
import com.sixback.eyebird.db.repository.MessageRepository;
import com.sixback.eyebird.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {

    private final UserRepository userRepository;

    private final MessageRepository messageRepository;

    // 수신한 메세지 DB에 저장
    public void saveMessage(MessageReqDto messageReqDto, String userFromNickname) {
        User userFrom = userRepository.findUserByNickname(userFromNickname).orElseThrow(() -> new IllegalArgumentException("해당 닉네임을 지닌 유저가 존재하지 않습니다"));
        User userTo = userRepository.findUserByNickname(messageReqDto.getUserToNickname()).orElseThrow(() -> new IllegalArgumentException("해당 닉네임을 지닌 유저가 존재하지 않습니다"));

        Message message = Message.builder()
                .msgType(messageReqDto.getMsgType())
                .msgText(messageReqDto.getMsgText())
                .ifRead(false)
                .userTo(userTo)
                .userFrom(userFrom)
                .build();

        messageRepository.save(message);
        log.info("송신된 메세지가 저장되었습니다");

    }

    // 특정한 메세지 확인
    public void readMessage(Long messageId) {
        Message message = messageRepository.findById(messageId).orElseThrow(() -> new IllegalArgumentException("메세지 확인: 확인하려고 하는 메세지가 존재하지 않습니다"));

        message.readMessage();
        log.info("메세지 확인");

    }
}
