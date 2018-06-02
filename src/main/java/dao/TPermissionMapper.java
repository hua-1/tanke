package dao;

import entity.TPermission;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TPermissionMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TPermission record);

    int insertSelective(TPermission record);

    TPermission selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TPermission record);

    int updateByPrimaryKey(TPermission record);

    List<TPermission> getAll();

    TPermission selectByPermissionCode(@Param("code") String code);

    TPermission   getPermissionById(@Param("permissionId") String permissionId);
}