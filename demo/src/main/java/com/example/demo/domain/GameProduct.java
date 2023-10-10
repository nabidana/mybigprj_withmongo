package com.example.demo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("games")
@TypeAlias("Game_Product")
public class GameProduct {
    
    @Id
    private String gamename;
    private String price;
    private String discount;
    private String sumnail;
    private String date;
    private String category;
    private String imagelink;
    private String productCount;
}
