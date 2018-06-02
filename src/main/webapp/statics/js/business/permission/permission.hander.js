
$(function () {
    new logistics.permission.mainPanel().initPanel();
});
$.namespace('logistics.permission');
$.define('logistics.permission.mainPanel', {
    treegridPanelObj: null,
    me: null,
    initPanel: function () {
        this.me = this;
        this.me.initTreegrid();
        this.me.initEvent();
    },
    initTreegrid: function () {
        var me = this.me;
        this.me.treegridPanelObj = $("#permission_treegrid_main");
        this.me.treegridPanelObj.treegrid({
            url: '/permission/api/searchPormission',
            method: 'post',          //请求方式
            idField: 'id',           //定义标识树节点的键名字段
            treeField: 'permissionName',       //定义树节点的字段
            fit: true,               //网格自动撑满
            fitColumns: true,        //设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            columns: [[
                {field: 'permissionName', title: '名称', width: 100},
                {field: 'menuUrl', title: '地址', width: 100},
                {field: 'permissionCode', title: '编码', width: 100},
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
                text: '添加',
                iconCls: 'icon-add',
                handler: function () {
                    me.addTreegrid();
                }
            }, '-', {
                text: '修改',
                iconCls: 'icon-edit',
                handler: function () {
                    me.editTreegrid();
                }
            }, '-', {
                text: '删除',
                iconCls: 'icon-remove',
                handler: function () {
                    me.delTreegrid(me);
                }
            }],
            loadFilter: function (data) {
                $.each(data.rows, function (i) {
                    var parentId = data.rows[i].parentId;
                    if (parentId != "0") {
                        data.rows[i]._parentId = parentId;
                    }
                });
                data.total = data.rows.length;
                return data;
            },
        });
    }
    ,
    initEvent: function () {
        var me = this;
        $("#permissionType").combobox({
            onChange: function (n, o) {
                me.loadText(n);
            }
        });
        $("#btnSavePermission").click(function () {
            if (me.validation($('#add_permission_dialog').attr("type"))) {
                me.savePermission(me);
            }
        });
        $("#btnCancelPermission").click(function () {
            me.formClose("add_permission_dialog", "form_permission_user");
        });
    },
    savePermission: function (me) {
        $.ajax({
            type: "POST",
            url: "/permission/api/savePermission",
            data: JSON.stringify(me.getParam()),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.success == logistics.utils.constants.returnState.SUCCEED) {
                    me.treegridPanelObj.treegrid('reload');
                    me.formClose("add_permission_dialog", "form_permission_user");
                } else {
                    logistics.utils.msgs.getMsg("信息", data.message);
                    return false;
                }
            }
        });
    },
    addTreegrid: function () {
        this.me.loadText(0);
        this.me.permissionDialog("添加菜单", "add");
    },
    loadText: function (n) {
        if (n == 3) {
            $("tr[index='3']").hide();

        } else if (n == 2) {
            $("tr[index='3']").hide();
        }
        else if (n == 1) {
            $("tr[index='3']").show();
        } else {
            $("tr[index='3']").show();
        }
    },
    delPermission: function (row, me) {
        $.ajax({
            type: "POST",
            url: "/permission/api/delPermission",
            data: JSON.stringify({id: row.id}),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.success == logistics.utils.constants.returnState.SUCCEED) {
                    me.treegridPanelObj.treegrid('reload');
                    me.formClose("add_permission_dialog", "form_permission_user");
                } else {
                    logistics.utils.msgs.getMsg("信息", data.message);
                    return false;
                }
            }
        });
    },
    delTreegrid: function (me) {
        var row = this.treegridPanelObj.treegrid("getSelected");
        if (logistics.utils.validation.isEmptyWithType(row)) {
            logistics.utils.msgs.getMsg("信息", "请选择一行进行操作!");
            return;
        }
        $.messager.confirm("操作提示", "真的要删除吗？", function (data) {
            if (data) {
                me.delPermission(row, me);
            }
        });
    }
    ,
    editTreegrid: function () {
        this.me.permissionDialog("修改菜单", "update");
        this.me.loadPermission(this.me);
    },
    loadPermission: function (me) {
        $.ajax({
            type: "POST",
            url: "/permission/api/getPermissionById",
            data: JSON.stringify({id: $('#add_permission_dialog').attr("permission_id")}),
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                debugger
                var permissionDto = data.permissionDto;
                if (!logistics.utils.validation.isEmptyWithType(permissionDto)) {
                    $("#form_permission_user").formExt('load', permissionDto);
                    me.loadText(permissionDto.permissionType);
                    //  $("#permissionType").combobox({disabled: true}).combobox("setValue",permissionDto.permissionType);
                }
            }
        });
    },
    getParam: function () {
        var enabled = $("[name='enabled']:checked").val(), parentId, permissionType;
        if ($("#permissionType").combobox("getValue") == "3") {
            parentId = 0;
            permissionType = 1;
        } else {
            parentId = $('#add_permission_dialog').attr("parent_id");
            permissionType = $("#permissionType").combobox("getValue");
        }
        return {
            id: $('#add_permission_dialog').attr("permission_id"),
            permissionType: permissionType,
            permissionName: $("#permissionName").textbox("getValue"),
            menuUrl: $("#menuUrl").textbox("getValue"),
            permissionCode: $("#permissionCode").textbox("getValue"),
            permissionSort: $("#permissionSort").textbox("getValue"),
            enabled: enabled,
            parentId: parentId
        };
    },
    permissionDialog: function (title, type) {
        $('#form_permission_user').form('reset');
        var row = this.me.treegridPanelObj.treegrid("getSelected");
        $('#add_permission_dialog').dialog({
            title: title,
            width: 400,
            height: 300,
            closed: false,
            cache: false,
            modal: true,
            zindex: 9001,
            top: ($(window).height() - 260) * 0.5,
            left: ($(window).width() - 400) * 0.5
        }).attr("parent_id", type == "update" ? null : row.id).attr("permission_id", type == "add" ? null : row.id).attr("type", type);
    },
    validation: function (type) {
        if (logistics.utils.validation.isEmptyWithType($("#permissionType").combobox("getValue"))) {
            logistics.utils.msgs.getMsg('信息', '请选择菜单类型');
            return false;
        }
        if (logistics.utils.validation.isEmptyWithType($("#permissionName").textbox("getValue"))) {
            logistics.utils.msgs.getMsg('信息', '请输入菜单名称');
            return false;
        }
        if (logistics.utils.validation.isEmptyWithType($("#permissionCode").textbox("getValue"))) {
            logistics.utils.msgs.getMsg('信息', '请输入菜单编号');
            return false;
        }
        var permissionType = $("#permissionType").combobox("getValue");
        if (permissionType == 1) {

            if (logistics.utils.validation.isEmptyWithType($("#menuUrl").textbox("getValue"))) {
                logistics.utils.msgs.getMsg('信息', '请输入菜单链接');
                return false;
            }

            if ($('#add_permission_dialog').attr("parent_id") <= 0
                || logistics.utils.validation.isEmptyWithType($('#add_permission_dialog').attr("parent_id"))
                && type == "add") {
                logistics.utils.msgs.getMsg('信息', '请选择要加的父菜单');
                return false;
            }
        }
        if (permissionType == 2) {

            if ($('#add_permission_dialog').attr("parent_id") <= 0
                || logistics.utils.validation.isEmptyWithType($('#add_permission_dialog').attr("parent_id"))
                && type == "add") {
                logistics.utils.msgs.getMsg('信息', '请选择要加的父菜单');
                return false;
            }
        }
        return true;
    },
    formClose: function (ele, fele) {
        $('#' + ele).dialog({closed: true});
        $('#' + fele).form('reset');
    },
});