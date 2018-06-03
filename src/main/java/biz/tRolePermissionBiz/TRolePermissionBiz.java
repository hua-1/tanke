package biz.tRolePermissionBiz;

import dao.TRolePermissionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TRolePermissionBiz
{
    @Autowired
    private TRolePermissionMapper rolePermissionMapper;

    /**
     * 保存角色和菜单关系
     */
    @Transactional
    public void saveRolePermission(){

    }
}
