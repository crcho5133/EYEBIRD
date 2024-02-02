package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.LoginResDto;
import com.sixback.eyebird.api.dto.SignupReqDto;
import com.sixback.eyebird.api.repository.UserRepository;
import com.sixback.eyebird.db.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    // 유저 회원가입
    public Long signup(@RequestBody SignupReqDto signupReqDto) {
        String email = signupReqDto.getEmail();

        // 주어진 email을 지닌 유저가 DB에 있는지 확인
        Boolean exists = userRepository.existsByEmail(email);

        // 주어진 email을 지닌 유저가 DB에 이미 있는 경우
        if (exists) {
            return -1L;
        }

        // 새 유저를 DB에 저장
            User user = User.builder()
                    .email(signupReqDto.getEmail())
                    .nickname(signupReqDto.getNickname())
                    .profileImage(signupReqDto.getProfileImage())
                    .password(encoder.encode(signupReqDto.getPassword()))
                    .build();

            User savedUser = userRepository.save(user);
            log.info("회원생성: 회원 id가" + " " + savedUser.getId() + "인 유저가 생성");
            // 새 유저의 id를 return
            return savedUser.getId();
    }

    // TODO
//    public Long modify(@RequestBody )



}
