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
    <title>菜单管理</title>
    <link href="/statics/js/ztree/zTreeStyle.css" rel="stylesheet" type="text/css"/>

</head>
<%@ include file="../common/shared.jsp" %>
<body>
<table id="permission_treegrid_main"></table>


<div id="add_permission_dialog" class="easyui-dialog"
     data-options="modal:true,closed: true" style="text-align: center; padding-top: 20px;">
    <form id="form_permission_user" method="post" data-options="novalidate:true">
        <table rules=all class="table_bg">

            <tr index="1">
                <td>
                    <label for="permissionType"><span style="color: #ff0000">*</span>菜单类型：</label>
                </td>
                <td>

                    <select id="permissionType" name="permissionType" class="easyui-combobox" panelheight="auto"
                            style="width:150px;"
                            data-options="editable:false">
                        <option value="">--请选择--</option>
                        <option value="3">主菜单</option>
                        <option value="1">链接菜单</option>
                        <option value="2">功能点</option>
                    </select>

                </td>
            </tr>
            <tr index="2">
                <td>
                    <label for="permissionName"><span style="color: #ff0000">*</span>菜单名称：</label>
                </td>
                <td>
                    <input type="text" id="permissionName" name="permissionName"
                           data-options="prompt:'请输入菜单名称'"
                           class="easyui-textbox"/>
                </td>
            </tr>
            <tr index="3">
                <td>
                    <label for="menuUrl"><span style="color: #ff0000">*</span>链接菜单：</label>
                </td>
                <td>
                    <input type="text" id="menuUrl" name="menuUrl"
                           data-options="prompt:'请输入链接菜单'"
                           class="easyui-textbox"/>
                </td>
            </tr>
            <tr index="4">
                <td>
                    <label for="permissionCode"><span style="color: #ff0000">*</span>菜单编号：</label>
                </td>
                <td>
                    <input type="text" id="permissionCode" name="permissionCode"
                           class="easyui-textbox"/>
                </td>
            </tr>

            <tr index="5">
                <td>
                    <label for="permissionSort"><span style="color: #ff0000"></span>排序：</label>
                </td>
                <td>
                    <input type="text" id="permissionSort" name="permissionSort"
                           data-options="prompt:'请输入排序'"
                           class="easyui-textbox"/>
                </td>
            </tr>
            <tr index="6">
                <td>
                    <label><span style="color: #ff0000">*</span>状态：</label>
                </td>
                <td>
                    <input type="radio" value="1" checked="checked" name="enabled">启用 <input type="radio"
                                                                                             name="enabled"
                                                                                             value="0"> 禁用
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center">
                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'"
                       style="padding: 5px 0px; margin-right: 30px;margin-top: 5px;" id="btnSavePermission">
                        <span style="font-size: 10px;">保存</span>
                    </a>
                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'"
                       style="padding: 5px 0px;" id="btnCancelPermission">
                        <span style="font-size: 10px;">取消</span>
                    </a>
                </td>
            </tr>
        </table>
    </form>
</div>
</body>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/statics/js/business/permission/permission.hander.js"></script>
</html>
