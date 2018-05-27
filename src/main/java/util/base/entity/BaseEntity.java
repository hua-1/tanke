package util.base.entity;

import java.io.Serializable;

public class BaseEntity implements Serializable {
    private static final long serialVersionUID = -3245478690496182643L;
    private Long id;
    private String userName;
    private String userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
