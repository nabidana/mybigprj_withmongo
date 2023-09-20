package com.example.demo.Users.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.Users.Domain.Userinfo;

public interface UserinfoService {
    Page<Userinfo> getAllUsers(Pageable pageable);
    void insertUser(Userinfo user);
}
