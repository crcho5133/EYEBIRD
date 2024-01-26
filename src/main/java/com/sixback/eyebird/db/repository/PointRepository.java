package com.sixback.eyebird.db.repository;

import com.sixback.eyebird.db.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PointRepository extends JpaRepository<Point, Long> {
    Optional<Point> findByUserId(Long userId);

}
