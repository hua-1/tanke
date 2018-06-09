package api.controller.category;

import api.controller.baseController.BaseApiController;
import biz.category.CategoryBiz;
import dto.category.*;
import dto.response.ResponseBaseDto;
import model.category.CategoryRequestModel;
import model.category.DelCategoryRequestModel;
import model.category.TCategoryParentResponseModel;
import model.category.TCategoryResponseModel;
import model.userinfo.LoginUserInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import util.ListUtils;
import util.modelmapper.MapperUtils;
import util.page.PageResponseDto;
import util.page.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category/api")
public class CategoryApiController extends BaseApiController{

    @Autowired
    private CategoryBiz categoryBiz;

    /**
     * 查询列表
     * @return
     */
    @RequestMapping(value = "/serachList",method = RequestMethod.POST)
    public PageResponseDto<CategoryResponseDto> getCategoryList(HttpServletRequest request, CategoryRequestDto categoryRequestDto){
        PageResponseDto pageResponseDto= new PageResponseDto();
        Pageable pageable=new Pageable(categoryRequestDto.getPage()-1,categoryRequestDto.getRows());
        TCategoryResponseModel tCategoryResponseModel = categoryBiz.selectCategoryAll(pageable,MapperUtils.mapper(categoryRequestDto,CategoryRequestModel.class));
        pageResponseDto.setRows(MapperUtils.mapper(tCategoryResponseModel.getList(),CategoryResponseDto.class));
        pageResponseDto.setTotal(tCategoryResponseModel.getTotal());
        return pageResponseDto;
    }

    /**
     * 保存菜单
     * @param request
     * @return
     */
    @RequestMapping(value = "/saveCate",method = RequestMethod.POST)
    public ResponseBaseDto saveCate(HttpServletRequest request,@RequestBody  SaveAndEditCategoryDto categoryDto){
        LoginUserInfoModel login = getLogin(request);
        categoryBiz.saveCategory(MapperUtils.mapper(categoryDto, CategoryRequestModel.class),login);
        return new ResponseBaseDto();
    }

    /**
     * 查询一级分类
     * @return
     */
    @RequestMapping(value = "/getTCategoryParentInfo",method = RequestMethod.POST)
    public List<TCategoryParentResponseDto> getTCategoryParentInfo(){
        List<TCategoryParentResponseDto> list=new ArrayList<>();
        List<TCategoryParentResponseModel> tCategoryParentInfo = categoryBiz.getTCategoryParentInfo();
        if(ListUtils.isEmpty(tCategoryParentInfo)){
           return list;
        }
        return MapperUtils.mapper(tCategoryParentInfo,TCategoryParentResponseDto.class);
    }

    /**
     * 查看二级类别
     * @param request
     * @param requestDto
     * @return
     */
    @RequestMapping(value = "/getTCategoryById",method = RequestMethod.POST)
    public List<CategoryResponseDto> getTCategoryById(HttpServletRequest request, CategorySecondDto requestDto){
        TCategoryResponseModel tCategoryById = categoryBiz.getTCategoryById(MapperUtils.mapper(requestDto, DelCategoryRequestModel.class));
        if(ListUtils.isNotEmpty(tCategoryById.getList())){
            return  MapperUtils.mapper(tCategoryById.getList(),CategoryResponseDto.class);
        }else{
            return  MapperUtils.mapper(new ArrayList(),CategoryResponseDto.class);
        }
    }
}
