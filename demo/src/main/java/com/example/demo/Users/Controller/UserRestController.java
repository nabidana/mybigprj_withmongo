package com.example.demo.Users.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Users.Domain.RequestDTO;
import com.example.demo.Users.Domain.Userinfo;
import com.example.demo.Users.Service.UserinfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserRestController {
    
    @Autowired
    private UserinfoService userinfoService;

    @PutMapping("/signup")
    public String putSignup( @RequestBody RequestDTO requestDTO) {
        StringBuilder resultMsg = new StringBuilder();
        try {
            System.out.println(requestDTO.toString());
            Userinfo user = new Userinfo();
            user.setUserId(requestDTO.getUserId());
            user.setUserPassword(requestDTO.getUserPassword());
            userinfoService.insertUser(user);
            resultMsg.append("OKAY");
        } catch (Exception e) {
            resultMsg.append("FAIL");
        }

        return resultMsg.toString();
    }
}
