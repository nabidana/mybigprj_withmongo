package com.example.demo.Users.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Users.Domain.Userinfo;

public interface UserinfoRepository extends MongoRepository<Userinfo, String>{
    Optional<Userinfo> findByUserId(String userId);
}
