package com.sixback.eyebird.api.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Room {
    private String roomId;        // 방의 고유 식별자
    private String roomName;     // 방의 제목
    private int maxCapacity;  // 최대 인원수
    private int currentCapacity;  // 현재 인원수
    private int password;  // 방 접근을 위한 비밀번호 (선택적)
    private String ownerId; //
    private boolean isItem; // 아이템전 여부

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
                ", isItem=" + isItem +
                '}';
    }

    @Builder
    public Room(String roomId, String roomName, int maxCapacity, int currentCapacity, int password, String ownerId, boolean isItem) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.maxCapacity = maxCapacity;
        this.currentCapacity = currentCapacity;
        this.password = password;
        this.ownerId = ownerId;
        this.isItem = isItem;
    }
}

