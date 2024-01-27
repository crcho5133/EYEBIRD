package com.sixback.eyebird.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name="users") // H2 데이터베이스에서는 User라는 테이블을 사용할 수 없으므로, 테이블의 이름을 Users로 변경한다.
@Getter

public class User extends BaseTime { // 생성시간과 수정시간을 다루기 위해, BaseTime을 extend한다
    @Id
    @GeneratedValue // TODO strategy는 어떻게?
    private Long id;

    @Column(length = 50, nullable = false)
    private String email;

    // 해싱된 비밀번호
    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String nickname;


    @Column(nullable = false)
    private int profileImage;

    // PointEntity와 one to one mapping
    @OneToOne(fetch = FetchType.EAGER) // TODO Eager or Lazy?
    @JoinColumn(name="point_id")
    private Point point;

    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted;

    @Builder
    public User(String email, String password, String nickname, int profileImage) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

}