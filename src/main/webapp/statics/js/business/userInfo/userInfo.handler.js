$(function () {
    new logistics.userInfo.mainPanel().initPanel();
})
$.namespace('logistics.userInfo');
$.define('logistics.userInfo.searchPanel', {
    initPanel: function () {
        var me = this;
        $('#btnSearch').click(function () {
            $(me).trigger('userSearchEvent', me.getParams());
        });
    },
    getParams: function (type) {
        return {
            userName: $('#userName').textbox("getValue").trim(),
        }
    }
});


$.define('logistics.userInfo.gridPanel', {
    gridPanelObj: null,
    me: null,
    initPanel: function (defParams) {
        this.me = this;
        var me = this;
        this.initGrid(defParams);
        this.initTreeGrid();
        $("#btnSaveUser").click(function () {
            me.saveUser();
        });
        $("#btnCancelUser").click(function () {
            me.cancelUser();
        });
        $("#user_grid_main_0").on("click", ".edit_user", function () {
            me.editUser($(this).attr("user_id"), me);
        });
    },
    initGrid: function (defParams) {
        var me = this;
        this.gridPanelObj = $("#user_grid_main");
        this.gridPanelObj.euiDataGrid({
            url: '/userinfo/api/searchList',
            method: "post",
            queryParams: {},
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            frozenColumns: [[
                {field: 'ck', checkbox: true},
                {
                    field: 'id', title: "操作", width: 150, align: 'center', formatter: function (val, row) {
                    var html = "",
                    html = "<a class='disable_user' user_id='" + row.id + "'>禁用</a>" +
                        "&nbsp;&nbsp;&nbsp;<a class='enable_user' user_id='" + row.id + "' '>启用</a>" +
                        "&nbsp;&nbsp;&nbsp;<a class='del_user' user_id='" + row.id + "' '>删除</a>" +
                        "&nbsp;&nbsp;&nbsp;<a class='edit_user' user_id='" + row.id + "' '>编辑</a>";
                    return html;
                }
                }
            ]],
            columns: [[
                {field: 'userName', title: "用户名称", width: 150, editor: "text", align: "center",},
                {field: 'userAccount', title: "用户账号", width: 150, editor: "text", align: "center",},
                {field: 'mobilePhone', title: "手机号码", width: 150, editor: "text", align: "center",},
                {field: 'telephone', title: "座机", width: 150, editor: "text", align: "center",},
                {
                    field: 'enabled', title: "状态", width: 150, editor: "text", align: "center",
                    formatter: function (val, row) {
                        return val == "1" ? "正常" : "禁用";
                    }
                },
                {field: 'createdBy', title: "创建人", width: 150, editor: "text", align: "center",},
                {
                    field: 'createdTime',
                    title: "创建时间",
                    width: 150,
                    editor: "text",
                    align: "center",
                    formatter: function (val, rec) {
                        if (!logistics.utils.validation.isEmptyWithType(val)) {
                            return logistics.utils.timeFormatConversion.formatTime(val, "yyyy-MM-dd hh:mm:ss");
                        }
                    }
                }
            ]],
            toolbar: [{
                text: '添加用户',
                iconCls: 'icon-add',
                handler: function () {
                    me.addUser();
                }
            }, '-', {
                text: '禁用',
                iconCls: 'icon-cancel',
                handler: function () {
                    var rows = me.gridPanelObj.datagrid('getChecked');
                    me.enabledUserInfo(logistics.utils.constants.integerconstant.INTEGER_ZERO, rows);
                }
            }, '-', {
                text: '启用',
                iconCls: 'icon-ok',
                handler: function () {
                    var rows = me.gridPanelObj.datagrid('getChecked');
                    me.enabledUserInfo(logistics.utils.constants.integerconstant.INTEGER_ONE, rows);
                }
            }, '-', {
                text: '删除',
                iconCls: 'icon-remove',
                handler: function () {
                    $.messager.confirm("操作提示", "真的要删除吗？", function (data) {
                        if (data) {
                            var rows = me.gridPanelObj.datagrid('getChecked');
                            me.delUserInfo(rows);
                        }

                    });
                }
            }]
        });
    },
    load: function (params) {
        this.me.gridPanelObj.datagrid('load', params);
    },
    addUser: function () {
        this.me.forReset("form_add_user");
        $("#txtUserAccount").textbox("readonly", false);
        this.me.userDialog("添加用户", null);
    },
    editUser: function (userid, me) {
        $.ajax({
            type: "POST",
            url: "/role/api/getUserRole",
            data: JSON.stringify({userId: userid}),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                    me.forReset("form_add_user");
                    me.userDialog("编辑用户", data.userId);
                    $('#form_add_user').form('load', data);
                    $("#txtUserAccount").textbox("readonly", true);
                    var roleStr = new Array();
                    for (var i = 0; i < data.list.length; i++) {
                        roleStr.push(data.list[i].roleId);
                    }
                    $("#cmbUserRole").combotree("setValues", roleStr)
            }
        });
    },
    /**
     * @param status 禁用，1启用
     */
    enabledUserInfo: function (status, rows) {
        var me = this;
        if (logistics.utils.validation.isEmptyWithType(rows)) {
            logistics.utils.msgs.getMsg("信息", "请选择要操作的数据!");
            return;
        }
        var arry = new Array();
        $.each(rows, function (i, v) {
            arry.push(v.id);
        });
        $.post("/userInfo/api/updateUserInfoStatus", {"userIds": arry.join(","), "enabled": status},
            function (data) {
                $.messager.alert('信息', data.message, 'info');
                if (data.success == "1") {
                    me.gridPanelObj.datagrid('reload');
                }
            }
        );
    },
    userDialog: function (title, userid) {
        $('#add_user_dialog').dialog({
            title: title,
            width: 400,
            height: 350,
            closed: false,
            cache: false,
            modal: true,
            zindex: 9001,
            top: ($(window).height() - 350) * 0.5,
            left: ($(window).width() - 400) * 0.5
        }).attr("user_id", userid);
    },
    delUserInfo: function (rows) {
        var me = this;
        if (logistics.utils.validation.isEmptyWithType(rows)) {
            logistics.utils.msgs.getMsg("信息", "请选择要操作的数据!");
            return;
        }
        var arry = new Array();
        $.each(rows, function (i, v) {
            arry.push(v.id);
        });
        $.post("/userInfo/api/deleteUserInfo", {"userIds": arry.join(",")},
            function (data) {
                $.messager.alert('信息', data.message, 'info');
                if (data.success == "1") {
                    me.gridPanelObj.datagrid('reload');
                }
            });
    },
    saveUser: function () {
        var me = this.me;
        if (me.verify("form_add_user")) {
            $.ajax({
                type: "POST",
                url: "/userinfo/api/saveUser",
                data: JSON.stringify(this.me.getParam()),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.success == "1") {
                        me.cancelUser();
                        me.gridPanelObj.datagrid('reload');
                    } else {
                        logistics.utils.msgs.getMsg("信息", data.message);
                        return false;
                    }
                }
            });

        }
    },
    cancelUser: function () {
        this.me.formClose("add_user_dialog");
        this.me.forReset("form_add_user");
    },
    formClose: function (ele) {
        $('#' + ele).dialog({closed: true});
    },
    forReset: function (fele) {
        $('#' + fele).form('reset');
    },

    verify: function (fele) {
        if (!$("#" + fele).form('enableValidation').form('validate')) {
            return false;
        } else {
            return true;
        }
    },
    getParam: function () {
        var enabled = $("[name='enabled']:checked").val();
        return {
            userName: $("#txtUserName").textbox("getValue"),
            userAccount: $("#txtUserAccount").textbox("getValue"),
            password: $("#txtUserPassword").textbox("getValue"),
            mobilePhone: $("#txtMobilePhone").textbox("getValue"),
            telephone: $("#txtTelephone").textbox("getValue"),
            roleIds: $("#cmbUserRole").combotree("getValues").join(","),
            enabled: enabled,
            id: $('#add_user_dialog').attr("user_id")
        };


    },
    initTreeGrid: function () {
        debugger
        $('#cmbUserRole').combotree({
            url: '/role/api/getRoleByUserInfo',
            required: true,
            valueField: 'id',
            textField: 'text',
            multiple: true,
            checkbox: true,
            cascadeCheck: true,
            onlyLeafCheck: true,
            width: "100%"
        });
    },

});
$.define('logistics.userInfo.mainPanel', {
    searchPanel: new logistics.userInfo.searchPanel(),
    gridPanel: new logistics.userInfo.gridPanel(),
    initPanel: function () {
        var me = this;
        this.searchPanel.initPanel();
        this.gridPanel.initPanel(this.searchPanel.getParams());
        $(this.searchPanel).bind('userSearchEvent', function () {
            me.search();
        });
    },
    search: function () {
        this.gridPanel.load(this.searchPanel.getParams());
    }
});