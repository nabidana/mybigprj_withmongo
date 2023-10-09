package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.domain.GameProduct;
import com.example.demo.repository.GameRepository;

@Service
public class GameServiceImpl implements GameService{

    @Autowired
    private GameRepository sqlRepository;

    @Override
    public Page<GameProduct> getAllItems(String gamename, Pageable pageable) {
        return sqlRepository.findByGamenameLike(gamename, pageable);
    }

    @Override
    public void insertItem(GameProduct game) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String date = format.format(now);
        game.setDate(date);
        sqlRepository.save(game);
    }

    @Override
    public GameProduct getGameProduct(String gamename) {
        return sqlRepository.findByGamename(gamename);
    }

}
