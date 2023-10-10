package com.example.demo.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.domain.GameProduct;
import com.example.demo.repository.GameRepository;

@Service
public class GameServiceImpl implements GameService{

    @Autowired
    private GameRepository sqlRepository;

    @Override
    public Page<GameProduct> getAllItems(String gamename, Pageable pageable) {
        return sqlRepository.findByGamenameLike(gamename, pageable);
    }

    @Override
    public void insertItem(GameProduct game) {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String date = format.format(now);
        game.setDate(date);
        sqlRepository.save(game);
    }

    @Override
    public GameProduct getGameProduct(String gamename) {
        return sqlRepository.findByGamename(gamename);
    }

    @Override
    public String modifytoGame(String gamename, String price, String discount, String sumnail, String category,
            String imagelink, String productCount) {
        try {
            GameProduct gameProduct = sqlRepository.findByGamename(gamename);
            gameProduct.setPrice(price);
            gameProduct.setDiscount(discount);
            gameProduct.setSumnail(sumnail);
            gameProduct.setCategory(category);
            gameProduct.setImagelink(imagelink);
            gameProduct.setProductCount(productCount);
            sqlRepository.save(gameProduct);
            return "okay";
        } catch (Exception e) {
            return "error";
        }
    }

    @Override
    public String minusProductCount(String gamename) {
        GameProduct gameProduct = sqlRepository.findByGamename(gamename);
        try {
            int counting = Integer.parseInt(gameProduct.getProductCount());
            if(counting > 0){
                counting--;
            }else{
                return "재고가없음"+gamename;
            }
            String result = String.valueOf(counting);
            gameProduct.setProductCount(result);
        } catch (Exception e) {
            return "error";
        }
        sqlRepository.save(gameProduct);
        return "okay";
    }

}
