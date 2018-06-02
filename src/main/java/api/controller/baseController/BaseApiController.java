package api.controller.baseController;

import biz.userinfo.UserInfoBiz;
import model.userinfo.LoginUserInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class BaseApiController {

    @Autowired
    private UserInfoBiz userInfoBiz;

    public LoginUserInfoModel getLogin(HttpServletRequest request){
        String id = request.getSession().getId();
        HttpSession session = request.getSession();
        LoginUserInfoModel attribute = (LoginUserInfoModel) session.getAttribute(id);
        if(null!=attribute){
            return attribute;
        }else{
            return new LoginUserInfoModel();
        }
    }
}
