package com.sixback.eyebird.api.service;

import com.sixback.eyebird.db.entity.User;
import com.sixback.eyebird.db.entity.UserFriend;
import com.sixback.eyebird.db.repository.UserFriendRepository;
import com.sixback.eyebird.db.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional
public class UserFriendService {
    @Autowired
    private final UserFriendRepository userFriendRepository;

    @Autowired
    private final UserRepository userRepository;

    public void createFriend(String toNickName, String fromEmail) {
        UserFriend userFriend = new UserFriend();
        userFriend.setUserTo(userRepository.findUserByNickname(toNickName).orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다.")));
        userFriend.setUserFrom(userRepository.findUserByEmail(fromEmail).orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다.")));
        userFriendRepository.save(userFriend);
    }

    // 친구 제거
    public void deleteFriendShip(String toNickName, String fromEmail) {
        User user1 = userRepository.findUserByNickname(toNickName).orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다."));
        // 현재 유저의 정보는 Email로 받아오기 때문에 Email로 검색하게 된다.
        User user2 = userRepository.findUserByEmail(fromEmail).orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다."));

        Optional<UserFriend> friendship = userFriendRepository.findByUserFromUserTo(user1.getId(), user2.getId());
        UserFriend userFriend = friendship.orElseThrow(() -> new RuntimeException("친구 관계를 찾지 못했습니다."));
        userFriendRepository.delete(userFriend);

    }

    // 유저가 가진 아이디로 친구 불러오기
    public List<User> findFriend(String userEmail) {
        long userId = userRepository.findUserByEmail(userEmail).get().getId();
        List<User> friendList = userFriendRepository.findByUserFromOrUserTo(userId);

        return friendList;
    }
}
