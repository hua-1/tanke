package api.controller.userInfo;

import api.controller.baseController.BaseApiController;
import biz.userRole.UserInfoRoleBiz;
import dto.response.ResponseBaseDto;
import dto.role.SaveRoleTreeRequestDto;
import dto.role.UserApplicationTreeDto;
import dto.role.UserRoleRequestDto;
import dto.role.UserRoleResponseDto;
import dto.userinfo.RoleRequestDto;
import dto.userinfo.RoleResponseDto;
import model.role.RoleRequestModel;
import model.role.RoleResponseModel;
import model.role.SaveRoleTreeRequestModel;
import model.role.UserApplicationTreeModel;
import model.userRole.UserRoleRequestModel;
import model.userRole.UserRoleResponseModel;
import model.userinfo.LoginUserInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import util.modelmapper.MapperUtils;
import util.page.PageResponseDto;
import util.page.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/role/api/")
public class UserInfoRoleApiController extends BaseApiController{
    @Autowired
    private UserInfoRoleBiz userInfoRoleBiz;



    @RequestMapping(value = "searchList",method = RequestMethod.POST)
    public PageResponseDto<RoleResponseDto> searchList(RoleRequestDto roleRequestDto, HttpServletRequest request){
        PageResponseDto pageResponseDto= new PageResponseDto();
        Pageable pageable = new Pageable(roleRequestDto.getPage() - 1, roleRequestDto.getRows());
        RoleResponseModel roleResponseModel = userInfoRoleBiz.searchRoleList(pageable, MapperUtils.mapper(roleRequestDto, RoleRequestModel.class));
        pageResponseDto.setRows( MapperUtils.mapper(roleResponseModel.getList(), RoleResponseDto.class));
        pageResponseDto.setTotal(roleResponseModel.getTotal());
        return  pageResponseDto;
    }

    @RequestMapping(value = "getRoleByUserInfo",method = RequestMethod.POST)
    public List<UserApplicationTreeDto> getRoleByUserInfo(RoleRequestDto roleRequestDto, HttpServletRequest request){
        List<UserApplicationTreeModel> roleByUserInfo = userInfoRoleBiz.getRoleByUserInfo();
        List<UserApplicationTreeDto> mapper = MapperUtils.mapper(roleByUserInfo, UserApplicationTreeDto.class);
        return mapper;
    }

    /**
     * 根据用户ID获取信息
     * @param request
     * @param userRoleRequestDto
     * @return
     */
    @RequestMapping(value = "getUserRole",method = RequestMethod.POST)
    @ResponseBody
    public UserRoleResponseDto getUserRole(HttpServletRequest request, @RequestBody  UserRoleRequestDto userRoleRequestDto){
        UserRoleResponseModel userRoleInfo = userInfoRoleBiz.getUserRoleInfo(MapperUtils.mapper(userRoleRequestDto, UserRoleRequestModel.class));
     return    MapperUtils.mapper(userRoleInfo,UserRoleResponseDto.class);
    }

    /**
     * 保存角色和菜单
     * @param saveRoleTreeRequestDto
     * @param httpServletRequest
     * @return
     */
    @RequestMapping(value = "/saveRoleTree", produces = "application/json; charset=utf-8", method = {RequestMethod.POST})
    @ResponseBody
    public ResponseBaseDto saveRoleTree(SaveRoleTreeRequestDto saveRoleTreeRequestDto, HttpServletRequest httpServletRequest) {
        LoginUserInfoModel login = getLogin(httpServletRequest);
        userInfoRoleBiz.saveRoleTree(MapperUtils.mapperNoDefault(saveRoleTreeRequestDto, SaveRoleTreeRequestModel.class), login.getUserName());
        return new ResponseBaseDto();
    }
}
