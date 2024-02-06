package com.sixback.eyebird.db.repository;

import com.sixback.eyebird.db.entity.GameResult;
import com.sixback.eyebird.db.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByUserTo_IdOrderByCreatedDate(Long id);
}
