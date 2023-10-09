package com.example.demo.Users.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        user.setEnabled(false);
        user.setUserRole("USER");
        Date now = new Date();
        SimpleDateFormat formating = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        String now_str = formating.format(now);
        user.setMakeDate(now_str);
        userinfoRepository.save(user);
    }

    @Override
    public void updateUser(String userid, boolean able) {
        Userinfo user = userinfoRepository.findByUserId(userid).get();
        user.setEnabled(able);
        userinfoRepository.save(user);
    }

    @Override
    public Page<Userinfo> findUserPage(String userid, Pageable pageable) {
        return userinfoRepository.findByUserIdLike(userid, pageable);
    }

    @Override
    public String cleanUser(String userid) {
        StringBuilder answer = new StringBuilder();
        try {
            Userinfo user = userinfoRepository.findByUserId(userid).get();
            if("".equals(user.getUserId()) || user.getUserId() == null){
                answer.append("error");
            }else{
                String cleanPassWord = "123456";
                user.setUserPassword(cleanPassWord);
                userinfoRepository.save(user);
                answer.append("okay");
            }
        } catch (Exception e) {
            answer.append("error");
        }
        return answer.toString();
    }

    @Override
    public boolean deleteUser(String id) {
        boolean resultbol = false;
        try {
            Userinfo user = userinfoRepository.findByUserId(id).get();
            if( !"".equals(user.getUserId()) && user.getUserId() != null){
                userinfoRepository.delete(user);
                resultbol = true;
            }
        } catch (Exception e) {
            
        }
        return resultbol;
    }

    @Override
    public String getUserCart(String userid) {
        try {
            Userinfo user = userinfoRepository.findByUserId(userid).get();
            String cart_str = user.getUsercart();
            if("".equals(cart_str) || cart_str == null){
                return "";
            }else{
                return cart_str;
            }
            
        } catch (Exception e) {
            return "";
        }
    }

    @Override
    public String addGameToCart(String userid, String gamename) {
        try {
            Userinfo user = userinfoRepository.findByUserId(userid).get();
            System.out.println(user.toString());
            StringBuilder sb = new StringBuilder();
            String cart_str = user.getUsercart();
            if ( cart_str != null ){
                if( !"".equals(cart_str)){
                    String[] cart_list = cart_str.split("\\|\\|");
                    for(int i = 0 ; i < cart_list.length; i++){
                        if( cart_list[i].equals(gamename)){
                            return "already";
                        }
                    }
                    sb.append(cart_str);
                }
            }
            sb.append(gamename).append("||");
            user.setUsercart(sb.toString());
            userinfoRepository.save(user);
        } catch (Exception e) {
            System.out.println(e.toString() );
            return "error";
        }
        return "okay";
    }
    
}
