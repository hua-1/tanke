package api.controller.permission;

import api.controller.baseController.BaseApiController;
import biz.permission.PermissionBiz;
import dto.permission.*;
import dto.response.ResponseBaseDto;
import entity.TPermission;
import model.permission.PermissionResponseModel;
import model.userinfo.LoginUserInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import util.modelmapper.MapperUtils;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/permission/api/")
public class PermissionApiController extends BaseApiController{

    @Autowired
    private PermissionBiz permissionBiz;

    /**
     * 查询列表
     * @return
     */
    @RequestMapping(value = "searchPormission",method = RequestMethod.POST)
    @ResponseBody
    public PermissionResponseDto getAll(){
        PermissionResponseDto permissionResponseDto= new PermissionResponseDto();
        PermissionResponseModel all = permissionBiz.getAll();
        permissionResponseDto.setRows(MapperUtils.mapper(all.getPermissionList(),PermissionDto.class));
        return permissionResponseDto;
    }

    /**
     * 保存
     * @param request
     * @param savePermissionRequestDto
     * @return
     */
    @RequestMapping(value = "savePermission",method = RequestMethod.POST)
    public ResponseBaseDto savePermission(HttpServletRequest request,@RequestBody SavePermissionRequestDto savePermissionRequestDto){
        LoginUserInfoModel login = getLogin(request);
        permissionBiz.savePermisson(MapperUtils.mapper(savePermissionRequestDto, TPermission.class), login);
        return new ResponseBaseDto();
    }

    /**
     * 查询
     * @param requestDto
     * @return
     */
    @RequestMapping(value = "getPermissionById", produces = "application/json; charset=utf-8", method = RequestMethod.POST)
    @ResponseBody
    public GetPermissionByIdResponseDto getPermissionById(@RequestBody GetPermissionByIdRequestDto requestDto) {
        TPermission tPermission = permissionBiz.getPermissionById(MapperUtils.mapper(requestDto, TPermission.class));
        if (null != tPermission) {
            GetPermissionByIdResponseDto responseDto = new GetPermissionByIdResponseDto();
            responseDto.setPermissionDto(MapperUtils.mapper(tPermission, PermissionDto.class));
            return responseDto;
        }
        return new GetPermissionByIdResponseDto();
    }
}
