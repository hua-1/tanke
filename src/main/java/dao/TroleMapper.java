package dao;

import entity.Trole;
import model.role.RoleRequestModel;
import model.role.UserApplicationTreeModel;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import util.page.Page;
import util.page.Pageable;

import java.util.List;

@Repository
public interface TroleMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Trole record);

    int insertSelective(Trole record);

    Trole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Trole record);

    int updateByPrimaryKey(Trole record);

    Page<Trole> searchList(Pageable pageable, @Param("params")RoleRequestModel roleRequestModel);

    List<UserApplicationTreeModel> getRoleByUserInfo();

    List<Trole> selectRoleByRoleName(@Param("roleName")String roleName, @Param("applicationId")int applicationId);

    int insertRoleSelective(Trole record);
}