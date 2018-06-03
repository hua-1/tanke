package model.role;

import java.util.List;

/**
 * Created by yun.zhou on 2017/09/26.
 */
public class PermissionRoleModel {

    private Long id;
    private String roleCode;
    private String roleName;
    private Long applicationId;
    private String remark;
    private Integer enabled;

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    private List<SimplePermissionModel> permissionList;

    public List<SimplePermissionModel> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<SimplePermissionModel> permissionList) {
        this.permissionList = permissionList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }


    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
