package dao;

import entity.TRolePermission;

public interface TRolePermissionMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TRolePermission record);

    int insertSelective(TRolePermission record);

    TRolePermission selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TRolePermission record);

    int updateByPrimaryKey(TRolePermission record);
}