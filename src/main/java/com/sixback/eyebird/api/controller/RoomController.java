package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.*;
import com.sixback.eyebird.api.service.RoomService;
import com.sixback.eyebird.uncategorized.OpenViduManager;
import com.sixback.eyebird.util.Sha256Convert;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.openvidu.java.client.*;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@NoArgsConstructor
@RequestMapping("/api/room")
@Tag(name = "room")
@Slf4j
public class RoomController {
    @Autowired
    RoomService roomService;

    @Autowired
    OpenViduManager openViduManager; // openvidu 실행을 위해
    long roomId = 0;

    // 방 리스트
    // item이랑 classic이랑 구분되어야 함
    @Operation(summary = "아이템방 리스트 조회", description = "아이템방 리스트 조회")
    @GetMapping("/item")
    public List<RoomDto> itemRoomList() {
        return roomService.roomList(true);
    }

    @Operation(summary = "클래식방 리스트 조회", description = "클래식방 리스트 조회")
    @GetMapping("/classic")
    public List<RoomDto> classicRoomList() {
        return roomService.roomList(false);
    }

    // 방 생성
    @Operation(summary = "방 생성", description = "현재 방 생성 갯수(35개) 초과 불가, 방 이름 중복 불가")
    @PostMapping()
    public ResponseEntity<CreateRoomResDto> createRoom(@RequestBody RequestRoomDto reqRoom) throws OpenViduJavaClientException, OpenViduHttpException {
        // Issue : 토큰은 나중에 새로 주면 쓰기
        //System.out.println(reqRoom);
        RoomDto room = new RoomDto(Sha256Convert.getInstance().ShaEncoder(reqRoom.getRoomName()), reqRoom.getRoomName(), reqRoom.isItem(), reqRoom.getMaxCapacity(), 1, reqRoom.getPassword(), 0);
        log.info(room.getRoomId());
        int result = roomService.createRoom(room);

        HashMap<Integer, String> message = new HashMap<>();

        if (result == 1) {

            Map<String, Object> openviduParams = new HashMap<String, Object>();
            openviduParams.put("customSessionId", room.getRoomId());

            log.info("roomId: " + room.getRoomId());

            SessionProperties properties = SessionProperties.fromJson(openviduParams).build();
            OpenVidu openvidu = openViduManager.getOpenvidu();
            Session session = openvidu.createSession(properties);

            CreateRoomResDto createRoomResDto = CreateRoomResDto.builder()
                    .sessionId(session.getSessionId())
                    .build();

            log.info("sessionId: " + session.getSessionId());

            return ResponseEntity.status(201).body(createRoomResDto);
        }

        // 방이 만들어져서 저장되었지만 최종적으로 실패해서 방을 삭제해야함
        if(result == 1)
            roomService.deleteRoom(room.getRoomName());

        if(result == 0)        throw new RuntimeException("방 생성: 최대 방 갯수 초과");
        else if(result == -1)        throw new RuntimeException("방 생성: 방 이름 중복");


        throw new RuntimeException("방 생성: 방을 생성하지 못했습니다");
    }

    // 방 삭제
    @Operation(summary = "방 삭제", description = "방 나갈 때 현재 방에 사람 없으면 방 삭제")
    @DeleteMapping("/{roomName}")
    public boolean deleteRoom(@Parameter(description = "방 id = hash(방이름)") @PathVariable String roomName) {
        String id = Sha256Convert.ShaEncoder(roomName);
        return roomService.deleteRoom(id);
    }

    // 방 들어가기
    // 1, 들어가고자 하는 방 번호를 받으면
    // 2. 입장 가능 여부 체크 후 리턴
    @Operation(summary = "방 들어가기", description = "블랙리스트/방 인원수 초과 시 입장 불가")
    @PostMapping("/enter")
    public ResponseEntity<EnterRoomResDto> enterRoom(@RequestBody RoomReqDto roomReq, @RequestBody(required = false) Map<String, Object> params, Authentication authentication)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String curUserEmail = authentication.getName();
        String sessionId = roomReq.getRoomId();
        RoomDto room = new RoomDto();
        room.setRoomId(sessionId);

        int result = roomService.enterRoom(room, curUserEmail);
        if (result == 1) {
            return ResponseEntity.ok(enterOpenVidu(sessionId, params));
        }
        
        String msg = "";
        switch (result){
            case 0:
                msg = "방 입장 : 해당 방 인원 초과";
                break;
            case -1:
                msg = "방 입장 : 해당 방 비밀번호 불일치";
                break;
            case -2:
                msg = "방 입장 : 해당 방에서 추방되었습니다.";
                break;
        }

        throw new RuntimeException(msg);
    }

    // 빈 방에 아무데나 입장 신청 -> 블랙리스트 제외
    @Operation(summary = "빠른 입장", description = "블랙리스트/방 인원수 초과 시 입장 불가")
    @PostMapping("/quick")
    public ResponseEntity<EnterRoomResDto> quickEnterRoom(@RequestBody(required = false) Map<String, Object> params, Authentication authentication)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String curUserEmail = authentication.getName();

        String result = roomService.quickEnterRoom(curUserEmail);
        String sessionId = result;

        System.out.println(sessionId);

        if (result != "fail") {
            return ResponseEntity.ok(enterOpenVidu(sessionId, params));
        }

        throw new RuntimeException("방 입장: 방 입장에 실패했습니다");

    }

    public EnterRoomResDto enterOpenVidu(String sessionId, Map<String, Object> params)throws OpenViduJavaClientException, OpenViduHttpException{
        OpenVidu openvidu = openViduManager.getOpenvidu();
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            throw new RuntimeException("방 입장: sessionId를 지닌 session이 존재하지 않습니다");
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);

        EnterRoomResDto enterRoomResDto = EnterRoomResDto.builder()
                .connectionToken(connection.getToken())
                .build();

        return enterRoomResDto;
    }

}
