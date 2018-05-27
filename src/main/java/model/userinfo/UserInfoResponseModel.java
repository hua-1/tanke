package model.userinfo;

import entity.tUser;

import java.util.Date;
import java.util.List;

public class UserInfoResponseModel {

    private List<tUser> userList;
    private Long total=0L;

    public List<tUser> getUserList() {
        return userList;
    }

    public void setUserList(List<tUser> userList) {
        this.userList = userList;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
