package model.permission;

import entity.TPermission;

import java.util.List;

public class PermissionResponseModel {

    private List<TPermission> permissionList;

    public List<TPermission> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<TPermission> permissionList) {
        this.permissionList = permissionList;
    }
}
