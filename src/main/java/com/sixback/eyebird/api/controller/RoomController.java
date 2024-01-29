package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.RequestRoomDto;
import com.sixback.eyebird.api.dto.RoomDto;
import com.sixback.eyebird.api.service.RoomService;
import com.sixback.eyebird.util.Sha256Convert;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@NoArgsConstructor
@RequestMapping("/api/room")
@Tag(name = "room")
public class RoomController {
    @Autowired
    RoomService roomService;
    long roomId = 0;

    // 방 리스트
    // item이랑 classic이랑 구분되어야 함
    @Operation(summary = "아이템방 리스트 조회", description = "아이템방 리스트 조회")
    @GetMapping("/item")
    public List<RoomDto> itemRoomList(){
        return roomService.roomList(true);
    }

    @Operation(summary = "클래식방 리스트 조회", description = "클래식방 리스트 조회")
    @GetMapping("/classic")
    public List<RoomDto> classicRoomList(){
        return roomService.roomList(false);
    }

    // 방 생성
    @Operation(summary = "방 생성", description = "현재 방 생성 갯수(35개) 초과 불가, 방 이름 중복 불가")
    @PostMapping()
    //public Map<Integer, String> createRoom(@RequestBody Room room){
    public String createRoom(@RequestBody RequestRoomDto reqRoom){
        // Issue : 토큰은 나중에 새로 주면 쓰기
        //System.out.println(reqRoom);

        RoomDto room = new RoomDto(Sha256Convert.getInstance().ShaEncoder(reqRoom.getRoomName()), reqRoom.getRoomName(), reqRoom.isItem(), reqRoom.getMaxCapacity(), 1, reqRoom.getPassword(), 0);
        int result = roomService.createRoom(room);

        HashMap<Integer, String> message = new HashMap<>();

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
        return result==1?room.getRoomId():"fail";
    }

    // 방 삭제
    @Operation(summary = "방 삭제", description = "방 나갈 때 현재 방에 사람 없으면 방 삭제")
    @DeleteMapping("/{id}")
    public boolean deleteRoom(@Parameter(description = "방 id = session id") @PathVariable String id){
        return roomService.deleteRoom(id);
    }

    // 방 들어가기
    // 1, 들어가고자 하는 방 번호를 받으면
    // 2. 입장 가능 여부 체크 후 리턴
    @Operation(summary = "방 들어가기", description = "블랙리스트/방 인원수 초과 시 입장 불가")
    @PostMapping("/enter")
    public String enterRoom(@RequestBody RoomDto room){
        // Issue : TEST용 UserId
        String userEmail = "ssafy.com";
        return roomService.enterRoom(room, userEmail)? room.getRoomId() : "방 들어가기 실패";
    }

}
