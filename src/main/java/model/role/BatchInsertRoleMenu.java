package model.role;

import util.base.entity.BaseEntity;

import java.util.List;

public class BatchInsertRoleMenu extends BaseEntity {
    private Integer roleId;
    private Integer enabled;
    private List<String> permissionList;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public List<String> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<String> permissionList) {
        this.permissionList = permissionList;
    }
}
