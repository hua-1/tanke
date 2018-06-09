package dao;

import entity.TCategory;
import model.category.CategoryRequestModel;
import model.category.DelCategoryRequestModel;
import model.category.TCategoryParentResponseModel;
import org.apache.ibatis.annotations.Param;
import util.page.Page;
import util.page.Pageable;

import java.util.List;

public interface TCategoryMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TCategory record);

    int insertSelective(TCategory record);

    TCategory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TCategory record);

    int updateByPrimaryKey(TCategory record);

    int updateIfDisable(@Param("params")DelCategoryRequestModel model);

    Page<TCategory> selectTCategoryInfoAll(Pageable pageable, @Param("params")CategoryRequestModel categoryRequestModel);

    int countName(@Param("name") String name,@Param("id") Long id);
    List<TCategoryParentResponseModel> getTCategoryParentInfo();

    List<TCategory> getTCategoryByParentId(@Param("id")Long id);
}