package api.controller.trolePermissionApiController;

import biz.tRolePermissionBiz.TRolePermissionBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TrolePermissionApiController {

    @Autowired
    private TRolePermissionBiz rolePermissionBiz;
}
