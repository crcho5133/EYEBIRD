package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.service.UserFriendService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@NoArgsConstructor
@RequestMapping("/api/friend")
@Tag(name = "Friend")
public class UserFriendController {
    @Autowired
    private UserFriendService userFriendService;

    // 친구 생성
    @PostMapping()
    public void createFriendShip(@RequestBody Map<String, String> reqFriend, Authentication authentication){
        String curUserEmail = authentication.getName();
        String userTo = reqFriend.get("userTo");
        userFriendService.createFriend(userTo, curUserEmail);
    }
    
    // 친구 제거
    public void deleteFriendShip(@RequestBody Map<String, String> reqFriend, Authentication authentication){
        String curUserEmail = authentication.getName();
        String userTo = reqFriend.get("userTo");
        userFriendService.deleteFriendShip(userTo, curUserEmail);
    }
    
    // 유저가 가진 아이디로 친구 불러오기
    public void findFriend(Authentication authentication){
        String curUserEmail = authentication.getName();

        userFriendService.findFriend(curUserEmail);
    }
}
