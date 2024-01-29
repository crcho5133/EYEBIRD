package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.PointReqDto;
import com.sixback.eyebird.api.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
public class PointController {
    private final PointService pointService;
    @PatchMapping("/")
    public ResponseEntity<Void> update(@RequestBody PointReqDto pointReqDto, Authentication authentication) {
        String curUserEmail = authentication.getName();
        pointService.update(pointReqDto, curUserEmail);

        return ResponseEntity.ok().build();

    }
}
