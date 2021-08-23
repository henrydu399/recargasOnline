package co.systemhome.recargasonline.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class homeController {
	
	 @RequestMapping("/")
	    public String welcome() {
	        return "index.html";
	    }

}
