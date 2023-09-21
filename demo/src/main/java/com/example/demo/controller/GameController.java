package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GameController {
    
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
}
