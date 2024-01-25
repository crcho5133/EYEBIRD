package com.sixback.eyebird.api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateUserResDto {

    private String email;
    private String message;

}
