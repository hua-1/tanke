<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/5/27
  Time: 9:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>角色管理</title>
    <link href="/statics/js/ztree/zTreeStyle.css" rel="stylesheet" type="text/css"/>

</head>
<%@ include file="../common/shared.jsp" %>
<body>
<div data-options="region:'center'" style="padding:10px;background-color: #EBF2F8;">
    <div class="easyui-panel-mod">
        <div class="easyui-panel easyui-panel-self" style='margin-bottom: 10px;padding:10px;'>
            <div class="group">
                <div class="inlineC">角色名称：</div>
                <div class="inlineC"><input style="width: 100px" class="easyui-textbox" id="roleName"
                                            name="roleName"/></div>
            </div>

            <div class="group">
                <div class="inlineD">

                    <a id="btnSearch" href="javascript:void(0)" style="width: 60px;" class="easyui-linkbutton"
                       data-options="iconCls:'icon-search'">查询</a>

                </div>
            </div>
        </div>
        <div id="role_grid_main_0">
            <div id="role_grid_main"></div>
        </div>
    </div>
</div>


<div id="add_role_dialog" class="easyui-dialog"
     data-options="modal:true,closed: true" style="text-align: center; padding-top: 20px;">
    <form id="form_add_role" method="post" data-options="novalidate:true">
        <input type="hidden" id="id" name="id">
        <table rules=all class="table_bg">
            <tr>
                <td>
                    <label for=""><span style="color: #ff0000">*</span>角色名称：</label>
                </td>
                <td>
                    <input type="text" name="roleName"
                           data-options="prompt:'请输入角色名称',required:true"
                           class="easyui-textbox"/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="txtApplication"><span style="color: #ff0000">*</span>所属应用：</label>
                </td>
                <td>

                    <select id="txtApplication" name="txtApplication" class="easyui-combobox" panelheight="auto"
                            style="width:150px;"
                            data-options="editable:false">
                        <option value="1">罐罐后台系统</option>

                    </select>
                    <input type="hidden" value="1" name="applicationId">
                </td>
            </tr>

            <tr>
                <td>
                    <label for="remark">备注：</label>
                </td>
                <td>
                    <input type="text" name="remark" id="remark"
                           class="easyui-textbox"
                           data-options="validType:['unempty','maxlength[200]'],multiline:true,height: 100,width:150"/>
                </td>
            </tr>

            <tr>
                <td>
                    <label><span style="color: #ff0000">*</span>状态：</label>
                </td>
                <td>
                    <input type="radio" value="1" checked="checked" name="enabled">启用 <input type="radio" name="enabled"
                                                                                             value="0"> 禁用
                </td>
            </tr>

            <tr>
                <td colspan="2">
                    <div class="zTreeDemoBackground left" title="选择权限" style="padding:0 15px;">
                        <ul id="currentApplicationRole" class="ztree" style="width: 100%;height:220px;"></ul>
                    </div>

                </td>
            </tr>

            <tr>
                <td colspan="2" style="text-align: center">
                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'"
                       style="padding: 5px 0px; margin-right: 30px;margin-top: 5px;" id="btnSaveUser">
                        <span style="font-size: 10px;">保存</span>
                    </a>
                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'"
                       style="padding: 5px 0px;" id="btnCancelUser">
                        <span style="font-size: 10px;">取消</span>
                    </a>
                </td>
            </tr>
        </table>
    </form>
</div>
</body>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/statics/js/business/role/role.handler.js"></script>
</html>
