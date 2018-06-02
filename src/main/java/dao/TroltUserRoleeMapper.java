package dao;

import entity.TroltUserRolee;
import model.userRole.UserRoleResponseModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TroltUserRoleeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TroltUserRolee record);

    int insertSelective(TroltUserRolee record);

    TroltUserRolee selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TroltUserRolee record);

    int updateByPrimaryKey(TroltUserRolee record);
    int  batchInsertTuserRole(List<TroltUserRolee> record);

    int updateBatchTuserRole(@Param("userId")Long userId);

    UserRoleResponseModel searchUserRoleInfo(@Param("userid")Long userid);
}