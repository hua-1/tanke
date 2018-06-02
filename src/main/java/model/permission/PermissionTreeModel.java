package model.permission;

import util.StringUtils;
import util.resource.CommonConstant;

import java.util.Date;

public class PermissionTreeModel {
    private Long id;
    private Long pId;
    private String name;
    private Long permissionId;
    private String permissionName;
    private Long applicationId;
    private String applicationName;
    private String permissionCode;
    private Integer permissionType;


    private String menuUrl;

    private Integer permissionSort;

    private Integer parentId;


    private Integer enabled;

    private String remark;

    private String createdBy;
    private Date createdTime;
    private String lastModifiedBy;
    private Date lastModifiedTime;
    private Integer valid;

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Date getLastModifiedTime() {
        return lastModifiedTime;
    }

    public void setLastModifiedTime(Date lastModifiedTime) {
        this.lastModifiedTime = lastModifiedTime;
    }

    public Integer getValid() {
        return valid;
    }

    public void setValid(Integer valid) {
        this.valid = valid;
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

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    public Integer getPermissionSort() {
        return permissionSort;
    }

    public void setPermissionSort(Integer permissionSort) {
        this.permissionSort = permissionSort;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getpId() {

        if(StringUtils.isNotBlank(this.getPermissionName())){
            if(this.parentId.equals(CommonConstant.INTEGER_ZREO)){
                return Long.valueOf(this.applicationId+10000);
            }
            return Long.valueOf(this.parentId);

        }
        return this.pId;
    }

    public void setpId(Long pId) {
        this.pId = pId;
    }

    public String getName() {
        if(StringUtils.isNotBlank(this.getPermissionName())){
            return this.getPermissionName();
        }
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPermissionId() {
        return this.id;
    }

    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }
}
