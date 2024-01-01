package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Domain.TestDomain;
import com.example.demo.Service.TestService;

@Controller
public class TestController {
    
    @Autowired
    private TestService testService;

    @RequestMapping("/")
    public String mainPage(){
        
        return "home";
    }

    @RequestMapping("/getData")
    public String getdataPage(Model model){

        model.addAttribute("values", testService.getAllItems());
        return "list";
    }

    @RequestMapping(value = "/insertData", method = RequestMethod.GET)
    public String insertdataPage(){
        return "insertdata";
    }

    @RequestMapping(value = "/insertData", method = RequestMethod.POST)
    public String insertData(TestDomain data){
        testService.insertValue(data);

        return "redirect:/";
    }

    @RequestMapping(value = "/deleteData", method = RequestMethod.POST)
    public String deleteData(TestDomain data){
        testService.deleteValue(data);

        return "redirect:/getData";
    }
}
