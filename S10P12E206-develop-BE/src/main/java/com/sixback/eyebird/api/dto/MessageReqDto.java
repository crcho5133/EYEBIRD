package com.sixback.eyebird.api.dto;

import lombok.Getter;

@Getter
public class MessageReqDto {
    private Long msgId; // DB에 저장된 메세지의 id
    private int msgType; // 메세지 타입
    private String msgText; // 메세지 내용

    private String userToNickname; // 메세지를 받는 사람의 닉네임. 메세지를 보내는 사람의 닉네임은 로그인 된 유저의 그것이다.

}
