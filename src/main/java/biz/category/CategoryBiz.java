package biz.category;

import biz.common.CommonBiz;
import dao.TCategoryMapper;
import entity.TCategory;
import model.category.CategoryRequestModel;
import model.category.DelCategoryRequestModel;
import model.category.TCategoryResponseModel;
import model.common.LoginUserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import util.ListUtils;
import util.PropertiesUtils;
import util.exception.BusinessException;
import util.page.Page;
import util.page.Pageable;
import util.resource.CommonConstant;
import util.resource.ResourceConstant;

import java.util.ArrayList;

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
    public void  saveCategory(CategoryRequestModel model, LoginUserModel userModel){
        if(model.getId()==null||model.getId()< CommonConstant.LONG_ZREO){
            TCategory tCategory=new TCategory();
            tCategory.setRemark(model.getRemark());
            tCategory.settCategoryName(model.gettCategoryName());
            tCategory.settDescribe(model.gettDescribe());
            commonBiz.setBaseEntityAdd(tCategory,userModel.getUserName());
            if(null!=model.gettParentId()){
                tCategory.settParentId(model.gettParentId());
            }
            categoryMapper.insertSelective(tCategory);
        }else{
            TCategory tCategory = categoryMapper.selectByPrimaryKey(model.getId());
            if(tCategory==null)
            {
                throw new BusinessException(propertiesUtils.getMessages(ResourceConstant.CATAGORY_NOT_EXIST));
            }
            TCategory category=new TCategory();
            category.setRemark(model.getRemark());
            category.settCategoryName(model.gettCategoryName());
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
    public TCategoryResponseModel  selectCategoryAll(Pageable pageable){
        TCategoryResponseModel tCategoryResponseModel=new TCategoryResponseModel();
        Page<TCategory> tCategoryResponseModelPage = categoryMapper.selectTCategoryInfoAll(pageable);
        if(ListUtils.isNotEmpty(tCategoryResponseModelPage.getContent())){
            tCategoryResponseModel.setList(tCategoryResponseModelPage.getContent());
            tCategoryResponseModel.setTotal(tCategoryResponseModelPage.getTotal());
        }else{
            tCategoryResponseModel.setTotal(CommonConstant.LONG_ZREO);
            tCategoryResponseModel.setList(new ArrayList<TCategory>());
        }
        return tCategoryResponseModel;
    }

}
