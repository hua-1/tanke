package model.category;

public class TCategoryParentResponseModel {
    private Long id;
    private String tCategoryName;

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

    public String gettCategoryName() {
        return tCategoryName;
    }

    public void settCategoryName(String tCategoryName) {
        this.tCategoryName = tCategoryName;
    }
}
