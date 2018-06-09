package dto.category;

import dto.response.ResponseBaseDto;

public class TCategoryParentResponseDto extends ResponseBaseDto{
    private String id;
    private String tCategoryName;

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

    public String getIfDisable() {
        return ifDisable;
    }

    public void setIfDisable(String ifDisable) {
        this.ifDisable = ifDisable;
    }
}
