package com.example.demo.Users.Controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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

    @PostMapping("/useraccount/getAlluser")
    public HashMap<String, Object> getAllUsers(
        @PageableDefault(size = 20, sort = "{makeDate}")Pageable pageable,
        @RequestParam(value = "word", required = false, defaultValue = "")String word
    ){
        //System.out.println(word);
        Page<Userinfo> findUserPage = userinfoService.findUserPage(word, pageable);
        List<Userinfo> userList = findUserPage.getContent();
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("userlist", userList);
        resultMap.put("totalpage", findUserPage.getTotalPages());
        resultMap.put("nowpage", findUserPage.getPageable().getPageNumber());
        return resultMap;
    }

    @PutMapping("/useraccount/ableUser")
    public ResponseEntity<?> ableUser(
        @RequestBody Map<String, String> map
    ){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=UTF-8");
        try {
            String userid = map.get("userid");
            String albe_str = map.get("able");
            boolean torf = true;
            if("disabled".equals(albe_str)){
                torf = false;
            }
            userinfoService.updateUser(userid, torf);
            return new ResponseEntity<>(headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(headers, HttpStatus.BAD_GATEWAY);
        }
    }

    @PutMapping("/useraccount/cleanUser")
    public String cleanUser(
        @RequestBody String userid
    ){
        return userinfoService.cleanUser(userid);
    }

    @DeleteMapping("/useraccount/deleteUser")
    public String deleteUser(
        @RequestBody String userid
    ){
        return String.valueOf(userinfoService.deleteUser(userid));
    }

    @PostMapping("/buy/getUserCart")
    @ResponseBody
    public String getUserCart(
        Principal principal
    ){
        String userid = principal.getName();
        String getmsg = userinfoService.getUserCart(userid);
        if("".equals(getmsg) || getmsg == null){
            return "null";
        }
        return getmsg;
    }

    @PutMapping("/addcart")
    public String addCart(
        @RequestBody Map<String, String> map
    ){
        String userid = map.get("userid");
        String gamename = map.get("gamename");
        //System.out.println("UID : "+userid+"name:"+gamename);
        String resultMsg = userinfoService.addGameToCart(userid, gamename);
        return resultMsg;
    }

    @DeleteMapping("/deletecart/{gamename}")
    public String deleteCart(
        @PathVariable("gamename")String gamename, Principal principal
    ){
        return userinfoService.deleteCart(principal.getName(), gamename);
    }

    @PutMapping("/myitem/add")
    public String addMyItem(
        Principal principal
    ){
        return userinfoService.addItemToUser(principal.getName());
    }

    @PostMapping("/myitem/getall")
    public List<String> getAllItems(
        Principal principal
    ){
        return userinfoService.getMyGameItems(principal.getName());
    }

    @DeleteMapping("/myitem/delete/{gamename}")
    public String deleteMyItems(
        @PathVariable("gamename")String gamename, Principal principal
    ){
        return userinfoService.deleteMyItemGame(principal.getName(), gamename);
    }
}
