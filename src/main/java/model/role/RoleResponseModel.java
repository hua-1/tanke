package model.role;

import entity.Trole;

import java.util.ArrayList;
import java.util.List;

public class RoleResponseModel {
    private List<Trole> list= new ArrayList<>();
    private Long total=0L;

    public List<Trole> getList() {
        return list;
    }

    public void setList(List<Trole> list) {
        this.list = list;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
