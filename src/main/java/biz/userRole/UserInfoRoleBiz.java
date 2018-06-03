package biz.userRole;

import biz.common.CommonBiz;
import dao.TRolePermissionMapper;
import dao.TroleMapper;
import dao.TroltUserRoleeMapper;
import entity.Trole;
import model.role.*;
import model.userRole.UserRoleRequestModel;
import model.userRole.UserRoleResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import util.ConversionUtils;
import util.ListUtils;
import util.PropertiesUtils;
import util.StringUtils;
import util.exception.BusinessException;
import util.page.Page;
import util.page.Pageable;
import util.resource.CommonConstant;
import util.resource.ResourceConstant;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserInfoRoleBiz {

    @Autowired
    private TroleMapper troleMapper;

    @Autowired
    private CommonBiz commonBiz;
    @Autowired
    private TroltUserRoleeMapper troltUserRoleeMapper;

    @Autowired
    private TRolePermissionMapper tRolePermissionMapper;

    @Autowired
    private PropertiesUtils propertiesUtils;
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

    /**
     * 添加权限
     *
     * @param saveRoleTreeRequest
     * @param loginUserName
     */
    @Transactional
    public void saveRoleTree(SaveRoleTreeRequestModel saveRoleTreeRequest, String loginUserName) {
        Trole tRole = new Trole();

        tRole.setRoleName(saveRoleTreeRequest.getRoleName());
        tRole.setRemark(saveRoleTreeRequest.getRemark());
        tRole.setApplicationId(ConversionUtils.toLong(saveRoleTreeRequest.getApplicationId()));
        tRole.setEnabled(saveRoleTreeRequest.getEnabled());
        if (null == saveRoleTreeRequest.getId() || CommonConstant.LONG_ZREO.equals(saveRoleTreeRequest.getId())) {
            //check
            checkExists(tRole, null);
            commonBiz.setBaseEntityAdd(tRole, loginUserName);
            troleMapper.insertRoleSelective(tRole);
        } else {
            tRole.setId(saveRoleTreeRequest.getId());
            Trole trole = troleMapper.selectByPrimaryKey(tRole.getId());
            if (null == trole) {
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.DATA_NO_EXIST));
            }
            checkExists(tRole, tRole.getId());
            commonBiz.setBaseEntityModify(tRole, loginUserName);
            troleMapper.updateByPrimaryKeySelective(tRole);
        }
        //绑定角色权限
        batchInsertRoleMenu(ConversionUtils.toString(tRole.getId()), saveRoleTreeRequest.getPermissionIdArr(), loginUserName);

    }

    /**
     * 当前应用下，角色名不能重复
     *
     * @param tSysRole
     * @param currentId
     */
    private void checkExists(Trole tSysRole, Long currentId) {
        List<Trole> tSysRoles = troleMapper.selectRoleByRoleName(tSysRole.getRoleName(), ConversionUtils.toInt(tSysRole.getApplicationId()));
        if (null != tSysRoles) {
            for (Trole item : tSysRoles) {
                if (null == currentId || (!currentId.equals(item.getId()))) {
                    throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.ROLE_NAME_EXIST));
                }
            }
        }
    }

    /**
     * 绑定角色菜单
     * @param roleId
     * @param permissionIds
     * @param loginUserName
     */
    private void batchInsertRoleMenu(String roleId, String permissionIds, String loginUserName) {
        String[] permissionIdArr = permissionIds.split(",");
        List<String> permissionList = Arrays.asList(permissionIdArr);
        //删除原有的角色权限关系
        List<String> roleIdArr = new ArrayList<>();
        roleIdArr.add(roleId);
        tRolePermissionMapper.deleteRoleMenuByRoleId(roleIdArr);
        if (StringUtils.isNotBlank(permissionIds)) {
            BatchInsertRoleMenu batchInsertRoleMenu = new BatchInsertRoleMenu();
            batchInsertRoleMenu.setRoleId(ConversionUtils.toInt(roleId));
            batchInsertRoleMenu.setPermissionList(permissionList);
            batchInsertRoleMenu.setEnabled(CommonConstant.INTEGER_ONE);
            commonBiz.setBaseEntityAdd(batchInsertRoleMenu, loginUserName);
            //新增角色权限关系
            tRolePermissionMapper.batchInsertRoleMenu(batchInsertRoleMenu);
        }
    }
}
