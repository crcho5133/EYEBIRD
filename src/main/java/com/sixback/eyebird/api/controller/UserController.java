package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.SignupReqDto;
import com.sixback.eyebird.api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor // 의존성 주입
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupReqDto signupReqDto) {
        Long userId = userService.signup(signupReqDto);
        if (userId == -1L) { // 중복으로 유저 생성 실패
            // TODO 에러 발생으로 수정
            return ResponseEntity.status(422).build();
        }
        return ResponseEntity.status(201).body(userId);
    }
}
