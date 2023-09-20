package com.example.demo.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.GameProduct;
import com.example.demo.service.GameService;

@RestController
public class GameRestController {
    
    @Autowired
    private GameService gameService;

    @GetMapping("/getGames")
    public ResponseEntity<?> getGameList(
        @PageableDefault(size = 9, sort = "{_id:1}")Pageable pageable
    ) throws Exception{
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=UTF-8");
        HashMap<String, Object> map = new HashMap<>();
        Page<GameProduct> resutList = gameService.getAllItems(pageable);
        map.put("games", resutList);
        map.put("totalpage", resutList.getTotalPages());
        map.put("nowpage", resutList.getPageable().getPageNumber());
        return new ResponseEntity<HashMap<String, Object>>(map, headers, HttpStatus.OK);
    }

    @PutMapping("inputGame")
    public String insertGame(GameProduct gameProduct) {
        //System.out.println(gameProduct.toString());
        StringBuilder resultMsg = new StringBuilder();
        try {
            gameService.insertItem(gameProduct);
            resultMsg.append("OKAY");
        } catch (Exception e) {
            resultMsg.append("FAIL");
        }
        return resultMsg.toString();
    }
}
