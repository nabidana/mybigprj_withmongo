package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Domain.TestDomain;
import com.example.demo.Repository.TestRepository;

@Service
public class TestServiceImpl implements TestService{
    
    @Autowired
    private TestRepository testRepository;

    @Override
    public List<TestDomain> getAllItems() {
        return (List<TestDomain>)testRepository.findAll();
    }

    @Override
    public void insertValue(TestDomain val) {
        testRepository.save(val);
    }

    @Override
    public void deleteValue(TestDomain val) {
        testRepository.deleteById(val.getId());
    }
    
}
