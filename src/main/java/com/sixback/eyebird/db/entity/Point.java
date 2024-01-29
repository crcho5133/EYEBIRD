package com.sixback.eyebird.db.entity;

import com.sixback.eyebird.api.dto.PointReqDto;
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

    public void update(PointReqDto pointReqDto) {
        this.classicPt += pointReqDto.getClassicPt();
        this.itemPt += pointReqDto.getItemPt();
    }
}
