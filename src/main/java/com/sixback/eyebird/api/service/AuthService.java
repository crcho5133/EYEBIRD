package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.JwtTokenDto;
import com.sixback.eyebird.api.dto.LoginReqDto;
import com.sixback.eyebird.api.dto.LoginResDto;
import com.sixback.eyebird.db.repository.UserRepository;
import com.sixback.eyebird.db.entity.User;
import com.sixback.eyebird.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenUtil jwtTokenUtil;

    @Transactional // 예외 발생 시 롤백
    public LoginResDto login(LoginReqDto loginReqDto) {
        String email = loginReqDto.getEmail();
        String password = loginReqDto.getPassword();

        // DB에서 유저 찾기
        User user = userRepository.findUserByEmail(email).orElseThrow(() ->new IllegalArgumentException("로그인: 해당 이메일을 지닌 유저가 존재하지 않습니다"));

        // 비밀번호 확인
        if (!encoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("로그인: 유저의 비밀번호가 올바르지 않습니다");
        }

        JwtTokenDto jwtTokenDto = jwtTokenUtil.generateToken(loginReqDto);

        return LoginResDto.builder().user(user).jwtTokenDto(jwtTokenDto).build();

    }
}
