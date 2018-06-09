package biz.category;

import biz.common.CommonBiz;
import dao.TCategoryMapper;
import entity.TCategory;
import model.category.CategoryRequestModel;
import model.category.DelCategoryRequestModel;
import model.category.TCategoryParentResponseModel;
import model.category.TCategoryResponseModel;
import model.common.LoginUserModel;
import model.userinfo.LoginUserInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import util.ListUtils;
import util.PropertiesUtils;
import util.exception.BusinessException;
import util.modelmapper.MapperUtils;
import util.page.Page;
import util.page.Pageable;
import util.resource.CommonConstant;
import util.resource.ResourceConstant;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryBiz {

    @Autowired
    private TCategoryMapper categoryMapper;

    @Autowired
    private CommonBiz commonBiz;

    @Autowired
    private PropertiesUtils propertiesUtils;
    //保存类别
    @Transactional
    public void  saveCategory(CategoryRequestModel model, LoginUserInfoModel userModel){
        if(model.getId()==null||model.getId()< CommonConstant.LONG_ZREO){
            boolean b = countName(model.getName(), null);
            if(b){
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.CATAGORY_ALEARDY_EXIST));
            }
            TCategory tCategory = MapperUtils.mapper(model, TCategory.class);
            tCategory.setRemark(model.getRemark());
            tCategory.settCategoryName(model.getName());
            tCategory.settDescribe(model.gettDescribe());
            commonBiz.setBaseEntityAdd(tCategory,userModel.getUserName());
            if(null!=model.gettParentId()){
                tCategory.settParentId(model.gettParentId());
            }else{
                tCategory.settParentId(CommonConstant.LONG_ZREO);
            }
            categoryMapper.insert(tCategory);
        }else{
            boolean countName = countName(model.getName(),model.gettParentId());
            if(countName){
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.CATAGORY_ALEARDY_EXIST));
            }
            TCategory tCategory = categoryMapper.selectByPrimaryKey(model.gettParentId());
            if(tCategory==null)
            {
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.CATAGORY_NOT_EXIST));
            }
            TCategory category=new TCategory();
            category.setRemark(model.getRemark());
            category.settCategoryName(model.getName());
            category.settDescribe(model.gettDescribe());
            commonBiz.setBaseEntityModify(tCategory,userModel.getUserName());
            if(model.gettParentId()!=null&&model.gettParentId()>CommonConstant.LONG_ZREO){
                category.settParentId(model.gettParentId());
            }
            categoryMapper.updateByPrimaryKeySelective(category);
        }
    }

    //删除
    @Transactional
    public void  delCategory(DelCategoryRequestModel model,LoginUserModel userModel){
            TCategory tCategory = categoryMapper.selectByPrimaryKey(model.getId());
            if(tCategory==null){
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.CATAGORY_NOT_EXIST));
            }
        DelCategoryRequestModel delCategoryRequestModel= new DelCategoryRequestModel();
        delCategoryRequestModel.setId(model.getId());
        delCategoryRequestModel.setIfDisable(CommonConstant.INTEGER_ONE);
        commonBiz.setBaseEntityModify(delCategoryRequestModel,userModel.getUserName());
        categoryMapper.updateIfDisable(delCategoryRequestModel);
    }

    //查询列表
    public TCategoryResponseModel  selectCategoryAll(Pageable pageable,CategoryRequestModel categoryRequestModel){
        TCategoryResponseModel tCategoryResponseModel=new TCategoryResponseModel();
        Page<TCategory> tCategoryResponseModelPage = categoryMapper.selectTCategoryInfoAll(pageable,categoryRequestModel);
        if(ListUtils.isNotEmpty(tCategoryResponseModelPage.getContent())){
            List<TCategory> content = tCategoryResponseModelPage.getContent();
            List<TCategory> list=new ArrayList<>();
            for (TCategory tc:
                    content ) {
                if(CommonConstant.INTEGER_ZREO.equals(tc.gettParentId())){
                    list.add(tc);
                }
            }
            tCategoryResponseModel.setList(list);
            tCategoryResponseModel.setTotal(tCategoryResponseModelPage.getTotal());
        }else{
            tCategoryResponseModel.setTotal(CommonConstant.LONG_ZREO);
            tCategoryResponseModel.setList(new ArrayList<TCategory>());
        }
        return tCategoryResponseModel;
    }

    /**
     * 判断添加的类别是否已经存在
     * @param name
     * @return
     */
    public boolean countName(String name,Long id){
        int i = categoryMapper.countName(name, id);
        boolean flag=false;
        if(i>0){
            flag=true;
        }
        return flag;
    }

    /**
     * 查询一级类别
     * @return
     */
    public List<TCategoryParentResponseModel>  getTCategoryParentInfo(){
        List<TCategoryParentResponseModel> tCategoryParentInfo = categoryMapper.getTCategoryParentInfo();
        return  tCategoryParentInfo;
    }

    /**
     * 根据一级类别查询二级类别
     * @param delCategoryRequestModel
     * @return
     */
    public TCategoryResponseModel getTCategoryById(DelCategoryRequestModel delCategoryRequestModel){
        TCategoryResponseModel tCategoryResponseModel=new TCategoryResponseModel();
        TCategory tCategory = categoryMapper.selectByPrimaryKey(delCategoryRequestModel.getId());
        if(tCategory==null){
            throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.CATAGORY_NOT_EXIST));
        }
        List<TCategory> tCategoryByParentId = categoryMapper.getTCategoryByParentId(delCategoryRequestModel.getId());
        tCategoryResponseModel.setList(tCategoryByParentId);
        return tCategoryResponseModel;
    }

}
