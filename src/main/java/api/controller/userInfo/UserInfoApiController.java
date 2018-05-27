package api.controller.userInfo;

import biz.userinfo.UserInfoBiz;
import dto.userinfo.UserInfoRequestDto;
import dto.userinfo.UserInfoResponseDto;
import model.userinfo.UserInfoResponseModel;
import model.userinfo.UserInfoRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import util.modelmapper.MapperUtils;
import util.page.PageResponseDto;
import util.page.Pageable;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/userinfo/api/")
public class UserInfoApiController {
    @Autowired
    private UserInfoBiz userInfoBiz;



    @RequestMapping(value = "searchList",method = RequestMethod.POST)
    public PageResponseDto<UserInfoResponseDto> searchList(HttpServletRequest request, UserInfoRequestDto userIndoRequestDto){
        PageResponseDto pageResponseDto= new PageResponseDto();
        Pageable pageable = new Pageable(userIndoRequestDto.getPage() - 1, userIndoRequestDto.getRows());
        UserInfoResponseModel userInfoResponseModel = userInfoBiz.searchList(pageable, MapperUtils.mapper(userIndoRequestDto, UserInfoRequestModel.class));
        pageResponseDto.setRows(MapperUtils.mapper(userInfoResponseModel.getUserList(),UserInfoResponseDto.class));
        pageResponseDto.setTotal(userInfoResponseModel.getTotal());
        return pageResponseDto;
    }
}
