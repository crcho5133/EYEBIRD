package com.sixback.eyebird.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class UserFriend  {
    @Id
    @GeneratedValue
    private Long id;

    // TODO ManyToOne
    private Long userFrom;

    // TODO ManyToOne
    private Long userTo;

    // TODO createdAt, updatedAt
    
}
