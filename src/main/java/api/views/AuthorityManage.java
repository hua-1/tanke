package api.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class AuthorityManage {

    @RequestMapping(value = "/authorityManage/userManage",method = RequestMethod.GET)
    public ModelAndView userManage(HttpServletRequest request, HttpServletResponse response){
        ModelAndView modelAndView= new ModelAndView("authorityManage/userManage");
        return modelAndView;
    }
    @RequestMapping(value = "/authorityManage/menuManager",method = RequestMethod.GET)
    public ModelAndView menuManager(HttpServletRequest request, HttpServletResponse response){
        ModelAndView modelAndView= new ModelAndView("authorityManage/menuManager");
        return modelAndView;
    }
    @RequestMapping(value = "/authorityManage/roleManager",method = RequestMethod.GET)
    public ModelAndView roleManager(HttpServletRequest request, HttpServletResponse response){
        ModelAndView modelAndView= new ModelAndView("authorityManage/roleManager");
        return modelAndView;
    }
}
