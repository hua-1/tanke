package api.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class LoginController {

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response){
        ModelAndView modelAndView = new ModelAndView("/userInfo/login");
        return modelAndView;
    }
}
