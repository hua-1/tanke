package dto.category;

public class SaveAndEditCategoryDto {
    private String cateid;
    private String name;
    private Integer cateStatus;
    private String tParentId;
    private String tDescribe;
    private String remark;

    public String getCateid() {
        return cateid;
    }

    public void setCateid(String cateid) {
        this.cateid = cateid;
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
}
