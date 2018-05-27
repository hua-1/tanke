/**
 * Created by yun.zhou on 2017/12/5.
 */

$.namespace('logistics.business.common');

$.define('logistics.business.common.company', {
        combogrid: function (options) {
            var artChanged, selectRow;
            options = options || {};

            var defaults = {
                $ele: options.$ele || "",
                defaultValue: "",
                source: 1,
                status: options.status || true,
                onChange: function (val) {
                    var keyword = options.$ele.combogrid('getText');
                    $(this).combogrid('grid').datagrid('load', {
                        keyWord: keyword,
                    });
                    artChanged = true;//记录是否有改变（当手动输入时发生)
                },
                onClickRow: function (index, row) {
                    var auditStatus = row.auditStatus;
                    var enabled = row.enabled;
                    if (options.status) {
                        if ((auditStatus != logistics.enum.auditStatus.getEnum().auditThrough
                                && !logistics.utils.validation.isEmptyWithType(auditStatus))
                            || enabled != logistics.enum.enabledEnum.getEnum().normal) {
                            options.$ele.combogrid('setValue', '');
                            $.messager.alert('信息', "公司待认证/被禁用/被驳回，无法选择", 'info');
                            return false;
                        }
                    }
                    if (options.customValidationFunction && !options.customValidationFunction(row)) {
                        options.$ele.combogrid('setValue', '');
                        return false;
                    }
                },
                onHidePanel: function (index, row) {
                    var t = $(this).combogrid('getValue');
                    if (artChanged) {
                        if (logistics.utils.validation.isEmptyWithType(selectRow) || t != selectRow.id) {//没有选择或者选项不相等时清除内容
                            $(this).combogrid('setValue', '');
                        } else {
                            //do something...
                        }
                    }
                    artChanged = false;
                    selectRow = null;
                },
                onSelect: function (index, row) {
                    selectRow = row;
                }
            }

            options = $.extend(defaults, options);

            options.$ele.combogrid({
                url: options.url || '/entrustUser/api/getCompanyByName?source=' + options.source,
                width: options.width || 180,
                prompt: options.prompt || '请输入公司名称',
                panelWidth: options.panelWidth || 500,
                required: options.required ,
                idField: options.idField || 'id',
                textField: options.textField || 'companyName',
                method: 'post',
                rownumbers: true,
                pagination: true,
                pagePosition: 'bottom',
                pageSize: 50,
                pageList: [50, 100, 150],
                pageNumber: 1,
                made: 'remote',
                fitColumns: true,
                value: options.defaultValue || "",
                columns: [[
                    {field: options.textField || 'companyName', title: '公司名称', width: 80},
                    {
                        field: 'auditStatus', title: '认证状态', width: 80, formatter: function (val, row) {

                        if (logistics.utils.validation.isEmptyWithType(val)) {
                            return "已认证";
                        }
                        return logistics.enum.auditStatus.getValue(val + "");
                    }
                    },
                    {
                        field: 'enabled', title: '使用状态', width: 80, formatter: function (val, row) {
                        return logistics.enum.enabledEnum.getValue(val);
                    }
                    }

                ]],
                onChange: options.onChange,
                onClickRow: options.onClickRow,
                onHidePanel: options.onHidePanel,
                onSelect: options.onSelect
            });
        }},true);
$.define('logistics.business.common.organization', {
    getOrganizations: function (organizeId,userId,type,/*是否根据当前登录员权限 not*/accordLogin) {
        $("body").append("<div id=\""+organizeId+"MenuContent\" class=\"menuContent\" style=\"display:none; position: absolute;\">\n" +
            "    <ul id=\""+organizeId+"Tree\" class=\"ztree\"  style=\"width:160px;border: 1px solid #617775;background: #f0f6e4;height:360px;overflow-y:scroll;overflow-x:auto;\"></ul>\n" +
            "</div>")
        $("#"+organizeId).click(function(){
            showMenu();
        })
        var setting = {
            view: {
                dblClickExpand: false,
                selectedMulti: false
            },
            data: {
                key: {
                    name: "orgName",
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "parentId",
                    rootPId: 0
                }
            },
            callback: {
                beforeClick: beforeClick,
                onClick: onClick,
                onAsyncSuccess: onAsyncSuccess

            },
            async: {
                enable: true,
                url: rootPath + "/organization/api/searchOrganizations?type="+type+(accordLogin?"&accordLogin="+accordLogin:""),
                dataType: "json",//返回数据类型
                type: "post",//请求方式
            },
        };


        function beforeClick(treeId, treeNode) {
            if(treeNode.canClick==logistics.utils.constants.integerconstant.INTEGER_ZERO){
               // $.messager.alert('提示', "您没有权限查看此组织", 'info');
                return false;
            }
            return true;
        }
        function  onAsyncSuccess(){
            $.fn.zTree.getZTreeObj(organizeId+"Tree").expandAll(true);
        }

        function onClick(e, treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj(treeId),
                nodes = zTree.getSelectedNodes(),
                v = "";
            nid="";
            nodes.sort(function compare(a,b){return a.id-b.id;});
            for (var i=0, l=nodes.length; i<l; i++) {
                v += nodes[i].orgName + ",";
                nid+=nodes[i].id + ",";
            }
            if (v.length > 0 ) v = v.substring(0, v.length-1);
            if (nid.length > 0 ) nid = nid.substring(0, nid.length-1);
            var cityObj = $("#"+organizeId);
            cityObj.val(v);
            cityObj.data("id",nid);
            syncUser(nid);
            hideMenu()
        }
        function syncUser(id){

            $.ajax({
                url:rootPath+"/organization/api/searchUsersByOrgId?type="+type+(accordLogin?"&accordLogin="+accordLogin:""),
                type:'post',
                data: {id:id},
                dataType:'json',
                success:function(data){
                    $("#"+userId).combobox({
                        valueField: "id",
                        textField: "name",
                        data: data,
                    });
                }
            })
        }

        function showMenu() {
            var cityObj = $("#"+organizeId);
            var cityOffset = $("#"+organizeId).offset();
            $("#"+organizeId+"MenuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

            $("body").bind("mousedown", onBodyDown);
        }
        function hideMenu() {
            $("#"+organizeId+"MenuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }
        function onBodyDown(event) {
            if (!(event.target.id == "menuBtn" || event.target.id == "#"+organizeId+"MenuContent" || $(event.target).parents("#"+organizeId+"MenuContent").length>0)) {
                hideMenu();
            }
        }

        $.fn.zTree.init($("#"+organizeId+"Tree"), setting);

    }},true);