package model.category;

public class CategoryRequestModel {
    private Long id;
    private String tCategoryName;

    private Long tParentId;

    private String tDescribe;

    private String remark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
}
