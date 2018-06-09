<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/6/5
  Time: 22:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>类别</title>
</head>
<%@ include file="../common/shared.jsp" %>
<body>
<div data-options="region:'center'" style="padding:10px;background-color: #EBF2F8;">
    <div class="easyui-panel-mod">
        <div class="easyui-panel easyui-panel-self" style='margin-bottom: 10px;padding:10px;'>
            <div class="group">
                <div class="inlineC">菜单名称：</div>
                <div class="inlineC"><input style="width: 100px" class="easyui-textbox" id="cataName"
                                            name="userName"/></div>
            </div>
            <div class="group">
                <div class="inlineD">
                    <a id="btnSearch" href="javascript:void(0)" style="width: 60px;" class="easyui-linkbutton"
                       data-options="iconCls:'icon-search'">查询</a>
                </div>
            </div>
        </div>
        <div id="category_grid_main_0">
            <div id="category_grid_main"></div>
        </div>
    </div>
</div>
<div id="add_cate_dialog" class="easyui-dialog"data-options="modal:true,closed: true" style="text-align: center; padding-top: 20px;">
    <form id="form_cate_user" method="post" data-options="novalidate:true">
        <input type="hidden" id="id" name="id">
        <table rules=all class="table_bg">
            <tr>
                <td>
                    <label for="parentName"><span style="color: #ff0000">*</span>一级分类：</label>
                </td>
                <td colspan="3">
                    <input type="text" name="parentName"   data-options="prompt:'请输入一级分类名字',required:true,editable:false,"
                           id="parentName" class="easyui-combobox"/>
                </td>
            </tr>

            <tr>
                <td>
                    <label for="catagoryName"><span style="color: #ff0000">*</span>二级菜单：</label>
                </td>
                <td>
                    <input type="text" id="catagoryName" name="catagoryName"
                           data-options="prompt:'请输入二级菜单',required:true"
                           class="easyui-textbox"/>
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
<script src="${pageContext.request.contextPath}/statics/js/business/category/category.handler.js"></script>
</html>
