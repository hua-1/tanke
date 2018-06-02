$(function () {
    new logistics.role.mainPanel().initPanel();
})
$.namespace('logistics.role');

$.define('logistics.role.searchPanel', {
    initPanel: function () {
        var me = this;
        me.initButtonClick(me);

    },
    getParams: function (type) {
        return {
            roleName: $('#roleName').textbox("getValue").trim(),
        }
    },
    initButtonClick: function (me) {
        $('#btnSearch').click(function () {
            $(me).trigger('roleSearchEvent', me.getParams());
        });
    },

});
$.define('logistics.role.gridPanel', {
    gridPanelObj: null,
    me: null,
    initPanel: function (defParams) {
        this.me = this;
        var me = this;
        this.initGrid(defParams);
        $("#btnSaveRole").click(function () {
            me.saveRole();
        });
        $("#btnCancelRole").click(function () {
            me.cancelRole();
        });

        $("#role_grid_main_0").on("click", ".edit_role", function () {
            me.editRole($(this).attr("roleId"));
        });
        $("#role_grid_main_0").on("click", ".delete_role", function () {
            me.deleteRole($(this).attr("roleId"), me);
        });

        $("#btnSaveUser").click(function () {
            $('#form_add_role').submit();
        });
        $("#btnCancelUser").click(function () {
            me.closeForm();
        });

        $('#form_add_role').form({
            url: '/role/api/saveRoleTree',
            onSubmit: function (param) {
                // do some check
                //todo:
                param.permissionIdArr = me.getCheckValue();
                // return false to prevent submit;
                return $(this).form('enableValidation').form('validate');
            },
            success: function (json) {

                var data = $.parseJSON(json);
                $.messager.alert('信息', data.message, 'info');
                if (data.success == "1") {
                    me.closeForm();
                    me.gridPanelObj.datagrid('reload');
                }
            }
        });

    },
    filter: function (node) {   //过滤器直选中1级节点累加
        return (node.level > 0 && node.checked == true);
    },
    getCheckValue: function () {
        var zTreeO = $.fn.zTree.getZTreeObj("currentApplicationRole").getNodesByFilter(this.filter);
        var idListStr = "";
        for (var i = 0; i < zTreeO.length; i++) {
            if (zTreeO[i].permissionId != null) {
                idListStr += (i == (zTreeO.length - 1)) ? zTreeO[i].permissionId : zTreeO[i].permissionId + ",";
            }
        }
        ;
        return idListStr;

    },
    closeForm: function () {
        $('#add_role_dialog').dialog({closed: true});
        $('#form_add_role').form('reset');
    },
    initGrid: function (defParams) {
        var me = this;
        this.gridPanelObj = $("#role_grid_main");
        this.gridPanelObj.euiDataGrid({
            url: '/role/api/searchList',
            method: "post",
            queryParams: defParams,
            frozenColumns: [[
                {
                    field: 'id', title: "操作", width: 150, align: 'center', formatter: function (val, row) {
                    var html = "", handleStatus = parseInt(row.handleStatus);

                    html = "<a class='delete_role' roleId='" + row.id + "'>删除</a>" +

                        "&nbsp;&nbsp;&nbsp;<a class='edit_role' roleId='" + row.id + "' '>编辑</a>";
                    return html;
                }
                }
            ]],
            columns: [[
                {field: 'roleName', title: "角色名称", width: 150, editor: "text", align: "center",},
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
                text: '添加角色',
                iconCls: 'icon-add',
                handler: function () {
                    me.addRole();
                }
            }]
        });
    },
    load: function (params) {
        this.me.gridPanelObj.datagrid('load', params);
    },
    addRole: function () {
        this.me.addRoleDialog();
    },
    editRole: function (roleId) {
        this.me.editRoleDialog(roleId);
    },
    deleteRole: function (roleId, me) {
        $.messager.confirm("操作提示", "真的要删除吗？", function (data) {
            if (data) {
                $.post("/role/api/delRoleByRoleId", {"roleId": roleId},
                    function (data) {
                        $.messager.alert('信息', data.message, 'info');
                        if (data.success == "1") {
                            me.gridPanelObj.datagrid('reload');
                        }
                    }
                );
            }
        });

    },
    editRoleDialog: function (roleId) {
        var me = this.me;
        $('#form_add_role').form('reset');
        $.post("/role/api/getRoleByRoleId", {"roleId": roleId},
            function (data) {
                if (!$.isEmptyObject(data)) {
                    $('#form_add_role').form('load', data);
                    $('#add_role_dialog').dialog({
                        title: "编辑角色",
                        width: 350,
                        height: 560,
                        closed: false,
                        cache: false,
                        modal: true,
                        zindex: 9001,
                        top: ($(window).height() - 560) * 0.5,
                        left: ($(window).width() - 350) * 0.5
                    });
                    me.initRolePermissionTree($("#txtApplication").combobox("getValue"), data.permissionList);
                } else {
                    $.messager.alert('信息', "未选中行", 'info');
                }
            }
        );
    },
    addRoleDialog: function () {
        $('#add_role_dialog').dialog({
            title: "添加权限",
            width: 350,
            height: 560,
            closed: false,
            cache: false,
            modal: true,
            zindex: 9001,
            top: ($(window).height() - 560) * 0.5,
            left: ($(window).width() - 350) * 0.5
        });
        this.me.initRolePermissionTree($("#txtApplication").combobox("getValue"));
        $('#form_add_role').form('reset');
        $("#id").val("0");
    },
    initRolePermissionTree: function (applicationId, permissionList) {
        var me = this;
        var setting = {
            data: {
                simpleData: {
                    enable: true
                }
            },
            view: {
                dblClickExpand: false
            },
            check: {
                enable: true,
                autoCheckTrigger: true,
                chkboxType: {"Y": "ps", "N": "s"}
            },
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false

            },
            async: {
                enable: true
            }
        };

        $.post("/permission/api/getPermissionListByAppId", {"applicationId": applicationId},
            function (data) {
                if (!$.isEmptyObject(data)) {
                    $.fn.zTree.init($("#currentApplicationRole"), setting, data);
                    if (permissionList != null && permissionList.length > 0) {
                        me.setTreeNodeCheck(permissionList);
                    }

                } else {
                    $.messager.alert('信息', "无查询数据", 'info');
                }
            }
        );

    },
    setTreeNodeCheck: function (permissionList) {
        var treeObj = $.fn.zTree.getZTreeObj("currentApplicationRole");
        treeObj.expandAll(true);
        var node = treeObj.getNodes();
        var nodes = treeObj.transformToArray(node);
        for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < permissionList.length; j++) {
                if (permissionList[j].currentPermission == nodes[i].permissionId) {
                    //nodes[i].checked = true;
                    treeObj.checkNode(nodes[i], true, false, false);
                }
            }
        }

    },
    saveUser: function () {
        if (this.me.verify("form_add_user")) {
            $.ajax({
                type: "POST",
                url: "/userInfo/api/saveUser",
                data: JSON.stringify(this.me.getParam()),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.success == logistics.utils.constant.returnInfo.SUCCESS) {
                        this.me.gridPanelObj.datagrid('reload');
                    } else {
                        logistics.utils.msgs.getMsg("信息", data.message);
                        return false;
                    }
                }
            });
        }
    },
    cancelUser: function () {
        this.me.formClose("add_user_dialog", "form_add_user");
    },
    formClose: function (ele, fele) {
        $('#' + ele).dialog({closed: true});
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
            enabled: enabled
        };
    }
});


$.define('logistics.role.mainPanel', {
    searchPanel: new logistics.role.searchPanel(),
    gridPanel: new logistics.role.gridPanel(),
    initPanel: function () {
        var me = this;
        this.searchPanel.initPanel();
        this.gridPanel.initPanel(this.searchPanel.getParams());
        $(this.searchPanel).bind('roleSearchEvent', function () {
            me.search();
        });
    },
    search: function () {
        this.gridPanel.load(this.searchPanel.getParams());
    }
});