package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.RequestRoomDto;
import com.sixback.eyebird.api.dto.RoomDto;
import com.sixback.eyebird.api.service.RoomService;
import com.sixback.eyebird.util.Sha256Convert;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Api(value = "room", tags = {"room"})
@RestController
@NoArgsConstructor
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    RoomService roomService;
    long roomId = 0;

    // 방 리스트
    // item이랑 classic이랑 구분되어야 함
    @ApiOperation(value = "방장이 게임 시작할 때 사용", notes = "<strong>게임시작</strong>을 통해 방 status를 GAME으로 업데이트하고, 시작된 게임의 game_id를 반환한다.")
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
    @DeleteMapping("/{id}")
    public boolean deleteRoom(@PathVariable String id){
        return roomService.deleteRoom(id);
    }

    // 방 들어가기
    // 1, 들어가고자 하는 방 번호를 받으면
    // 2. 입장 가능 여부 체크 후 리턴
    @PostMapping("/enter")
    public String enterRoom(@RequestBody RoomDto room){
        // Issue : TEST용 UserId
        String userEmail = "ssafy.com";
        return roomService.enterRoom(room, userEmail)? room.getRoomId() : "방 들어가기 실패";
    }

}
