package model.category;

import util.base.entity.BaseEntity;

public class DelCategoryRequestModel extends BaseEntity{
    private Long id;
    private Integer ifDisable;

    public Integer getIfDisable() {
        return ifDisable;
    }

    public void setIfDisable(Integer ifDisable) {
        this.ifDisable = ifDisable;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
