package com.example.demo.Users.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.Users.Domain.Userinfo;
import com.example.demo.Users.Repository.UserinfoRepository;
import com.example.demo.repository.GameRepository;
import com.example.demo.service.GameService;

@Service
public class UserinfoServiceImpl implements UserinfoService{

    @Autowired
    private UserinfoRepository userinfoRepository;
    @Autowired
    private GameService gameService;

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
            //System.out.println(user.toString());
            StringBuilder sb = new StringBuilder();
            String cart_str = user.getUsercart();
            if ( cart_str != null ){
                if( !"".equals(cart_str)){
                    String[] cart_list = cart_str.split("\\|\\|");
                    if(cart_list.length == 11){
                        return "lenth";
                    }
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
            //System.out.println(e.toString() );
            return "error";
        }
        return "okay";
    }

    @Override
    public String deleteCart(String userid, String gamename) {
        try {
            Userinfo user = userinfoRepository.findByUserId(userid).get();
            StringBuilder sb = new StringBuilder();
            String cart_str = user.getUsercart();
            String[] cart_list = cart_str.split("\\|\\|");
            for(int i = 0; i < cart_list.length; i++){
                if( !gamename.equals(cart_list[i])){
                    sb.append(cart_list[i]).append("||");
                }
            }
            user.setUsercart(sb.toString());
            userinfoRepository.save(user);
        } catch (Exception e) {
            return "error";
        }
        return "okay";
    }

    @Override
    public String addItemToUser(String userid) {
        try {
            Userinfo user = userinfoRepository.findByUserId(userid).get();
            List<String> userGameList = user.getGameItems();
            String getGL = user.getUsercart();
            String[] gamelist = getGL.split("\\|\\|");
            if( userGameList != null){
                for(int i = 0; i < userGameList.size(); i++){
                    for(int j = 0; j < gamelist.length; j++){
                        if(userGameList.get(i).equals(gamelist[j])){
                            return "already "+userGameList.get(i);
                        }
                    }
                }
            }else{
                userGameList = new ArrayList<>();
            }
            for(int i = 0; i < gamelist.length; i++){
                userGameList.add(gamelist[i]);
                String msg = gameService.minusProductCount(gamelist[i]);
                if("error".equals(msg)){
                    return "error";
                }else if(msg.startsWith("재고")){
                    return msg;
                }
            }
            user.setGameItems(userGameList);
            user.setUsercart(null);
            userinfoRepository.save(user);
            return "okay";
        } catch (Exception e) {
            return "error";
        }
    }

    @Override
    public List<String> getMyGameItems(String userid) {
        List<String> resultList = new ArrayList<>();
        try {
            Userinfo user = userinfoRepository.findByUserId(userid).get();
            resultList = user.getGameItems();
        } catch (Exception e) {
            return resultList;
        }
        return resultList;
    }

    @Override
    public String deleteMyItemGame(String userid, String gamename) {
        try {
            Userinfo user = userinfoRepository.findByUserId(userid).get();
            List<String> gameList = user.getGameItems();
            for(int i = 0; i < gameList.size(); i++){
                if(gamename.equals(gameList.get(i))){
                    gameList.remove(i);
                    break;
                }
            }
            if(gameList == null || gameList.isEmpty()){
                user.setGameItems(null);
            }else{
                user.setGameItems(gameList);
            }
            userinfoRepository.save(user);
            return "okay";
        } catch (Exception e) {
            return "error";
        }
    }

    @Override
    public Map<String, String> findmodifyUser(String userid) {
        Map<String, String> map = new HashMap<>();
        try {
            Userinfo user = userinfoRepository.findById(userid).get();
            map.put("id", user.getUsername());
            map.put("pw",user.getPassword());
            map.put("err","N");
        } catch (Exception e) {
            map.put("err", "Y");
        }
        return map;
    }

    @Override
    public String changePassword(String userid, String pwd) {
        try {
            Userinfo user = userinfoRepository.findById(userid).get();
            user.setUserPassword(pwd);
            userinfoRepository.save(user);
            return "okay";
        } catch (Exception e) {
            return "error";
        }
    }

    @Override
    public String myCartNumber(String userid) throws Exception{
        Userinfo user = userinfoRepository.findById(userid).get();
        String line = user.getUsercart();
        if(line == null){
            return "null";
        }else if("".equals(line)){
            return "null";
        }
        int lenth = line.split("\\|\\|").length;
        return String.valueOf(lenth);
    }
    
}
