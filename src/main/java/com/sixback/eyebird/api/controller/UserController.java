package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.*;
import com.sixback.eyebird.api.service.UserService;
import com.sixback.eyebird.db.entity.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor // 의존성 주입
@RequestMapping("/api/user")
@Tag(name = "User")
@Slf4j
public class UserController {

    private final UserService userService;
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<SignupResDto> signup(@RequestBody @Valid SignupReqDto signupReqDto) {
        String email = userService.signup(signupReqDto);
        SignupResDto signupResDto = SignupResDto.builder()
                .email(email)
                .build();
        return ResponseEntity.status(201).body(signupResDto);
    }

    // 회원수정
    @PatchMapping("")
    public ResponseEntity<UpdateUserResDto> update(@RequestBody @Valid UpdateUserReqDto modifyUserDto, Authentication authentication) {
        String email = authentication.getName();
        userService.update(modifyUserDto, email);

        UpdateUserResDto updateUserResDto = UpdateUserResDto.builder().
                email(email)
                .message("회원수정 성공: " + email + "의 개인정보를 수정했습니다")
                .build();

        return ResponseEntity.status(200).body(updateUserResDto);
    }

    // 닉네임 중복확인
    @GetMapping("/check/nickname")
    public ResponseEntity<CheckDuplicateResDto> checkDuplicateNickname(@RequestParam("nickname") String nickname) {
        Boolean existsDuplicateNickname = userService.existsNickname(nickname);
        CheckDuplicateResDto checkDuplicateResDto = CheckDuplicateResDto.builder()
                .check(!existsDuplicateNickname)
                .build();

        return ResponseEntity.status(200).body(checkDuplicateResDto);
    }

    // 이메일 중복확인
    @GetMapping("/check/email")
    public ResponseEntity<CheckDuplicateResDto> checkDuplicateEmail(@RequestParam("email") String email) {
        boolean existsDuplicateEmail = userService.existsEmail(email);
        CheckDuplicateResDto checkDuplicateResDto = CheckDuplicateResDto.builder()
                .check(!existsDuplicateEmail)
                .build();

        return ResponseEntity.status(200).body(checkDuplicateResDto);
    }

    // 비밀번호가 일치하는지 확인
    @PostMapping("/check/password")
    public ResponseEntity<Void> checkPassword(@RequestBody CheckPasswordReqDto checkPasswordReqDto, Authentication authentication) {
        String password = checkPasswordReqDto.getPassword();

        // 현재 로그인 된 유저의 이메일
        String email = authentication.getName();

        boolean matchPassword = userService.matchPassword(password, email);

        if (matchPassword) {
            return ResponseEntity.status(200).build();
        }
        else {
            return ResponseEntity.status(401).build();
        }

    }

    // 유저 삭제
    @DeleteMapping("")
    public ResponseEntity<Void> delete(Authentication authentication) {
        String email = authentication.getName();
        userService.deleteUser(email);
        return ResponseEntity.status(200).build();
    }

    // 유저들을 searchWord로 검색
//    @GetMapping("/search")
//    public ResponseEntity<List<SearchUserResDto>> searchUsers(@RequestParam("searchWord") String searchWord) {
//        List<User> users = userService.searchUsers(searchWord);
//
//        // users의 각 user에대해, searchUserResDt로 변형
//
//    }

}
