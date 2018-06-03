package dto.role;

import dto.common.LoginUserDto;

public class UserRoleRequestDto extends LoginUserDto {

    private String roleId;

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
