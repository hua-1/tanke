package model.category;

import entity.TCategory;
import util.resource.CommonConstant;

import java.util.ArrayList;
import java.util.List;

public class TCategoryResponseModel{

    private List<TCategory> list=new ArrayList<>();
    private Long total= CommonConstant.LONG_ZREO;

    public List<TCategory> getList() {
        return list;
    }

    public void setList(List<TCategory> list) {
        this.list = list;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}