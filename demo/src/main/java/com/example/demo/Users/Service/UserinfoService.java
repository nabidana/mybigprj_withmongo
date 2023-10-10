package com.example.demo.Users.Service;

import java.util.List;
import java.util.Map;

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
    String deleteCart(String userid, String gamename);
    String addItemToUser(String userid);
    List<String> getMyGameItems(String userid);
    String deleteMyItemGame(String userid, String gamename);
    Map<String, String> findmodifyUser(String userid);
    String changePassword(String userid, String pwd);
    String myCartNumber(String userid) throws Exception;
}
