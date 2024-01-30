package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.PointDto;
import com.sixback.eyebird.api.service.PointService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sixback.eyebird.api.dto.PointReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
@Tag(name = "Point")
public class PointController {
    private final PointService pointService;

    @PatchMapping("")
    public ResponseEntity<Void> update(@RequestBody PointReqDto pointReqDto, Authentication authentication) {
        String curUserEmail = authentication.getName();
        pointService.update(pointReqDto, curUserEmail);

        return ResponseEntity.ok().build();

    }


    //받아오기
    @GetMapping("/rank/item")
    @Operation(summary = "아이템 랭크 받아오기", description = "redis에서 item rank 받아오기")
    public List<PointDto> listTopItemPoint() {
        return pointService.getTopPoint(true);
    }

    @GetMapping("/rank/classic")
    @Operation(summary = "클래식 랭크 받아오기", description = "redis에서 classic rank 받아오기")
    public List<PointDto> listTopClassicPoint() {
        return pointService.getTopPoint(false);

    }
}