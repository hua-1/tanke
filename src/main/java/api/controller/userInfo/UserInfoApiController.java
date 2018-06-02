package api.controller.userInfo;

import api.controller.baseController.BaseApiController;
import biz.userinfo.UserInfoBiz;
import dto.response.ResponseBaseDto;
import dto.userinfo.LoginResponseDto;
import dto.userinfo.LoginUserInfoDto;
import dto.userinfo.UserInfoRequestDto;
import dto.userinfo.UserInfoResponseDto;
import model.userinfo.LoginUserInfoModel;
import model.userinfo.UserInfoResponseModel;
import model.userinfo.UserInfoRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import util.modelmapper.MapperUtils;
import util.page.PageResponseDto;
import util.page.Pageable;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/userinfo/api/")
public class UserInfoApiController extends BaseApiController {
    @Autowired
    private UserInfoBiz userInfoBiz;



    @RequestMapping(value = "searchList",method = RequestMethod.POST)
    public PageResponseDto<UserInfoResponseDto> searchList(HttpServletRequest request, UserInfoRequestDto userIndoRequestDto){
        PageResponseDto pageResponseDto= new PageResponseDto();
        LoginUserInfoModel login = getLogin(request);
        Pageable pageable = new Pageable(userIndoRequestDto.getPage() - 1, userIndoRequestDto.getRows());
        UserInfoResponseModel userInfoResponseModel = userInfoBiz.searchList(pageable, MapperUtils.mapper(userIndoRequestDto, UserInfoRequestModel.class));
        pageResponseDto.setRows(MapperUtils.mapper(userInfoResponseModel.getUserList(),UserInfoResponseDto.class));
        pageResponseDto.setTotal(userInfoResponseModel.getTotal());
        return pageResponseDto;
    }

    /**
     * 保存用户
     * @param userInfoRequestDto
     * @param request
     * @return
     */
    @RequestMapping(value = "saveUser",method = RequestMethod.POST)
    public ResponseBaseDto saveUser(@RequestBody  UserInfoRequestDto userInfoRequestDto, HttpServletRequest request){
        LoginUserInfoModel login = getLogin(request);
        userInfoBiz.saveUser(MapperUtils.mapper(userInfoRequestDto,UserInfoRequestModel.class),login);
        return new ResponseBaseDto();
    }

    @RequestMapping(value = "login",method = RequestMethod.POST)
    public ResponseBaseDto login(@RequestBody  LoginUserInfoDto loginUserInfoDto,HttpServletRequest request, HttpServletResponse response){
        LoginUserInfoModel loginUserInfoModel = userInfoBiz.loginUserInfoModel(MapperUtils.mapper(loginUserInfoDto, LoginUserInfoModel.class));
        HttpSession session = request.getSession();
        session.setAttribute(session.getId(),loginUserInfoModel);
        Cookie setSessionId = new Cookie("JSESSIONID",session.getId());//sessionId默认是存放在一个name为mySessionId里面的
        setSessionId.setMaxAge(30 * 60);// 以秒为单位，所以为30分钟
        response.addCookie(setSessionId);
        return new LoginResponseDto();
    }


}
