package model.userinfo;

import util.base.entity.BaseEntity;

import java.util.Date;
import java.util.List;

public class BatchUserInfoModel extends BaseEntity{
    private Integer enabled;
    private String lastModifiedBy;
    private Date lastModifiedTime;
    private List<Long> list;

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    @Override
    public Date getLastModifiedTime() {
        return lastModifiedTime;
    }

    @Override
    public void setLastModifiedTime(Date lastModifiedTime) {
        this.lastModifiedTime = lastModifiedTime;
    }

    public List<Long> getList() {
        return list;
    }

    public void setList(List<Long> list) {
        this.list = list;
    }
}
