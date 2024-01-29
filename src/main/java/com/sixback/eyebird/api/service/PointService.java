package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.PointReqDto;
import com.sixback.eyebird.db.entity.Point;
import com.sixback.eyebird.db.entity.User;
import com.sixback.eyebird.db.repository.PointRepository;
import com.sixback.eyebird.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PointService {
    private final UserRepository userRepository;
    private final PointRepository pointRepository;

    @Transactional
    public void update(PointReqDto pointReqDto, String curUserEmail) {
        User curUser = userRepository.findUserByEmail(curUserEmail).orElseThrow(() -> new IllegalArgumentException("점수 업데이트: 이메일을 지닌 유저가 존재하지 않습니다"));
        Point point = pointRepository.findByUserId(curUser.getId()).orElseThrow(() -> new IllegalArgumentException("점수 업데이트: 유저의 점수 테이블이 존재하지 않습니다"));

        // 점수 업데이트
        point.update(pointReqDto);

    }
}
