<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>后台</title>
</head>
<%@ include file="../common/shared.jsp" %>
<link href="${pageContext.request.contextPath}/statics/css/login.css" rel="stylesheet"/>

<body>
<div class="login">
    <h2>交易工作台</h2>

    <div class="user">
        <input type="text" autocomplete="off" id="userName" tabindex="1" class="user_icon"
               placeholder="请输入用户名"/>
    </div>
    <div class="password">
        <input type="password" autocomplete="off" id="userPaw" tabindex="2" class="password_icon"
               placeholder="请输入密码"/>
    </div>
    <div class="btn">
        <input type="button" name="name" id="btnLogin" value="登录"/>
    </div>
    <span style="margin-left:70px;margin-top:10px; color: red; position: absolute; z-index: 1002; overflow: auto; "
          id="alertTxtId"></span>
</div>
</body>
<script type="text/javascript"
        src='${pageContext.request.contextPath}/statics/js/business/userInfo/login.handler.js'></script>
</html>
