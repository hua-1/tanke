package dao;

import entity.TRolePermission;
import model.role.BatchInsertRoleMenu;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TRolePermissionMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TRolePermission record);

    int insertSelective(TRolePermission record);

    TRolePermission selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TRolePermission record);

    int updateByPrimaryKey(TRolePermission record);

    int deleteRoleMenuByRoleId(@Param("roleIdArr")List<String> roleId);

    int batchInsertRoleMenu(@Param("model")BatchInsertRoleMenu batchInsertRoleMenu);
}