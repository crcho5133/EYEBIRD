package com.sixback.eyebird.api.service;

import com.sixback.eyebird.api.dto.RankDto;
import com.sixback.eyebird.api.dto.RoomDto;
import com.sixback.eyebird.db.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Service
public class RankService {
    @Autowired
    RedisTemplate<String, Object> redisTemplate; // JSON 형태로 저장 가능
    @Autowired
    PointRepository pointRepository;

    public List<RankDto> listRank(boolean item){
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(RankDto.class));
        List<RankDto> points = new ArrayList<>();
        String pattern = "";

        if(item == true){
            pattern = "item";
        }
        else{
            pattern = "classic";
        }

        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match(pattern).build());

        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            RankDto point = new RankDto();
            if (redisTemplate.opsForValue().get(key) != null)
                point = (RankDto) redisTemplate.opsForValue().get(key);

            // 아이템전 여부 확인하고 추가
            if (item)
                points.add(point);
        }

        return points;
    }

    // 갱신을 위한 스케쥴
    @Scheduled(fixedRate = 1800000)
    public void updateRanking(){
        System.out.println("스케쥴 실행");
    }
}
