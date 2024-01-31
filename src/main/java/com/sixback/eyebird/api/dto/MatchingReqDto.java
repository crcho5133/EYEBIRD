package com.sixback.eyebird.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MatchingReqDto {
    // 아이템 전인지 여부
    boolean ifItem;

    // 매칭 요청한 유저의 이메일
    @NotBlank(message="매칭 요청: 매칭 요청한 유저의 이메일은 빈 문자열이 되어선 안 됩니다")
    String email;

}
