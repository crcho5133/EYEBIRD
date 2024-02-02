package com.sixback.eyebird.api.dto;

import com.sixback.eyebird.db.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MessageResDto {
    private int msgType; // 친구 초대 메세지: 0, 쪽지: 1
    private String msgText;
    private Boolean isRead;

    @NotBlank
    private String userFrom; // 발신자의 닉네임 // TODO 발신자의 닉네임만으로 충분한가?


}
