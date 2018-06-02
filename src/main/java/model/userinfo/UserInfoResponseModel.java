package model.userinfo;

import entity.Tuser;

import java.util.ArrayList;
import java.util.List;

public class UserInfoResponseModel {

    private List<Tuser> userList=new ArrayList<>();
    private Long total=0L;

    public List<Tuser> getUserList() {
        return userList;
    }

    public void setUserList(List<Tuser> userList) {
        this.userList = userList;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
