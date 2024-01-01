package com.example.demo.Service;

import java.util.List;

import com.example.demo.Domain.TestDomain;

public interface TestService {
    List<TestDomain> getAllItems();
    void insertValue(TestDomain val);
    void deleteValue(TestDomain val);
}
