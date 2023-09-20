package com.example.demo.Users.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Users.Domain.Userinfo;
import com.example.demo.Users.Repository.UserinfoRepository;

@Service
public class UserinfoServiceImpl implements UserinfoService{

    @Autowired
    private UserinfoRepository userinfoRepository;

    @Override
    public Page<Userinfo> getAllUsers(Pageable pageable) {
        return userinfoRepository.findAll(pageable);
    }

    @Override
    public void insertUser(Userinfo user) {
        user.setEnbaled(false);
        user.setUserRole("USER");
        userinfoRepository.save(user);
    }
    
}
