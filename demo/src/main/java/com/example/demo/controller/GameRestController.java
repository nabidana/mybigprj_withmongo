package com.example.demo.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.GameProduct;
import com.example.demo.service.GameService;

@RestController
public class GameRestController {
    
    @Autowired
    private GameService gameService;

    @GetMapping("/getGames")
    public ResponseEntity<?> getGameList(
        @PageableDefault(size = 9, sort = "{_id:1}")Pageable pageable,
        @RequestParam(value = "word", required = false, defaultValue = "")String word
    ) throws Exception{
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=UTF-8");
        HashMap<String, Object> map = new HashMap<>();
        Page<GameProduct> resutList = gameService.getAllItems(word, pageable);
        map.put("games", resutList);
        map.put("totalpage", resutList.getTotalPages());
        map.put("nowpage", resutList.getPageable().getPageNumber());
        return new ResponseEntity<HashMap<String, Object>>(map, headers, HttpStatus.OK);
    }

    @PutMapping("/inputGame")
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

    @PostMapping("/getGameItem/{gamename}")
    public GameProduct getGameItem(
        @PathVariable("gamename")String gamename
    ){
        return gameService.getGameProduct(gamename);
    }

    @PutMapping("/modifyGameIts")
    public String modifyGames(
        @RequestBody Map<String, String> map
    ){
        try {
            String gamename = map.get("gamename");
            String price = map.get("price");
            String discount = map.get("discount");
            String sumnail = map.get("sumnail");
            String category = map.get("category");
            String imagelink = map.get("imagelink");
            String productCount = map.get("productCount");
            return gameService.modifytoGame(gamename, price, discount, sumnail, category, imagelink, productCount);
        } catch (Exception e) {
            return "error";
        }
    }

}
