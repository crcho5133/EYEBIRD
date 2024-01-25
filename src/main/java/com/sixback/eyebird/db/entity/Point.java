package com.sixback.eyebird.db.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Point extends BaseTime{
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private int classicPt;

    @Column(nullable = false)
    private int itemPt;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
