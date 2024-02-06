package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.MessageReqDto;
import com.sixback.eyebird.api.dto.MessageResDto;
import com.sixback.eyebird.db.entity.GameResult;
import com.sixback.eyebird.db.entity.Message;
import com.sixback.eyebird.db.entity.User;
import com.sixback.eyebird.db.repository.MessageRepository;
import com.sixback.eyebird.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
                .msgId(messageReqDto.getMsgId())
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

    // 나의 메세지 모두 가져오기
    public List<MessageResDto> getMessages(String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new IllegalArgumentException("해당 이메일을 지닌 유저가 존재하지 않습니다"));

        // 나에게 보내진 모든 메세지 가져오기
        Long userId = user.getId();
        List<Message> messages = messageRepository.findByUserTo_IdOrderByCreatedDate(userId);

        List<MessageResDto> messageResDtoList = new ArrayList<>();

        for (Message m: messages) {
            messageResDtoList.add(m.toMessageResDto());
        }

        return messageResDtoList;

    }

    // 특정 메세지 삭제
    public void deleteMessage(Long id) {
        Message message = messageRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 메세지를 찾을 수 없습니다"));

        messageRepository.deleteById(id);
    }
}
