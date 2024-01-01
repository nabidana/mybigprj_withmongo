package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Domain.TestDomain;

public interface TestRepository extends MongoRepository<TestDomain, String>{
    
}
