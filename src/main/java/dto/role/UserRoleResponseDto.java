package dto.role;

import dto.response.ResponseBaseDto;

import java.util.List;

public class UserRoleResponseDto extends ResponseBaseDto{
    private String userId;
    private String userName;
    private String userAccount;
    private String password;
    private String mobilePhone;
    private String telephone;
    private List<UserRoleRelationDto> list;
    private String enabled;


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public List<UserRoleRelationDto> getList() {
        return list;
    }

    public void setList(List<UserRoleRelationDto> list) {
        this.list = list;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }
}
