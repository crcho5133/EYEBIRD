package com.sixback.eyebird.db.repository;

import com.sixback.eyebird.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);
    Boolean existsByEmail(String email);

    Boolean existsByNickname(String nickname);

}