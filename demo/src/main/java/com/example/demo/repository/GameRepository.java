package com.example.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.domain.GameProduct;

public interface GameRepository extends MongoRepository<GameProduct, String>{
    Page<GameProduct> findByGamenameLike(String gamename, Pageable pageable);
    GameProduct findByGamename(String gamenae);
}
