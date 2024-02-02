package com.sixback.eyebird.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Point {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private int classicPt;

    @Column(nullable = false)
    private int itemPt;

}
