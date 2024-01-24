package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.Room;
import com.sixback.eyebird.api.service.RoomService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@NoArgsConstructor
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    RoomService roomService;

    // 방 리스트
    @GetMapping()
    public List<Room> mapList(){
        return roomService.roomList();
    }

    // 방 생성
    @PostMapping()
    public Map<Integer, String> createRoom(@RequestBody Room room){
        System.out.println(room);
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
        return message;
    }

    // 방 삭제
    @DeleteMapping("/{id}")
    public boolean deleteRoom(@PathVariable String id){

        return roomService.deleteRoom(id);
    }

    // 방 들어가기
    // 1, 들어가고자 하는 방 번호를 받으면
    // 2. 입장 가능 여부 체크 후 리턴

}
