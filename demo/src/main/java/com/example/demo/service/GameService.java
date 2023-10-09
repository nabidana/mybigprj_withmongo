package com.example.demo.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.domain.GameProduct;

public interface GameService {
    Page<GameProduct> getAllItems(String gamename, Pageable pageable);
    void insertItem(GameProduct game);
    GameProduct getGameProduct(String gamename);
}
