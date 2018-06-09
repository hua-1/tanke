package dto.category;

public class CategoryResponseDto {

    private String id;
    private String tCategoryName;

    private String tParentId;

    private String tDescribe;
    private String remark;

    private String ifTop;

    private String tSorting;

    private String ifDisable;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String gettCategoryName() {
        return tCategoryName;
    }

    public void settCategoryName(String tCategoryName) {
        this.tCategoryName = tCategoryName;
    }

    public String gettParentId() {
        return tParentId;
    }

    public void settParentId(String tParentId) {
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

    public String getIfTop() {
        return ifTop;
    }

    public void setIfTop(String ifTop) {
        this.ifTop = ifTop;
    }

    public String gettSorting() {
        return tSorting;
    }

    public void settSorting(String tSorting) {
        this.tSorting = tSorting;
    }

    public String getIfDisable() {
        return ifDisable;
    }

    public void setIfDisable(String ifDisable) {
        this.ifDisable = ifDisable;
    }
}
