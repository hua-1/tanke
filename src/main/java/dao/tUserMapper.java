package dao;

import entity.tUser;
import model.userinfo.UserInfoRequestModel;
import org.apache.ibatis.annotations.Param;
import util.page.Page;
import util.page.Pageable;

public interface tUserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(tUser record);

    int insertSelective(tUser record);

    tUser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(tUser record);

    int updateByPrimaryKey(tUser record);

    Page<tUser> searchUserInfoList(Pageable pageable, @Param("params") UserInfoRequestModel userInfoRequestModel);
}