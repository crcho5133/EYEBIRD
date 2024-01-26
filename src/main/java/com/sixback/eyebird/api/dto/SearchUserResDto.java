package com.sixback.eyebird.api.dto;

import lombok.Builder;

@Builder
public class SearchUsersResDto {
    private String email;
    private String nickname;
    private int profileImage;
    private int classicPt;
    private int itemPt;
    private int winNum;
    private int loseNum;
}
