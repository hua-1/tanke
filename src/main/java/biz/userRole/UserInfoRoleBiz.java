package biz.userRole;

import dao.TroleMapper;
import dao.TroltUserRoleeMapper;
import entity.Trole;
import model.role.RoleRequestModel;
import model.role.RoleResponseModel;
import model.role.UserApplicationTreeModel;
import model.userRole.UserRoleRequestModel;
import model.userRole.UserRoleResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.ListUtils;
import util.page.Page;
import util.page.Pageable;
import util.resource.CommonConstant;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserInfoRoleBiz {

    @Autowired
    private TroleMapper troleMapper;

    @Autowired
    private TroltUserRoleeMapper troltUserRoleeMapper;

    public RoleResponseModel searchRoleList(Pageable pageable, RoleRequestModel roleRequestModel){
        RoleResponseModel roleResponseModel= new RoleResponseModel();
        Page<Trole> trolePage = troleMapper.searchList(pageable, roleRequestModel);
        if(trolePage!=null&& ListUtils.isNotEmpty(trolePage.getContent())){
            roleResponseModel.setList(trolePage.getContent());
            roleResponseModel.setTotal(trolePage.getTotal());
        }else{
            roleResponseModel.setList(new ArrayList());
            roleResponseModel.setTotal(CommonConstant.LONG_ZREO);
        }
        return  roleResponseModel;
    }

    /**
     * 所有角色
     * @return
     */
    public List<UserApplicationTreeModel> getRoleByUserInfo(){
        List<UserApplicationTreeModel> roleByUserInfo = troleMapper.getRoleByUserInfo();
        return roleByUserInfo;
    }

    /**
     * 查询用户角色信息
     * @param userRoleRequestModel
     * @return
     */
    public UserRoleResponseModel getUserRoleInfo(UserRoleRequestModel userRoleRequestModel){
        UserRoleResponseModel userRoleResponseModel = troltUserRoleeMapper.searchUserRoleInfo(userRoleRequestModel.getUserId());
        return userRoleResponseModel;
    }
}
