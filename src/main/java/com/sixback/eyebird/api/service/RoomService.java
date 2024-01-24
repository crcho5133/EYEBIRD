package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    RedisTemplate<String, Room> redisTemplate; // JSON 형태로 저장 가능

    // 방 만들기
    /**
     * Create Map
     * 1 : 정상적으로 방이 생성됨
     * 0 : 방 최대 개수 초과
     * -1 : id or 방 이름 중복됨
     */
    public int createRoom(Room room) {
        //찾아서 만들수있는지 체크해야함.
        //못민드는 경우 1 : 최대 방 수 초과
        long count = 0;
        String pattern = "room*";

        List<Room> rooms = new ArrayList<>();
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match(pattern).build());
        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            Room existsRoom = redisTemplate.opsForValue().get(key);
            rooms.add(existsRoom);
            count++;
        }
        if (count > 35) return 0;

        //못만드는 경우2 : 방 이름 중복
        for (Room check : rooms) {
            if (check.getRoomName().equals(room.getRoomName()) || check.getRoomId().equals(room.getRoomId())) {
                return -1;
            }
        }

        // 방 생성 가능 : 방 저장하고 true 리턴
        redisTemplate.opsForValue().set("room_" + room.getRoomId(), room);
        System.out.println("list : " + roomList());
        return 1;
    }

    // 룸 찾기
    public Room findRoom(String id) {
        return redisTemplate.opsForValue().get(id);
    }

    // Redis에서 room으로 시작하는 key값을 검색합니다.
    // RoomId 받아오기 때문에 String
    public List<Room> roomList() {
        /* // -> 이 방법은 redis에 저장된 모든 객체에서 room을 검색하기 때문에 데이터가 많을수록 부하가 걸릴 수 있다.
        // Redis에서 room으로 시작하는 key값을 검색.
        Set<String> keys = redisRoomTemplate.keys("room*");
        // 검색된 key값을 리스트로 변환.
        List<String> keyList = new ArrayList<>(keys);
        return keyList;
        */

        List<Room> rooms = new ArrayList<>();
        String pattern = "room*";

        // Scan 명령어 사용해서 검색 : 데이터베이스 크기에 상관없이 일정한 성능을 유지
        // 일치하는 키에 대해 get 연산을 수행해서 각 키가 가진 room 객체를 가져옴
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match(pattern).build());

        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            Room room = redisTemplate.opsForValue().get(key);
            rooms.add(room);
        }
        return rooms;
    }


    //방 삭제
    public boolean deleteRoom(String key) {
        redisTemplate.delete("room_" + key);
        System.out.println("list : " + roomList());

        return true;
    }

    public String makeHash(String key) {
        return key;
    }
}
