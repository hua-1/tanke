var pgzTree = {
    asyUpdate: false,
    asyAddUrl: null,
    asyEditUrl: null,
    asyDelUrl: null,
    asyEditStatusUrl:null,
    openFormAdd:null,
    aNodes: new Array(),
    eNodes: new Array(),
    dNodes: new Array(),
    setting: null,
    zTree: null,
    rMenuId: "rMenu",
    rMenu: $("#rMenu"),
    ulTreeId: "treeDemo",
    newCount: 1,
    className: "dark",
    onRightClick: function (event, treeId, treeNode) {
        if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
            pgzTree.zTree.cancelSelectedNode();
            pgzTree.showRMenu("root", event.clientX, event.clientY);
        } else if (treeNode && !treeNode.noR) {
            pgzTree.zTree.selectNode(treeNode);
            pgzTree.showRMenu("node", event.clientX, event.clientY);
        }
    },
    showRMenu: function (type, x, y) {
        $("#" + pgzTree.rMenuId + " ul").show();
        if (type == "root") {
            $("#m_del").hide();
            if (pgzTree.zTree.getNodes().length <= 0) {
                $("#m_check").hide();
            } else {
                $("#m_check").show();
            }
            $("#m_batchDel").show();
        } else {
            $("#m_del").show();
            $("#m_check").hide();
            $("#m_batchDel").hide();
        }
        pgzTree.rMenu.css({ "top": (y) + "px", "left": (x) + "px", "visibility": "visible" });

        $("body").bind("mousedown", pgzTree.onBodyMouseDown);
    },
    hideRMenu: function () {
        if (pgzTree.rMenu) pgzTree.rMenu.css({ "visibility": "hidden" });
        $("body").unbind("mousedown", pgzTree.onBodyMouseDown);
    },
    onBodyMouseDown: function (event) {
        if (!(event.target.id == pgzTree.rMenuId || $(event.target).parents("#" + pgzTree.rMenuId).length > 0)) {
            pgzTree.rMenu.css({ "visibility": "hidden" });
        }
    },
    addTreeNode: function () {
        pgzTree.hideRMenu();
        var newNode = { name: "new node" + (pgzTree.newCount++), id: pgHuanShare.generateRamdom(32),isShow:1};
        if (pgzTree.zTree.getSelectedNodes()[0]) {
            newNode.checked = pgzTree.zTree.getSelectedNodes()[0].checked;
            pgzTree.zTree.addNodes(pgzTree.zTree.getSelectedNodes()[0], newNode);
        } else {
            pgzTree.zTree.addNodes(null, newNode);
        }
        pgzTree.aNodes.push(newNode);
        if (pgzTree.asyUpdate ==true) {
            pgzTree.asyUpdateTreeNodes(pgzTree.asyAddUrl, { 'addNodes': JSON.stringify(pgzTree.aNodes) },"add");
        } 
    },
    addParentNode: function () {
        var newNode = { name: "new node" + (pgzTree.newCount++), id: pgHuanShare.generateRamdom(32), pId: 0, isShow: 1 };
        pgzTree.zTree.addNodes(null, newNode);
        pgzTree.aNodes.push(newNode);
        if (pgzTree.asyUpdate == true) {
            pgzTree.asyUpdateTreeNodes(pgzTree.asyAddUrl, { 'addNodes': JSON.stringify(pgzTree.aNodes) }, "add");
        } 
    },
    addHoverDom: function (treeId, treeNode) {
        //alert(treeNode.id);
        var sObj = $("#" + treeNode.tId + "_span");

        if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
        var addStr =
            "<span class='button add editor' id='addBtn_" + treeNode.tId
            + "' title='添加' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_" + treeNode.tId);
        if (btn) btn.bind("click", function () {
            if(pgzTree.openFormAdd==null){
                //var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var newNode = { id: null, pId: treeNode.id, name: "new node" + (pgzTree.newCount++), isShow: 1 };
                pgzTree.zTree.addNodes(treeNode, newNode);
                pgzTree.aNodes.push(newNode);
                if (pgzTree.asyUpdate == true) {
                    pgzTree.asyUpdateTreeNodes(pgzTree.asyAddUrl, { 'addNodes': JSON.stringify(pgzTree.aNodes) }, "add");
                }
            }else{
                pgzTree.openFormAdd();
            }

            return false;
        });
    },
    removeHoverDom: function (treeId, treeNode) {
        $("#addBtn_" + treeNode.tId).unbind().remove();
        $("#disabledBtn_" + treeNode.tId).unbind().remove();
    },
    beforeRemove: function (treeId, treeNode) {
        pgzTree.className = (pgzTree.className === "dark" ? "" : "dark");
        //var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        pgzTree.zTree.selectNode(treeNode);
        return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    },
    beforeDrag:function(treeId, treeNodes) {
		return false;
	},
    removeTreeNode: function () {
        pgzTree.hideRMenu();
        var nodes = pgzTree.zTree.getSelectedNodes();
        if (nodes && nodes.length > 0) {
            if (nodes[0].children && nodes[0].children.length > 0) {
                var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
                if (confirm(msg) == true) {
                    pgzTree.zTree.removeNode(nodes[0]);
                    pgzTree.dNodes.push(nodes[0]);
                }
            } else {
                pgzTree.zTree.removeNode(nodes[0]);
                pgzTree.dNodes.push(nodes[0]);
            }
        }
    },
    onRemove: function (e, treeId, treeNode) {
        var removeNode = { name: treeNode.name, id: treeNode.id, pId: treeNode.pId, isShow: treeNode.isShow };
        pgzTree.dNodes.push(removeNode);
        if (pgzTree.asyUpdate == true) {
            pgzTree.asyUpdateTreeNodes(pgzTree.asyDelUrl, { 'delNodes': JSON.stringify(pgzTree.dNodes) }, "del");
        } 
    },
    onRename: function (e, treeId, treeNode, isCancel) {
        var editNode = { name: treeNode.name, id: treeNode.id, pId: treeNode.pId, isShow: treeNode.isShow };
        pgzTree.eNodes.push(editNode);
        if (pgzTree.asyUpdate == true) {
            pgzTree.asyUpdateTreeNodes(pgzTree.asyEditUrl, { 'editNodes': JSON.stringify(pgzTree.eNodes) }, "edit");
        }
    },
    onDragMove: function (event, treeId, treeNodes) {
        //alert(treeNodes[0].id);
        //document.write();
        var parentNode = treeNodes[0].getParentNode();
        var pId = event.target;
    },
    onDrag:function(event, treeId, treeNodes){
        alert(treeNodes.length);
    },
    onDblClick: function (event, treeId, treeNode) {
        
    },
    asyUpdateTreeNodes: function(url,jsonData,type) {
        $.post(url, jsonData,
            function (data, status) {
                if (data == null || data == "") {
                    //alert("更新失败");
                    swal("更新失败!", "", "info");
                } else if(parseInt(data)<1){
                    swal("更新失败!", "", "info");  
                }else if (parseInt(data) >= 1) {
                    //alert("更新成功");
                    if (type == "add") {
                        pgzTree.aNodes = [];
                    }else if (type == "edit") {
                        pgzTree.eNodes = [];
                    }else if (type == "del") {
                        pgzTree.dNodes = [];
                    }else if (type=="editStatus") {
                        pgzTree.eNodes = [];
                    }
                }
            }
        );
    },
    checkTreeNode: function (checked) {
        var nodes = pgzTree.zTree.getSelectedNodes();
        if (nodes && nodes.length > 0) {
            pgzTree.zTree.checkNode(nodes[0], checked, true);
        }
        pgzTree.hideRMenu();
    },
    checkAllTreeNode: function (checked) {
        var nodes = pgzTree.zTree.getNodes();
        for (var i = 0; i < nodes.length; i++) {
            pgzTree.zTree.checkNode(nodes[i], checked, true);
        }
        pgzTree.hideRMenu();
    },
    resetTree: function () {
        pgzTree.hideRMenu();
        $.fn.zTree.init($("#" + pgzTree.ulTreeId), pgzTree.setting);
        pgzTree.aNodes = [];
        pgzTree.eNodes = [];
        pgzTree.dNodes =[];
    },
    init: function (setting, zTree,asyUpdate) {
        pgzTree.setting = setting;
        pgzTree.zTree = zTree;
        pgzTree.asyUpdate = asyUpdate;
    }
};