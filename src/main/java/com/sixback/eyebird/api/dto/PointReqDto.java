package com.sixback.eyebird.api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PointReqDto {
    private int classicPt;
    private int itemPt;
}
