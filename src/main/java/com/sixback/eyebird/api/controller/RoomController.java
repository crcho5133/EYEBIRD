package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.RequestRoomDto;
import com.sixback.eyebird.api.dto.Room;
import com.sixback.eyebird.api.service.RoomService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@NoArgsConstructor
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    RoomService roomService;
    long roomId = 0;

    // 방 리스트
    // item이랑 classic이랑 구분되어야 함
    @GetMapping("/item")
    public List<Room> itemRoomList(){
        return roomService.roomList(true);
    }
    @GetMapping("/classic")
    public List<Room> classicRoomList(){
        return roomService.roomList(false);
    }

    // 방 생성
    @PostMapping()
    //public Map<Integer, String> createRoom(@RequestBody Room room){
    public String createRoom(@RequestBody RequestRoomDto reqRoom){
        // Issue : 토큰은 나중에 새로 주면 쓰기
        System.out.println(reqRoom);

        Room room = new Room(convertToSHA256(reqRoom.getRoomName()), reqRoom.getRoomName(), reqRoom.getMaxCapacity(), 1, reqRoom.getPassword(), 0, reqRoom.isItem());
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
        return room.getRoomId();
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
    public String enterRoom(@RequestBody Room room){
        // Issue : TEST용 UserId
        int userId = 0;

        return roomService.enterRoom(room, userId)? room.getRoomId() : "방 들어가기 실패";
    }

    public String convertToSHA256(String originalString) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedhash = digest.digest(
                    originalString.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder(2 * encodedhash.length);
            for (int i = 0; i < encodedhash.length; i++) {
                String hex = Integer.toHexString(0xff & encodedhash[i]);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error while hashing", e);
        }
    }

}
