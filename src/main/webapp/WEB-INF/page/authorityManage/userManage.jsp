<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/5/20
  Time: 19:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户管理</title>
</head>
<%@ include file="../common/shared.jsp" %>
<body>
<div data-options="region:'center'" style="padding:10px;background-color: #EBF2F8;">
    <div class="easyui-panel-mod">
        <div class="easyui-panel easyui-panel-self" style='margin-bottom: 10px;padding:10px;'>
            <div class="group">
                <div class="inlineC">用户名称：</div>
                <div class="inlineC"><input style="width: 100px" class="easyui-textbox" id="userName"
                                            name="userName"/></div>
            </div>
            <div class="group">
                <div class="inlineD">
                    <a id="btnSearch" href="javascript:void(0)" style="width: 60px;" class="easyui-linkbutton"
                       data-options="iconCls:'icon-search'">查询</a>
                </div>
            </div>
        </div>
        <div id="user_grid_main_0">
            <div id="user_grid_main"></div>
        </div>
    </div>
</div>

<div id="add_user_dialog" class="easyui-dialog"
     data-options="modal:true,closed: true" style="text-align: center; padding-top: 20px;">
    <form id="form_add_user" method="post" data-options="novalidate:true">

        <table rules=all class="table_bg">
            <tr>
                <td>
                    <label for="txtUserName"><span style="color: #ff0000">*</span>用户名称：</label>
                </td>
                <td>
                    <input type="text" id="txtUserName" name="userName"
                           data-options="prompt:'请输入用户名称',required:true,validType:'name'"
                           class="easyui-textbox"/>
                </td>
            </tr>

            <tr>
                <td>
                    <label for="txtUserAccount"><span style="color: #ff0000">*</span>用户账号：</label>
                </td>
                <td>
                    <input type="text" id="txtUserAccount" name="userAccount"
                           data-options="prompt:'请输入用户账号',required:true,validType:'username'"
                           class="easyui-textbox"/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="txtUserPassword"><span style="color: #ff0000">*</span>用户密码：</label>
                </td>
                <td>
                    <input type="text" id="txtUserPassword" name="password"
                           data-options="prompt:'请输入用户密码',required:true,validType:'unnormal'"
                           class="easyui-textbox"/>
                </td>
            </tr>

            <tr>
                <td>
                    <label for="txtMobilePhone"><span style="color: #ff0000">*</span>手机号码：</label>
                </td>
                <td>
                    <input type="text" id="txtMobilePhone" name="mobilePhone"
                           data-options="prompt:'请输入用户手机号码',required:true,validType:'mobile'"
                           class="easyui-textbox"/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="txtTelephone"><span style="color: #ff0000"></span>座机：</label>
                </td>
                <td>
                    <input type="text" data-options="prompt:'请输入用户座机号码',validType:'phone'"
                           id="txtTelephone" name="telephone" class="easyui-textbox"/>
                </td>
            </tr>
            <tr>
                <td>
                    <label for="cmbUserRole">用户角色</label>
                </td>
                <td colspan="3">
                    <input type="text" name="roleName" id="cmbUserRole" class="easyui-combobox"/>
                </td>

            </tr>

            <tr>
                <td>
                    <label><span style="color: #ff0000">*</span>状态：</label>
                </td>
                <td>
                    <input type="radio" value="1" checked="checked" name="enabled">启用 <input type="radio" name="enabled" value="0"> 禁用
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
        src="${pageContext.request.contextPath}/statics/js/business/userInfo/userInfo.handler.js"></script>
</html>
