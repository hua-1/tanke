<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/5/20
  Time: 8:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>首页</title>
    <%@ include file="../common/shared.jsp" %>
</head>
<style>
    a {
        display: block
    }
</style>
<body>
<div class="easyui-layout" style="width:100%;height:100%;">
    <div data-options="region:'west',split:true" title="West" style="width:150px;">
        <div class="easyui-accordion" data-options="fit:true,border:false">
            <div title="用户管理"  style="overflow:auto;padding:10px;font-size: 20px">
                <a href="javascript:void(0)" class="linkButton" url="/authorityManage/userManage">用户管理</a>
                <a href="javascript:void(0)" class="linkButton" url="/authorityManage/menuManager">菜单管理</a>
                <a href="javascript:void(0)" class="linkButton" url="/authorityManage/roleManager">角色管理</a>
            </div>
            <div title="商品类别"tyle="padding:10px;">
                <a href="javascript:void(0)" class="linkButton" url="/category/index">商品类别</a>
            </div>
            <div title="发布商品"tyle="padding:10px;">
                <ul>
                    <li>商品发布</li>
                </ul>
            </div>
            <div title="订单管理" style="padding:10px">
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
    <!--中间-->
    <div data-options="region:'center'">
        <div id="tt" class="easyui-tabs" style=" height: 100%; width: 100%;border:none ">


        </div>

    </div>
</div>
<script>
    $(function () {
        //绑定单击选项卡事件
        $('.linkButton').click(function () {
            var text = $(this).text();
            var urlStr = $(this).attr("url");
            var isExt = $('#tt').tabs('exists', text);
            if (isExt)
            {
                $('#tt').tabs('select', text);
                return;
            }
            $('#tt').tabs('add', {
                title: text,
                content:ShowUrl(urlStr),
                closable: true
            });
        });

    });
    function ShowUrl(url) {
        var content = '<iframe src="' + url + '" height="100%" width="100%" />';
        return content;
    }
</script>
</body>
</html>
