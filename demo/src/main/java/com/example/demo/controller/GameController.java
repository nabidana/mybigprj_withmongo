package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.domain.GameProduct;
import com.example.demo.repository.GameRepository;

@Controller
public class GameController {

    @Autowired
    private GameRepository gameRepository;
    
    @RequestMapping(value = "/")
    public String mainPage() throws Exception{
        return "index";
    }

    @RequestMapping(value = "/add")
    public String addPage() throws Exception{
        return "add";
    }

    @PostMapping(value = "/login")
    public String loginPage() throws Exception{
        return "login";
    }

    @PostMapping(value = "/signup")
    public String signupPage() throws Exception{
        return "signup";
    }

    @GetMapping(value = "/login")
    public String ErrPage() throws Exception{
        return "securitylogin";
    }

    @RequestMapping(value = "/loginfailed")
    public String loginFailPage() throws Exception{
        return "loginfailed";
    }

    @GetMapping(value = "/useraccount")
    public String userAccountPage() throws Exception{
        return "useraccount";
    }

    @RequestMapping(value = "/err")
    public String errPage() throws Exception{
        return "err";
    }

    @RequestMapping(value = "/buy")
    public String buyPage() throws Exception{
        return "buy";
    }

    @RequestMapping(value = "/getGameItem")
    public String gameInfoPage() throws Exception{
        return "gameinfo";
    }

    @RequestMapping(value = "/modifygameinfo")
    public String modifyInfoPage() throws Exception{
        return "modifygameinfo";
    }
}
