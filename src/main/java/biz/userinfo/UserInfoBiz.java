package biz.userinfo;

import dao.tUserMapper;
import entity.tUser;
import model.userinfo.UserInfoResponseModel;
import model.userinfo.UserInfoRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.ListUtils;
import util.page.Page;
import util.page.Pageable;
import util.resource.CommonConstant;

import java.util.ArrayList;

@Service
public class UserInfoBiz {
    @Autowired
    private tUserMapper tUserMapper;

    /**
     * 查询全部用户
     * @param pageable
     * @param userInfoRequestModel
     * @return
     */
    public UserInfoResponseModel searchList(Pageable pageable, UserInfoRequestModel userInfoRequestModel){
        UserInfoResponseModel userInfoResponseModel = new UserInfoResponseModel();
        Page<tUser> tUserPage = tUserMapper.searchUserInfoList(pageable, userInfoRequestModel);
        if(ListUtils.isNotEmpty(tUserPage.getContent())){
            userInfoResponseModel.setUserList(tUserPage.getContent());
            userInfoResponseModel.setTotal(tUserPage.getTotal());
        }else{
            userInfoResponseModel.setUserList(new ArrayList<tUser>());
            userInfoResponseModel.setTotal(CommonConstant.LONG_ZREO);
        }
        return userInfoResponseModel;
    }
}
