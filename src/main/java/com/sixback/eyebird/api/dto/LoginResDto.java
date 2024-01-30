package com.sixback.eyebird.api.dto;

import com.sixback.eyebird.db.entity.GameResult;
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

    @NotBlank
    private String accessToken;
    @NotBlank
    private String refreshToken;

    @Builder
    public LoginResDto(User user, JwtTokenDto jwtTokenDto) {
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.profileImage = user.getProfileImage();

        Point point = user.getPoint();
        this.classicPt = point.getClassicPt();
        this.itemPt = point.getItemPt();

        List<GameResult> winGameResults = user.getWinGameResults();
        List<GameResult> loseGameResults = user.getLoseGameResults();

        this.winNum = winGameResults.size();
        this.loseNum = loseGameResults.size();

        this.accessToken = jwtTokenDto.getAccessToken();
        this.refreshToken = jwtTokenDto.getRefreshToken();

    }


}
