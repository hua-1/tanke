package entity;

import util.base.entity.BaseEntity;

import java.util.Date;

public class TCategory extends BaseEntity{

    private String tCategoryName;

    private Long tParentId;

    private String tDescribe;
    private String remark;

    private Integer ifTop;

    private Integer tSorting;

    private Integer ifDisable;

    public String gettCategoryName() {
        return tCategoryName;
    }

    public void settCategoryName(String tCategoryName) {
        this.tCategoryName = tCategoryName;
    }

    public Long gettParentId() {
        return tParentId;
    }

    public void settParentId(Long tParentId) {
        this.tParentId = tParentId;
    }

    public String gettDescribe() {
        return tDescribe;
    }

    public void settDescribe(String tDescribe) {
        this.tDescribe = tDescribe;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getIfTop() {
        return ifTop;
    }

    public void setIfTop(Integer ifTop) {
        this.ifTop = ifTop;
    }

    public Integer gettSorting() {
        return tSorting;
    }

    public void settSorting(Integer tSorting) {
        this.tSorting = tSorting;
    }

    public Integer getIfDisable() {
        return ifDisable;
    }

    public void setIfDisable(Integer ifDisable) {
        this.ifDisable = ifDisable;
    }
}