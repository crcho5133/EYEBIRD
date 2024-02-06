package com.sixback.eyebird.db.repository;

import com.sixback.eyebird.db.entity.GameResult;
import com.sixback.eyebird.db.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByUserTo_IdOrderByCreatedDate(Long id);
   Optional<Message> findByUserFrom_IdAndUserTo_IdAndMsgType(Long fromId, Long toId, int msgType);
}
