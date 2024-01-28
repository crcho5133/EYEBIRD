package com.sixback.eyebird.api.controller;

import com.sixback.eyebird.api.dto.RankDto;
import com.sixback.eyebird.api.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rank")
public class RankController {
    @Autowired
    RankService rankService;

    @GetMapping("/item")
    public List<RankDto> rankItemList(){
        return rankService.listRank(true);
    }
    @GetMapping("/classic")
    public List<RankDto> rankClassicList(){
        return rankService.listRank(true);
    }
}
