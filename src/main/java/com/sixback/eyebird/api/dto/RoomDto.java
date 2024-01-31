package com.sixback.eyebird.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RoomDto {
    private String roomId;          // 방의 고유 식별자 room_ + roomId 형식으로 key 제작
    private String roomName;        // 방의 제목
    private boolean item;           // 아이템전 여부
                                    // Rombok에서 isItem Getter를 만들기 때문에 Redis에 item으로 저장되는 버그가 있어서 Dto를 item으로 변경함.
    private int maxCapacity;        // 최대 인원수
    private int currentCapacity;    // 현재 인원수
    private int password;           // 방 접근을 위한 비밀번호 (선택적)
    private long ownerId;           // 방장 ID

    @Override
    public String toString() {
        return "Room{" +
                "roomId='" + roomId + '\'' +
                ", roomName='" + roomName + '\'' +
                ", maxCapacity=" + maxCapacity +
                ", currentCapacity=" + currentCapacity +
                ", password=" + password +
                ", ownerId='" + ownerId + '\'' +
                ", item=" + item +
                '}';
    }

    public void addCapacity(){
        currentCapacity += 1;
    }
    public void reduceCapacity(){
        currentCapacity -= 1;
    }

    public void setRoomId(String roomId) {this.roomId = roomId;}
}

