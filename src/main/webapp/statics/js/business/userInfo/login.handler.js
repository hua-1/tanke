$(function () {
    new logistics.userInfo.login.mainPanel().initPanel();
});
$.namespace('logistics.userInfo.login');

$.define('logistics.userInfo.login.mainPanel', {
    initPanel: function () {
        var me = this;
        $("#btnLogin").click(function () {
            if (me.loginValidation()) {
                me.login();
            }
        });
    },
    login: function () {

        $.ajax({
            type: "post",
            url: "/userinfo/api/login",
            data: JSON.stringify({"userName": $("#userName").val(), "password": $("#userPaw").val()}),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.success != "1") {
                    $("#alertTxtId").text(data.message);
                    return;
                }
                else {
                    window.location.href = "/home/index";
                }
            },
            error: function () {
                $("#alertTxtId").text("请求失败，请刷新后再试!");
                return;
            }
        });
    },
    loginValidation: function () {
        if (logistics.utils.validation.isEmptyWithType($("#userName").val())) {
            $("#alertTxtId").text("用户名不能为空!");
            return false;
        }
        if (logistics.utils.validation.isEmptyWithType($("#userPaw").val())) {
            $("#alertTxtId").text("用户密码不能为空!");
            return false;
        }
        return true;
    }

});