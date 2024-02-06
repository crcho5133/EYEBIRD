package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.*;
import com.sixback.eyebird.api.service.PointService;
import com.sixback.eyebird.uncategorized.OpenViduManager;
import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@RestController
@RequestMapping("/api/point")
@RequiredArgsConstructor
@Tag(name = "Point")
@Slf4j
public class PointController {
    private final PointService pointService;

    // 아이템전 매칭 요청이 들어온 유저들을 담은 queue
    private final Queue<String> matchingQueueItem = new ConcurrentLinkedQueue<>();
    // 클래식전 매칭 요청이 들어온 유저들을 담은 queue
    private final Queue<String> matchingQueueClassic = new ConcurrentLinkedQueue<>();

    private final SimpMessagingTemplate messagingTemplate;

    // openvidu 실행을 위해
    private final OpenViduManager openViduManager;

    // 랭크 게임 후 현재 유저의 점수를 변동
    @Operation(summary = "포인트 갱신", description = "Front -> Back -> DB")
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

        List<PointDto> test = pointService.getTopPoint(true);
        System.out.println(test);
    return test;
    }

    @GetMapping("/rank/classic")
    @Operation(summary = "클래식 랭크 받아오기", description = "redis에서 classic rank 받아오기")
    public List<PointDto> listTopClassicPoint() {
        return pointService.getTopPoint(false);

    }

    // 랭크 게임의 매칭 요청이 왔을 때
    @MessageMapping("/matching")
    public void matching(MatchingReqDto matchingReqDto) throws OpenViduJavaClientException, OpenViduHttpException {
        String reqUserEmail = matchingReqDto.getEmail();
        boolean isItem = matchingReqDto.isIfItem();
        log.info(matchingReqDto.toString());

        // 아이템전 매칭 요청인 경우
        if (isItem) {
            matchingQueueItem.add(reqUserEmail);

            if (matchingQueueItem.size() >= 2) {
                String firstUserEmail = matchingQueueItem.poll();


                String secondUserEmail = matchingQueueItem.poll();


                //  두 유저에게 openvidu sessionId를 알려준다
                // 길이가 20인 랜덤 문자열 생성
                String randomString = RandomStringUtils.randomAlphanumeric(20);

                // 그 랜덤 문자열로 Openvidu Session 생성
                Map<String, Object> openviduParams = new HashMap<String, Object>();
                openviduParams.put("customSessionId", randomString);

                SessionProperties properties = SessionProperties.fromJson(openviduParams).build();
                OpenVidu openvidu = openViduManager.getOpenvidu();
                Session session = openvidu.createSession(properties);

                // 각 유저에게 openvidu의 sessionId 전달
                messagingTemplate.convertAndSend("/user/match/"  + firstUserEmail, session.getSessionId());
                messagingTemplate.convertAndSend("/user/match/" + secondUserEmail, session.getSessionId());
            }

        }

        // 클래식전 매칭 요청인 경우
        else {
            matchingQueueClassic.add(reqUserEmail);

            if (matchingQueueClassic.size() >= 2) {
                String firstUserEmail = matchingQueueClassic.poll();
                String secondUserEmail = matchingQueueClassic.poll();


                // 두 유저에게 openvidu sessionId를 알려준다
                // 길이가 20인 랜덤 문자열 생성
                String randomString = RandomStringUtils.randomAlphanumeric(20);

                // 그 랜덤 문자열로 Openvidu Session 생성
                Map<String, Object> openviduParams = new HashMap<String, Object>();
                openviduParams.put("customSessionId", randomString);

                SessionProperties properties = SessionProperties.fromJson(openviduParams).build();
                OpenVidu openvidu = openViduManager.getOpenvidu();
                Session session = openvidu.createSession(properties);

                // 각 유저에게 openvidu의 sessionId 전달
                messagingTemplate.convertAndSend("/user/match/"  + firstUserEmail, session.getSessionId());
                messagingTemplate.convertAndSend("/user/match/" + secondUserEmail, session.getSessionId());

            }

        }

    }

    // 매칭 요청 취소
    @MessageMapping("/stomp/matching-cancel")
    public void matchingCancel(MatchingReqDto matchingReqDto) {
        boolean isItem = matchingReqDto.isIfItem();
        String userEmail = matchingReqDto.getEmail();
        log.info(matchingReqDto.toString());
        // 아이템전 매칭 요청 취소인 경우
        if (isItem) {
            matchingQueueItem.remove(userEmail);
        }

        // 클래식전 매칭 요청 취소인 경우
        else {
            matchingQueueClassic.remove(userEmail);
        }
    }

    // 매칭 요청이 성공해서 openvidu의 sessionId를 받은 후, session의 token을 발급해줌
    @PostMapping("/matching")
    public ResponseEntity<MatchingResDto> matchingConnectionToken(@RequestBody MatchingTokenReqDto matchingTokenReqDto, @RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        // openvidu의 sessionId
        String sessionId = matchingTokenReqDto.getSessionId();
        // sessionId로 token 받기
        OpenVidu openvidu = openViduManager.getOpenvidu();
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            throw new RuntimeException("방 입장: sessionId를 지닌 session이 존재하지 않습니다");
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);

        MatchingResDto matchingResDto = MatchingResDto.builder()
                .connectionToken(connection.getToken())
                .build();

        return ResponseEntity.ok(matchingResDto);

    }

    // openvidu sessionId를 받고, token을 발금함
    @PostMapping("/enter")
    public ResponseEntity<MatchingGameResDto> enter(@RequestBody MatchingGameReqDto matchingGameReqDto, @RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        OpenVidu openvidu = openViduManager.getOpenvidu();
        Session session = openvidu.getActiveSession(matchingGameReqDto.getGameId());
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);

        MatchingGameResDto matchingGameResDto = MatchingGameResDto.builder()
                .token(connection.getToken())
                .build();

        return ResponseEntity.ok().body(matchingGameResDto);
    }



}