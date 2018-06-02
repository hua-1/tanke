package biz.userinfo;

import biz.common.CommonBiz;
import dao.TroltUserRoleeMapper;
import dao.TuserMapper;
import entity.TroltUserRolee;
import entity.Tuser;
import model.userinfo.LoginUserInfoModel;
import model.userinfo.UserInfoResponseModel;
import model.userinfo.UserInfoRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import util.ConversionUtils;
import util.ListUtils;
import util.PropertiesUtils;
import util.StringUtils;
import util.exception.BusinessException;
import util.modelmapper.MapperUtils;
import util.page.Page;
import util.page.Pageable;
import util.resource.CommonConstant;
import util.resource.ResourceConstant;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserInfoBiz {

    @Autowired
    private TuserMapper tUserMapper;

    @Autowired
    private CommonBiz commonBiz;

    @Autowired
    private PropertiesUtils propertiesUtils;

    @Autowired
    private TroltUserRoleeMapper troltUserRoleeMapper;
    /**
     * 查询全部用户
     * @param pageable
     * @param userInfoRequestModel
     * @return
     */
    public UserInfoResponseModel searchList(Pageable pageable, UserInfoRequestModel userInfoRequestModel){
        UserInfoResponseModel userInfoResponseModel = new UserInfoResponseModel();
        Page<Tuser> tUserPage = tUserMapper.searchUserInfoList(pageable, userInfoRequestModel);
        if(ListUtils.isNotEmpty(tUserPage.getContent())){
            userInfoResponseModel.setUserList(tUserPage.getContent());
            userInfoResponseModel.setTotal(tUserPage.getTotal());
        }else{
            userInfoResponseModel.setUserList(new ArrayList<Tuser>());
            userInfoResponseModel.setTotal(CommonConstant.LONG_ZREO);
        }
        return userInfoResponseModel;
    }

    /**
     * 保存用户
     * @param userInfoRequestModel
     */
    @Transactional
    public void saveUser(UserInfoRequestModel userInfoRequestModel,LoginUserInfoModel login){
        String roleIds = userInfoRequestModel.getRoleIds();
        int contains=0;
        if(StringUtils.isNotEmpty(roleIds)){
            contains= roleIds.indexOf(",");
        }

        if(null==userInfoRequestModel.getId()){
            int i = countUserName(userInfoRequestModel.getUserAccount());
            if(i>CommonConstant.INTEGER_ZREO){
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.USER_NAME_EXIST));
            }
            Tuser mapper = MapperUtils.mapper(userInfoRequestModel, Tuser.class);
            commonBiz.setBaseEntityAdd(mapper,login.getUserName());
            tUserMapper.insertPrimaryKey(mapper);
            if(contains>CommonConstant.INTEGER_ONE){
                batchUserRoleRelation(roleIds,mapper,userInfoRequestModel.getEnabled(),login.getUserName());
            }else{
                this.insertUserByRole(mapper,roleIds,login.getUserName());
            }
        }else{
            Tuser tUser = tUserMapper.selectByPrimaryKey(userInfoRequestModel.getId());
            if(tUser==null){
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.USER_NOT_EXIST));
            }
            Tuser tuser = MapperUtils.mapper(userInfoRequestModel, Tuser.class);
            tuser.setId(tUser.getId());
            troltUserRoleeMapper.updateBatchTuserRole(tUser.getId());
            if(contains>CommonConstant.INTEGER_ONE){
                batchUserRoleRelation(userInfoRequestModel.getRoleIds(),tuser,userInfoRequestModel.getEnabled(),login.getUserName());
            }else{
                this.insertUserByRole(tuser,roleIds,login.getUserName());
            }
            tUserMapper.updateByPrimaryKeySelective(tuser);
        }
    }

    /**
     * 批量添加用户角色关系表
     * @param roleIds
     * @param mapper
     * @param enable
     * @param username
     */
    public void batchUserRoleRelation(String roleIds,Tuser mapper,Integer enable,String username){
        if(StringUtils.isNotEmpty(roleIds)){
            String[] split = org.apache.commons.lang3.StringUtils.split(",");
            List<TroltUserRolee> list=new ArrayList<>();
            for (String str:split) {
                TroltUserRolee troltUserRolee= new TroltUserRolee();
                troltUserRolee.setRoleId(ConversionUtils.toLong(str));
                troltUserRolee.setUserId(mapper.getId());
                troltUserRolee.setEnabled(enable);
                commonBiz.setBaseEntityAdd(troltUserRolee,username);
                list.add(troltUserRolee);
            }
            troltUserRoleeMapper.batchInsertTuserRole(list);
        }
    }

    /**
     * 插入单个角色
     */
    public void insertUserByRole(Tuser mapper,String str,String username){
        TroltUserRolee troltUserRolee= new TroltUserRolee();
        troltUserRolee.setRoleId(ConversionUtils.toLong(str));
        troltUserRolee.setUserId(mapper.getId());
        troltUserRolee.setEnabled(mapper.getEnabled());
        troltUserRoleeMapper.insert(troltUserRolee);
    }

    /**
     * 登录
     * @param loginUserInfoModel
     * @return
     */
    public LoginUserInfoModel loginUserInfoModel(LoginUserInfoModel loginUserInfoModel){
        Tuser tUser = tUserMapper.loginUser(loginUserInfoModel);
        if(null==tUser){
            throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.USER_NOT_EXIST));
        }
        LoginUserInfoModel mapper = MapperUtils.mapper(tUser, LoginUserInfoModel.class);
        return mapper;
    }
    public Tuser getUserInfo(String id){
      return   tUserMapper.selectByPrimaryKey(ConversionUtils.toLong(id));
    }

    /**
     * 判断账户是否唯一性
     * @param name
     * @return
     */
    public int countUserName(String name){
        int i = tUserMapper.countUserName(name);
        return i;
    }
}
