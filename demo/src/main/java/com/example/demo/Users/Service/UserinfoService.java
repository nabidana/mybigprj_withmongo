package com.example.demo.Users.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.Users.Domain.Userinfo;

public interface UserinfoService {
    Page<Userinfo> getAllUsers(Pageable pageable);
    void insertUser(Userinfo user);
    void updateUser(String userid, boolean able);
    Page<Userinfo> findUserPage(String userid, Pageable pageable);
    String cleanUser(String userid);
    boolean deleteUser(String id);
    String getUserCart(String userid);
    String addGameToCart(String userid, String gamename);
}
