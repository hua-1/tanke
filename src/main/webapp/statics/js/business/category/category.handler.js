$(function () {
    new logistics.category.mainPanel().initPanel();
})
$.namespace('logistics.category');

$.define('logistics.category.searchPanel', {
    initPanel: function () {
        var me = this;
        $('#btnSearch').click(function () {
            $(me).trigger('categorySearchEvent', me.getParams());
        });
    },
    getParams: function (type) {
        return {
            userName: $('#cataName').textbox("getValue").trim(),
        }
    }
});


$.define('logistics.category.gridPanel', {
    gridPanelObj: null,
    me: null,
    initPanel: function (defParams) {
        this.me = this;
        var me = this;
        this.initGrid(defParams);
        this.initTreeGrid();
        $("#btnSaveUser").click(function () {
            me.saveCate();
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
        this.gridPanelObj = $("#category_grid_main");
        this.gridPanelObj.euiDataGrid({
            url: '/category/api/serachList',
            queryParams: {},
            checkOnSelect: false,
            selectOnCheck: false,
            singleSelect: true,
            method: 'post',
            autoRowHeight: true,
            autoSizeColumn: true,
            view: detailview,
            detailFormatter: function (index, row) {
                return '<div style="padding:2px;overflow-x:hidden;overflow-y:auto;"><div class="ddv"></div></div>';
            },
            fitColumns:$(document).width()>1200?true:false,
            frozenColumns: [[
                {field: 'ck', checkbox: true},
                {
                    field: 'id', title: "操作", width: 150, align: 'center', formatter: function (val, row) {
                    var html = "",
                        html="&nbsp;&nbsp;&nbsp;<a class='edit_user' user_id='" + row.id + "' '>编辑</a>";
                    return html;
                }
                }
            ]],
            columns: [[
                {field: 'tCategoryName', title: "用户名称", width: 150, editor: "text", align: "center",},
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
            onExpandRow: function (index, row) {
                new logistics.category.categoryGridPanel().initGrid(this, index, row);
            },
            toolbar: [{
                text: '添加菜单',
                iconCls: 'icon-add',
                handler: function () {
                    me.addCate();
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
    addCate: function () {
        $.ajax({
            type: "POST",
            url: "/category/api/getTCategoryParentInfo",
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $("#parentName").combobox({
                    data: data,
                    editable: false,
                    valueField: "id",
                    textField: "tCategoryName",
                    onSelect: function (record) {
                        //下拉框选择的内容事件
                    }
                });
            }
        });
        this.me.forReset("form_cate_user");
        $("#parentName").textbox("readonly", false);
        this.me.userDialog("添加菜单", null);
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
        $.post("/userinfo/api/updateUserInfoStatus", {"userIds": arry.join(","), "enabled": status},
            function (data) {
                $.messager.alert('信息', data.message, 'info');
                if (data.success == "1") {
                    me.gridPanelObj.datagrid('reload');
                }
            }
        );
    },
    userDialog: function (title, userid) {
        $('#add_cate_dialog').dialog({
            title: title,
            width: 400,
            height: 350,
            closed: false,
            cache: false,
            modal: true,
            zindex: 9001,
            top: ($(window).height() - 350) * 0.5,
            left: ($(window).width() - 400) * 0.5
        }).attr("parentId", userid);
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
    saveCate: function () {
        var obj=new Object();
        var me = this.me;
        var flag=false;
        var parentId=$('#parentName').combobox('getValue');
         if(logistics.utils.validation.isEmptyWithType(parentId)){
             obj.tParentId=null;
             obj.cateid=null;
         }else{
             obj.tParentId=parentId;
         }
        var catagoryName=$('#catagoryName').textbox("getValue");
        if(logistics.utils.validation.isEmptyWithType(catagoryName)){
            logistics.utils.msgs.getMsg("信息", "输入类别名字");
            return;
        }else{
            flag=true;
            obj.name=catagoryName;
        }
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/category/api/saveCate",
                data: JSON.stringify(obj),
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
        this.me.formClose("add_cate_dialog");
        this.me.forReset("form_cate_user");
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

$.define('logistics.category.categoryGridPanel', {
    gridPanelObj: null,
    initGrid: function (parent, index, row) {
        var me = this;
        this.gridPanelObj = $(parent).datagrid('getRowDetail', index).find('div.ddv');
        debugger
        this.gridPanelObj.euiDataGrid({
            url: rootPath + '/category/api/getTCategoryById',
            queryParams: {"id":row.id},
            method: 'post',
            height: 'auto',
            fitColumns: true,
            pagination: false,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            columns: [[
                {field: 'ck', checkbox: true},
                {field: 'tCategoryName', title: "用户名称", width: 150, editor: "text", align: "center",},
                {field: 'userAccount', title: "用户账号", width: 150, editor: "text", align: "center",},
                {field: 'mobilePhone', title: "手机号码", width: 150, editor: "text", align: "center",},
                {field: 'telephone', title: "座机", width: 150, editor: "text", align: "center",},
            ]],
            onResize: function () {
                $(parent).datagrid('fixDetailRowHeight', index);
            },
            onLoadSuccess: function () {
                setTimeout(function () {
                    $(parent).datagrid('fixDetailRowHeight', index); //在加载爷爷列表明细（即：父列表）成功时，获取此时整个列表的高度，使其适应变化后的高度，此时的索引
                    $(parent).datagrid('fixRowHeight', index); //防止出现滑动条
                }, 0);
            }
        });
        $(parent).datagrid('fixDetailRowHeight', index);
    },
    load: function (params) {
        this.gridPanelObj.datagrid('load', params);
    },
    getParams: function (row) {
        return {
            entrustOrderId: row.entrustOrderId
        };
    }
});
$.define('logistics.category.mainPanel', {
    searchPanel: new logistics.category.searchPanel(),
    gridPanel: new logistics.category.gridPanel(),
    initPanel: function () {
        var me = this;
        this.searchPanel.initPanel();
        this.gridPanel.initPanel(this.searchPanel.getParams());
        $(this.searchPanel).bind('categorySearchEvent', function () {
            me.search();
        });
    },
    search: function () {
        this.gridPanel.load(this.searchPanel.getParams());
    }
});