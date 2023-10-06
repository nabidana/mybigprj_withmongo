package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.domain.GameProduct;

public interface GameRepository extends MongoRepository<GameProduct, String>{
    
}
