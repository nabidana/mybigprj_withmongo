package com.example.demo.Users.Repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Users.Domain.Userinfo;

public interface UserinfoRepository extends MongoRepository<Userinfo, String>{
    Optional<Userinfo> findByUserId(String userId);
    Page<Userinfo> findByUserIdLike(String userId, Pageable pageable);
}
