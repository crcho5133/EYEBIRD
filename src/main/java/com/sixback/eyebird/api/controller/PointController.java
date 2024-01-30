package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.PointDto;
import com.sixback.eyebird.api.service.PointService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/point")
@Tag(name = "Point")
public class PointController {
    @Autowired
    PointService rankService;


    //받아오기
    @GetMapping("/rank/item")
    @Operation(summary = "아이템 랭크 받아오기", description = "redis에서 item rank 받아오기")
    public List<PointDto> listTopItemPoint(){
        return rankService.getTopPoint(true);
    }
    @GetMapping("/rank/classic")
    @Operation(summary = "클래식 랭크 받아오기", description = "redis에서 classic rank 받아오기")
    public List<PointDto> listTopClassicPoint(){
        return rankService.getTopPoint(false);
    }
}
