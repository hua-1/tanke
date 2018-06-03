package biz.permission;

import biz.common.CommonBiz;
import dao.TPermissionMapper;
import entity.TApplication;
import entity.TPermission;
import model.common.LoginUserModel;
import model.permission.PermissionResponseModel;
import model.permission.PermissionTreeModel;
import model.userinfo.LoginUserInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import util.ConversionUtils;
import util.ListUtils;
import util.PropertiesUtils;
import util.exception.BusinessException;
import util.resource.CommonConstant;
import util.resource.ResourceConstant;

import java.util.ArrayList;
import java.util.List;

@Service
public class PermissionBiz {
    @Autowired
    private TPermissionMapper permissionMapper;

    @Autowired
    private PropertiesUtils propertiesUtils;

    @Autowired
    private CommonBiz commonBiz;
    /**
     * 查询列表
     * @return
     */
    public PermissionResponseModel getAll(){
        List<TPermission> all = permissionMapper.getAll();
        PermissionResponseModel permissionResponseModel=new PermissionResponseModel();
        if(ListUtils.isNotEmpty(all)){
            permissionResponseModel.setPermissionList(all);
        }else{
            permissionResponseModel.setPermissionList(new ArrayList<TPermission>());
        }
        return permissionResponseModel;
    }


    /**
     * 保存菜单
     * @param tPermission
     * @param loginUserInfoModel
     */
    @Transactional
    public void savePermisson(TPermission tPermission, LoginUserInfoModel loginUserInfoModel){
        if(tPermission.getId()==null||tPermission.getId()<=0){
            checkExists(tPermission,null);
            commonBiz.setBaseEntityAdd(tPermission,loginUserInfoModel.getUserName());
            permissionMapper.insert(tPermission);
        }else{
            checkExists(tPermission,tPermission.getId());
            commonBiz.setBaseEntityModify(tPermission,loginUserInfoModel.getUserName());
            permissionMapper.updateByPrimaryKeySelective(tPermission);
        }
    }

    /**
     * 验证菜单编号重复
     * @param tPermission
     * @param currentId
     */
    private void checkExists(TPermission tPermission, Long currentId) {
        TPermission tPermissionModel = permissionMapper.selectByPermissionCode(tPermission.getPermissionCode());
        if (null != tPermissionModel) {
            if (!tPermissionModel.getId().equals(currentId)) {
                throw  new BusinessException(propertiesUtils.getMessages(ResourceConstant.APPLICATION_CODE_EXISTS));
            }
        }

    }
    /**
     * 根据菜单Id获取菜单实体
     *
     * @param permission
     */
    public TPermission getPermissionById(TPermission permission) {
        TPermission permissionModel = permissionMapper.getPermissionById(ConversionUtils.toString(permission.getId()));
        if (null != permissionModel &&
                CommonConstant.LONG_ZREO.equals(permissionModel.getParentId())
                && CommonConstant.INTEGER_ONE.equals(permissionModel.getPermissionType())
                ) {
            permissionModel.setPermissionType(CommonConstant.INTEGER_TWO);
        }
        return permissionModel;
    }

    /**
     * 遍历节点菜单
     * @param applicationId
     * @return
     */
    public List<PermissionTreeModel> getPermissionListByAppId(String applicationId) {
        List<PermissionTreeModel> permissionList = permissionMapper.getPermissionListByAppId(applicationId);
       // List<TApplication> tApplicationList = tApplicationMapper.getApplicationList(ConverterUtils.toLong(applicationId));
        List<TApplication> tApplicationList=new ArrayList<>();
        TApplication tApplication= new TApplication();
        tApplication.setId(CommonConstant.LONG_ZREO);
        tApplication.setApplicationName("哈哈");
        tApplicationList.add(tApplication);
        for (TApplication tSysApplication : tApplicationList) {
            PermissionTreeModel permissionTree = new PermissionTreeModel();
            //建立菜单顶级菜单
            permissionTree.setId(10000L + tSysApplication.getId());
            permissionTree.setName(tSysApplication.getApplicationName());
            //设置当前应用的父节点ID
            permissionTree.setpId(100000L);
            permissionTree.setApplicationId(tSysApplication.getId());
            permissionTree.setApplicationName(tSysApplication.getApplicationName());
            permissionList.add(permissionTree);
        }
        return permissionList;

    }
}
