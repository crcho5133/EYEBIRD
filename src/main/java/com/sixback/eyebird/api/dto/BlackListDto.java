package com.sixback.eyebird.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BlackListDto {
    private String roomId;
    private String email;

    @Override
    public String toString() {
        return "BlackListDto{" +
                "roomId='" + roomId + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
