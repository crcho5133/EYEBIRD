package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.PointReqDto;
import com.sixback.eyebird.db.entity.Point;
import com.sixback.eyebird.db.entity.User;
import com.sixback.eyebird.db.repository.PointRepository;
import com.sixback.eyebird.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PointService {
    private final UserRepository userRepository;
    private final PointRepository pointRepository;

    @Transactional
    public void update(PointReqDto pointReqDto, String curUserEmail) {
        User curUser = userRepository.findUserByEmail(curUserEmail).orElseThrow(() -> new IllegalArgumentException("점수 업데이트: 이메일을 지닌 유저가 존재하지 않습니다"));
        Point point = pointRepository.findByUserId(curUser.getId()).orElseThrow(() -> new IllegalArgumentException("점수 업데이트: 유저의 점수 테이블이 존재하지 않습니다"));

        // 점수 업데이트
        point.update(pointReqDto);
        log.info(curUserEmail + "의 점수가 업데이트 되었습니다");
    }

    // 회원 가입 시 가입된 유저의 디폴트 점수를 저장: 아이템전, 클래식전 점수 모두 디폴트 값이 1000이다
    public void add(User signupUser) {
        Point point = Point.builder()
                .user(signupUser)
                .itemPt(1000)
                .classicPt(1000)
                .build();


        pointRepository.save(point);
        log.info(signupUser.getEmail() + "의 기본 점수가 DB에 저장되었습니다");
    }


}
