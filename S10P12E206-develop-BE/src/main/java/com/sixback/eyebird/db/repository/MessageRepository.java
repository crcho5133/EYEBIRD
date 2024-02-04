package com.sixback.eyebird.db.repository;

import com.sixback.eyebird.db.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
