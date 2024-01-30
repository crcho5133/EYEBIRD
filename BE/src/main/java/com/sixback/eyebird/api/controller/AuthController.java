package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.LoginReqDto;
import com.sixback.eyebird.api.dto.LoginResDto;
import com.sixback.eyebird.api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor // 의존성 주입
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResDto> login(@RequestBody @Valid LoginReqDto loginReqDto) {
        LoginResDto loginResDto = authService.login(loginReqDto);
        return ResponseEntity.ok(loginResDto);
    }

    // auth 테스트
    @GetMapping("/auth-test")
    public ResponseEntity<String> authTest() {
        return ResponseEntity.ok("test");
    }

    // exception 테스트
    @GetMapping("/exception-test")
    public ResponseEntity<?> exceptionTest() {
        throw new IllegalArgumentException("exception-test");


    }
    @GetMapping("/qqq")
    public String qqq() {
        return "TEST!!!!~~~";
    }

    @GetMapping("/www")
    public String www() {
        return "WWWW!!!!@@@";
    }
}
