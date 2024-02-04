package com.sixback.eyebird.api.dto;

import com.sixback.eyebird.db.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class MessageResDto {
    private int msgType; // 친구 초대 메세지: 0, 쪽지: 1
    private String msgText;
    private boolean ifRead;

    @NotBlank
    private String userFromNickname; // 발신자의 닉네임 //


}
