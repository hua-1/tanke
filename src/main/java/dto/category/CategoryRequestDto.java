package dto.category;

import util.page.PageRequestDto;
import util.resource.CommonConstant;

public class CategoryRequestDto extends PageRequestDto{
    private String id;
    private String name;
    private String cateStatus;

    public String getCateStatus() {
        return cateStatus;
    }

    public void setCateStatus(String cateStatus) {
        this.cateStatus = cateStatus;
    }

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
}
