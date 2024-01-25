package com.sixback.eyebird.api.dto;

import com.sixback.eyebird.db.entity.Point;
import com.sixback.eyebird.db.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class LoginResDto {
    @Email
    private String email;
    @NotBlank
    private String nickname;
    private int profileImage;
    private int classicPt;
    private int itemPt;
    private int winNum;
    private int loseNum;
    private List<MessageResDto> messages;
    @NotBlank
    private String accessToken;
    @NotBlank
    private String refreshToken;

    @Builder
    public LoginResDto(User user, JwtTokenDto jwtTokenDto) {
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImage = user.getProfileImage();

//         TODO pointEntity도 정의해야
//        Point point = user.getPoint();
//        this.classicPt = point.getClassicPt();
//        this.itemPt = point.getItemPt();

        // TODO winNum, loseNum은?

        // TODO messages는?

        this.accessToken = jwtTokenDto.getAccessToken();
        this.refreshToken = jwtTokenDto.getRefreshToken();

    }


}
