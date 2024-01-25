package com.sixback.eyebird.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class Room {
    private String roomId;          // 방의 고유 식별자 room_ + roomId 형식으로 key 제작
    private String roomName;        // 방의 제목
    private boolean item;         // 아이템전 여부
    private int maxCapacity;        // 최대 인원수
    private int currentCapacity;    // 현재 인원수
    private int password;           // 방 접근을 위한 비밀번호 (선택적)
    private long ownerId;         // 방장 ID

    protected Room() {

    }


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

    @Builder
    public Room(String roomId, String roomName, int maxCapacity, int currentCapacity, int password, long ownerId, boolean item) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.maxCapacity = maxCapacity;
        this.currentCapacity = currentCapacity;
        this.password = password;
        this.ownerId = ownerId;
        this.item = item;
    }

    public void addCapacity(){
        currentCapacity += 1;
    }
    public void reduceCapacity(){
        currentCapacity -= 1;
    }
}

