package entity;

import util.base.entity.BaseEntity;

import java.util.Date;

public class TPermission extends BaseEntity{

    private String permissionName;

    private String menuUrl;

    private String permissionCode;

    private Integer permissionType;

    private Integer permissionSort;

    private String permissionImg;

    private Long parentId;

    private Integer enabled;


    private Integer valid;

    private String remark;

    private Long applicationId;



    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    public String getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(String permissionCode) {
        this.permissionCode = permissionCode;
    }

    public Integer getPermissionType() {
        return permissionType;
    }

    public void setPermissionType(Integer permissionType) {
        this.permissionType = permissionType;
    }

    public Integer getPermissionSort() {
        return permissionSort;
    }

    public void setPermissionSort(Integer permissionSort) {
        this.permissionSort = permissionSort;
    }

    public String getPermissionImg() {
        return permissionImg;
    }

    public void setPermissionImg(String permissionImg) {
        this.permissionImg = permissionImg;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public Integer getValid() {
        return valid;
    }

    public void setValid(Integer valid) {
        this.valid = valid;
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
}