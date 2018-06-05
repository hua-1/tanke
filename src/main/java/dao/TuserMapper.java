package dao;

import entity.Tuser;
import model.userinfo.BatchUserInfoModel;
import model.userinfo.LoginUserInfoModel;
import model.userinfo.UserInfoRequestModel;
import org.apache.ibatis.annotations.Param;
import util.page.Page;
import util.page.Pageable;

import java.util.List;

public interface TuserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Tuser record);

    int insertSelective(Tuser record);

    Tuser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Tuser record);

    int updateByPrimaryKey(Tuser record);
    Page<Tuser> searchUserInfoList(Pageable pageable, @Param("params") UserInfoRequestModel userInfoRequestModel);

    Tuser loginUser(@Param("params") LoginUserInfoModel loginUserInfoModel);
    int insertPrimaryKey(Tuser tuser);

    int countUserName(@Param("name")String name);

    int batchUserDisable(@Param("params")BatchUserInfoModel list);
}