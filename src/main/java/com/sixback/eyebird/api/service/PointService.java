package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.PointDto;
import com.sixback.eyebird.db.entity.Point;
import com.sixback.eyebird.db.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PointService {
    @Autowired
    RedisTemplate<String, Object> redisTemplate; // 사용할 때 형변환 필요
    @Autowired
    PointRepository pointRepository;


    // 상위 유저 리스트 Redis -> Front
    public List<PointDto> getTopPoint(boolean item){
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(PointDto.class));
        List<PointDto> points = new ArrayList<>();
        String pattern = "classicRank";

        if(item == true){
            pattern = "itemRank";
        }
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match(pattern).build());

        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            PointDto point = new PointDto();
            if (redisTemplate.opsForValue().get(key) != null)
                point = (PointDto) redisTemplate.opsForValue().get(key);

            points.add(point);
        }

        return points;
    }

    // 갱신을 위한 스케쥴 DB -> Redis
    // 30분마다 업데이트
    @Scheduled(fixedRate = 1800000)
    public void updateRanking(){
        System.out.println("스케쥴 실행");
        List<Point> itemRank = pointRepository.findTop25ByOrderByItemPtDesc(PageRequest.of(0,10));
        List<Point> classicRank = pointRepository.findTop25ByOrderByClassicPtDesc(PageRequest.of(0,10));

        if(itemRank.size() > 0) {
            System.out.println("아이템 랭크 있음");
            ArrayList<PointDto> itemRankList = new ArrayList<>();
            for(int i = 0; i<itemRank.size(); i++){
                PointDto itemPoint = new PointDto(itemRank.get(i).getUser().getNickname(),itemRank.get(i).getUser().getProfileImage(), itemRank.get(i).getItemPt());
                itemRankList.add(itemPoint);
            }

            redisTemplate.opsForValue().set("itemRank", itemRankList);
        }


        if(classicRank.size() > 0) {
            System.out.println("클래식 랭크 있음");
            ArrayList<PointDto> classicRankList = new ArrayList<>();
            for(int i = 0; i<itemRank.size(); i++){
                PointDto classicPoint = new PointDto(classicRank.get(i).getUser().getNickname(),classicRank.get(i).getUser().getProfileImage(), classicRank.get(i).getItemPt());
                classicRankList.add(classicPoint);
            }
            redisTemplate.opsForValue().set("classicRank", classicRankList);
            System.out.println(classicRankList);
        }
    }
}
