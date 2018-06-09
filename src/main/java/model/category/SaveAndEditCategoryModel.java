package model.category;

public class SaveAndEditCategoryModel {
    private String id;
    private String name;
    private Integer cateStatus;
    private Long tParentId;
    private String tDescribe;
    private String remark;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCateStatus() {
        return cateStatus;
    }

    public void setCateStatus(Integer cateStatus) {
        this.cateStatus = cateStatus;
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
}
