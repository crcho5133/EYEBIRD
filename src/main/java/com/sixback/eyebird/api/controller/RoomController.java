package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.CreateRoomResDto;
import com.sixback.eyebird.api.dto.EnterRoomResDto;
import com.sixback.eyebird.api.dto.RequestRoomDto;
import com.sixback.eyebird.api.dto.RoomDto;
import com.sixback.eyebird.api.service.RoomService;
import com.sixback.eyebird.uncategorized.OpenViduManager;
import com.sixback.eyebird.util.Sha256Convert;
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
@Slf4j
public class RoomController {
    @Autowired
    RoomService roomService;

    @Autowired
    OpenViduManager openViduManager; // openvidu 실행을 위해
    long roomId = 0;

    // 방 리스트
    // item이랑 classic이랑 구분되어야 함
    @GetMapping("/item")
    public List<RoomDto> itemRoomList(){
        return roomService.roomList(true);
    }
    @GetMapping("/classic")
    public List<RoomDto> classicRoomList(){
        return roomService.roomList(false);
    }

    // 방 생성
    @PostMapping()
    //public Map<Integer, String> createRoom(@RequestBody Room room){
    public ResponseEntity<CreateRoomResDto> createRoom(@RequestBody RequestRoomDto reqRoom) throws OpenViduJavaClientException, OpenViduHttpException {
        // Issue : 토큰은 나중에 새로 주면 쓰기
        //System.out.println(reqRoom);
        RoomDto room = new RoomDto(Sha256Convert.getInstance().ShaEncoder(reqRoom.getRoomName()), reqRoom.getRoomName(), reqRoom.isItem(), reqRoom.getMaxCapacity(), 1, reqRoom.getPassword(), 0);
        log.info(room.getRoomId());
        int result = roomService.createRoom(room);

        HashMap<Integer, String> message = new HashMap<>();

        log.info("방 생성 result: " + result);

        switch (result){
            case 1:
                message.put(result, "정상적으로 방이 생성됨");
                break;
            case 0:
                message.put(result, "방 최대 개수 초과");

                break;
            case -1 :
                message.put(result, "중복된 방");
                break;
        }



        if (result == 1) {

            Map<String, Object> openviduParams = new HashMap<String, Object>() ;
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

        throw new RuntimeException("방 생성: 방을 생성하지 못했습니다");


    }

    // 방 삭제
    @DeleteMapping("/{id}")
    public boolean deleteRoom(@PathVariable String id){
        return roomService.deleteRoom(id);
    }

    // 방 들어가기
    // 1, 들어가고자 하는 방 번호를 받으면
    // 2. 입장 가능 여부 체크 후 리턴
    @PostMapping("/enter")
    public ResponseEntity<EnterRoomResDto> enterRoom(@RequestBody RoomDto room, @RequestBody(required = false) Map<String, Object> params, Authentication authentication)
            throws OpenViduJavaClientException, OpenViduHttpException
    {
        String curUserEmail = authentication.getName();
        String sessionId = room.getRoomId();

        if (roomService.enterRoom(room, curUserEmail)) {
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

            return ResponseEntity.ok(enterRoomResDto);
        }

        throw new RuntimeException("방 입장: 방 입장에 실패했습니다");

    }

}
