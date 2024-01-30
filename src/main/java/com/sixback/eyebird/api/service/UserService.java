package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.UpdateUserReqDto;
import com.sixback.eyebird.api.dto.SignupReqDto;
import com.sixback.eyebird.db.repository.UserRepository;
import com.sixback.eyebird.db.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final PointService pointService;

    // 유저 회원가입
    public String signup(SignupReqDto signupReqDto) {
        String email = signupReqDto.getEmail();

        // 주어진 email을 지닌 유저가 DB에 있는지 확인
        Boolean existsEmail = userRepository.existsByEmail(email);

        // 주어진 email을 지닌 유저가 DB에 이미 있는 경우
        if (existsEmail) {
            throw new IllegalArgumentException("해당 이메일을 지닌 유저가 이미 있습니다");
        }

        // 주어진 nickname을 지닌 유저가 DB에 있는지 확인
        String nickname = signupReqDto.getNickname();

        Boolean existsNickname = userRepository.existsByNickname(nickname);

        // 주어진 nickname을 지닌 유저가 DB에 이미 있는 경우
        if (existsNickname) {
            throw new IllegalArgumentException("해당 닉네임을 지닌 유저가 이미 있습니다");
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

        // 새 유저의 디폴트 점수를 DB에 저장
        pointService.add(user);

        // 새 유저의 이메일을 return
        return savedUser.getEmail();
    }


    public void update(UpdateUserReqDto modifyUserDto, String email) {
        // 현재 로그인된 유저를 DB에서 찾는다
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new IllegalArgumentException("회원수정: 유저가 인증되지 않았습니다"));

        String currentPassword = modifyUserDto.getCurrentPassword();
        String newPassword = modifyUserDto.getNewPassword();
        String newNickname = modifyUserDto.getNewNickname();
        int newProfileImage = modifyUserDto.getNewProfileImage();

        // 현재 비밀번호의 해싱된 결과가 DB에 저장된 것과 같은지 확인

        if (!encoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("회원수정: 인증된 유저의 비밀번호가 입력된 비밀번호와 일치하지 않습니다");
        }

        String newHashedPassword = encoder.encode(newPassword);

        user.updateUser(newHashedPassword, newNickname, newProfileImage);
        log.info("회원수정 성공: email이 " + user.getEmail() + "인 유저를 수정함");
    }

    public boolean existsNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public boolean existsEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean matchPassword(String password, String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new IllegalArgumentException("비밀번호 확인: 해당 이메일을 지닌 유저가 존재하지 않는다"));

        return encoder.matches(password, user.getPassword());
    }

    public void deleteUser(String email) {
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new IllegalArgumentException("유저 삭제: 삭제할 유저가 존재하지 않는다"));
        user.deleteUser();

        log.info("유저 삭제 성공");
    }

    public List<User> searchUsers(String searchWord) {
        List<User> users = userRepository.findByNicknameContaining(searchWord);

        // TODO 각 user의 승 / 패 개수를 센다
        return users;
    }



}
