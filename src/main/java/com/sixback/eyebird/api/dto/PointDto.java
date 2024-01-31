package com.sixback.eyebird.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
// redis 저장용
// item/classic 중 하나의 포인트만 저장하기 때문에 유저 정보와 point만
public class PointDto {
    //@NotNull(message = "유저 닉네임")
    @Schema(description = "유저 닉네임")
    String nickname;

    //@NotNull(message = "유저 프로필 사진")
    @Schema(description = "유저 프로필 사진")
    int profileImg;

    //@NotNull(message = "유저 점수")
    @Schema(description = "아이템, 클래식 중 요청받은 점수 반환.")
    int point;

    @Override
    public String toString() {
        return "PointDto{" +
                "nickname='" + nickname + '\'' +
                ", profileImg=" + profileImg +
                ", point=" + point +
                '}';
    }

}
