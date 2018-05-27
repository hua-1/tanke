$.namespace('logistics.utils');

$.define('logistics.utils.msgs', {
    getMsg: function (title, msg, top) {
        $.messager.alert({
            title: title,
            msg: msg,
            icon: 'info',
            top: top || ($(document).scrollTop() + 100)
        });
    }
}, true);
$.define("logistics.utils.form", {
    valid: function (metaData, callback) {
        var fields = metaData.fields;
        for (var index in fields) {
            var field = fields[index],
                textField = $(field.selector);
            textField1 = $(field.selector1);
            if (field.type === "text") {
                var value = textField.val();
                var enable = field.hasOwnProperty('isValidEmpty') ? field.isValidEmpty : true;
                if (enable) {
                    if (!value || value.length === 0) {
                        callback(textField, field.emptyMessage, false);
                        return false;
                    }
                    else {
                        callback(textField, null, true);
                    }
                }
                if ($.isNumeric(field.minLength) && value.length < field.minLength) {
                    callback(textField, field.tooLongMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }
                if ($.isNumeric(field.maxLength) && value.length > field.maxLength) {
                    callback(textField, field.tooLongMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);

                }
                if ($.isNumeric(field.min) && Number(value) < field.min) {
                    callback(textField, field.minMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);

                }

                if ($.isNumeric(field.max) && Number(value) > field.max) {
                    callback(textField, field.maxMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);

                }


                if (value.length > 0) {
                    if (field.regex && !field.regex.test(value)) {
                        callback(textField, field.regexMessage, false);
                        return false;
                    }
                    else {
                        callback(textField, null, true);
                    }
                }
            } else if (field.type === "checkLink") {
                if (!textField.hasClass(field.requireClass)) {
                    callback(textField, field.regexMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);

                }
            }
            else if (field.type === "password") {
                var value = textField.val();
                var value1 = textField1.val();
                if (value.length === 0) {
                    callback(textField, field.emptyMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }

                if ($.isNumeric(field.maxLength) && value.length > field.maxLength) {
                    callback(textField, field.tooLongMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }
                if ($.isNumeric(field.minLength) && value.length < field.minLength) {
                    callback(textField, field.tooLongMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }
                if (field.regex && !field.regex.test(value)) {
                    callback(textField, field.regexMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }
                if (!isNullOrEmpty(value1) && value != value1) {
                    callback(textField, field.contrastMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }
            }
            else if (field.type === "checkbox") {

                if (!textField.hasClass(field.requireClass)) {
                    callback(textField, field.emptyMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }

            } else if (field.type === "img") {
                var value = textField.attr("src");

                if (isNullOrEmpty(value)) {
                    callback(textField, field.emptyMessage, false, field);
                    return false;
                }
                else {
                    callback(textField, null, true, field);
                }
            } else if (field.type === "familyTel") {
                var value = textField.val().replace(/\s/g, "");
                var value1 = textField1.val().replace(/\s/g, "");
                if (value.length === 0) {
                    callback(textField, field.emptyMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true);
                }

                if ($.isNumeric(field.maxLength) && value.length > field.maxLength) {
                    callback(textField, field.tooLongMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true, field);
                }
                if ($.isNumeric(field.minLength) && value.length < field.minLength) {
                    callback(textField, field.tooLongMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true, field);
                }
                if (field.regex && !field.regex.test(value + value1)) {
                    callback(textField, field.regexMessage, false);
                    return false;
                }
                else {
                    callback(textField, null, true, field);
                }
            }
        }
        return true;
    }
}, true);
$.define('logistics.utils.tabs', {
    tabIndex: 0,
    getMainTab: function () {
        var tabPanel = $('#homeTabsPanel');
        if (!tabPanel || tabPanel.length == 0) {
            tabPanel = self.parent.$('#homeTabsPanel');
            if (!tabPanel || tabPanel.length == 0) {
                tabPanel = self.parent.parent.$('#homeTabsPanel');
            }
        }
        return tabPanel;
    },
    getCurrentTab: function () {
        var currentTab = this.getMainTab().tabs('getSelected');
        return currentTab;
    },
    addTab: function (title, url, ifCloseCurrTab) {
        var tabs = this.getMainTab();
        if (!tabs.tabs('exists', title)) {
            tabs.tabs('add', {
                title: title,
                content: '<iframe name="mainFrame" scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:95%;"></iframe>',
                closable: true,
                width: $('#mainPanle').width() - 10,
                height: $('#mainPanle').height() - 26
            });
        } else {
            tabs.tabs('select', title);
        }
        if (ifCloseCurrTab) {
            this.tabClose(this);
        }
    },
    tabClose: function (me) {
        var tabs = this.getMainTab().find(".tabs-wrap").find(".tabs").find("li").children(".tabs-inner");
        $(tabs).dblclick(function () {
            var subtitle = $(this).children("span").text();
            me.getMainTab().tabs('close', subtitle);
        });
        $(tabs).bind('contextmenu', function (e) {
            if (!logistics.utils.validation.isEmptyWithType(self.parent)) {
                self.parent.$('#mm').menu('show', {
                    left: e.pageX,
                    top: e.pageY,
                });
                var subtitle = $(this).children("span").text();
                self.parent.$('#mm').data("currtab", subtitle);
                return false;
            }
        });
    },
    closeCurrentTab: function () {
        var tabPanel = this.getMainTab();
        var tab = tabPanel.tabs('getSelected');
        var index = tabPanel.tabs('getTabIndex', tab);
        if (index != 0) {
            tabPanel.tabs('close', index);
        }

    },
    updateCurrentTab: function (title, url) {
        this.getMainTab().tabs('close', title);
        var tabPanel = this.getCurrentTab();
        this.getMainTab().tabs('update', {
            tab: tabPanel,
            options: {
                title: title,
                content: '<iframe name="mainFrame" scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:95%;"></iframe>',
            }
        });
        me.tabClose();
    },
    getCurrentTabTitle: function () {
        var tabPanel = this.getMainTab();
        return tabPanel.tabs('getSelected').panel('options').title;
    },
    closeCurrentTabByName: function (title) {
        var tabPanel = this.getMainTab();
        tabPanel.tabs('close', title);
    },
    parentRefreshTab: function () {
        var currTab = self.parent.parent.$('#homeTabsPanel').tabs('getSelected');
        var iframe = $("iframe", currTab)[0];
        if (iframe) {
            var url = iframe.src;
            self.parent.parent.$('#homeTabsPanel').tabs('update', {
                tab: currTab,
                options: {
                    content: '<iframe name="mainFrame" scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:95%;"></iframe>'
                }
            });
        }
    },
    closeCurrentParentTab: function () {
        var tabPanel = $('#homeTabsPanel');
        if (!tabPanel || tabPanel.length == 0) {
            tabPanel = self.parent.parent.$('#homeTabsPanel');
        }
        var tab = tabPanel.tabs('getSelected');
        var index = tabPanel.tabs('getTabIndex', tab);
        if (index != 0) {
            tabPanel.tabs('close', index);
        }
    },

    parentAddTab: function (title, url) {
        var tabs = $('#homeTabsPanel');
        if (!tabs || tabs.length == 0) {
            tabs = self.parent.parent.$('#homeTabsPanel');
        }
        var newTitle = title;
        if (title == "委托发布") {
            this.tabIndex += 1;
            newTitle = title + (this.tabIndex)
        }
        if (!tabs.tabs('exists', newTitle)) {
            tabs.tabs('add', {
                title: newTitle,
                content: '<iframe name="mainFrame" scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:95%;"></iframe>',
                closable: true,
                width: $('#mainPanle').width() - 10,
                height: $('#mainPanle').height() - 26
            });
        } else {
            tabs.tabs('select', title);
        }
    }
}, true);
$.define("logistics.utils.validation", {
    isEmptyWithType: function (v) {
        switch (typeof v) {
            case 'undefined':
                return true;
            case 'string':
                if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
                break;
            case 'boolean':
                if (!v) return true;
                break;
            case 'number':
                if (0 === v || isNaN(v)) return true;
                break;
            case 'object':
                if (null === v || v.length === 0) return true;
                for (var i in v) {
                    return false;
                }
                return true;
        }
        return false;
    }
}, true);
$.define("logistics.utils.organization", {
    organizationByType: null,
    getOrganizationByType: function () {
        var me = this;
        $.ajax({
            type: 'POST',
            url: '/api/commonData/getOrganizationByType',
            async: false,
            success: function (data) {
                me.organizationByType = data;
            }
        });
    }
}, true);
$.define('logistics.utils.und', {
    undulpicate: function (array) {
        for (var i = 0; i < array.length; i++) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[i] === array[j]) {
                    array.splice(j, 1);
                    j--;
                }
            }
        }
        return array;
    }
}, true);
$.define("logistics.utils.numberUtils", {
    toDecimal: function (digital, decimal) {
        var f = parseFloat(digital);
        var d = parseFloat(decimal);
        if (isNaN(f)) {
            return false;
        }
        if (isNaN(d)) {
            d = 3;
        }
        var f = Math.round(digital * Math.pow(10, decimal)) / Math.pow(10, decimal);
        //    var f = Math.round(digital * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + d) {
            s += '0';
        }
        return s;
    },
    isNumber: function (obj) {
        return typeof obj === 'number' && isFinite(obj);
    },
    accAdd: function (arg1, arg2) {

        arg1 = logistics.utils.numberUtils.isNumber(arg1) ? arg1 : 0;
        arg2 = logistics.utils.numberUtils.isNumber(arg2) ? arg2 : 0;

        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    accSub: function (arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    },
    accMul: function (arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    accDiv: function (arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        with (Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }


}, true);


$.define("logistics.utils.timeFormatConversion", {
    formatDate: function (v, format) {
        if (!v) return "";
        var d = v;
        if (typeof v === 'string') {
            if (v.indexOf("/Date(") > -1)
                d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
            else
                d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
        }
        var o = {
            "M+": d.getMonth() + 1,  //month
            "d+": d.getDate(),       //day
            "h+": d.getHours(),      //hour
            "m+": d.getMinutes(),    //minute
            "s+": d.getSeconds(),    //second
            "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
            "S": d.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },

    formatTime: function (value, format) {
        return this.formatDate(value, format);
    }
}, true);

$.define("logistics.utils.query", {
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    urlUpdateParams: function (url, name, value) {
        var r = url;
        if (r != null && r != 'undefined' && r != "") {
            value = encodeURIComponent(value);
            var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
            var tmp = name + "=" + value;
            if (url.match(reg) != null) {
                r = url.replace(eval(reg), tmp);
            }
            else {
                if (url.match("[\?]")) {
                    r = url + "&" + tmp;
                } else {
                    r = url + "?" + tmp;
                }
            }
        }
        return r;
    }
}, true);

$.define("logistics.utils.imageBind", {
    init: function (id) {
        var me = this;
        var fileId = id + "_input";
        $("#" + id).after('<input type="file" style="display:none" id="' + fileId + '" />');
        $("#" + id).click(function () {
            $("#" + fileId).trigger("click");
        });
        $("#" + fileId).change(function () {
            me.uploadFile(this, id);
        });

    },
    photoCompress:function (file,obj,callback){
        var me = this;
    var ready=new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload=function(){
        var re=this.result;
        me.canvasDataURL(re,obj,callback)
    }
    },
    canvasDataURL:function (path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
},
    convertBase64UrlToBlob:function (urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
},
  maxsize : 2 * 1024 * 1024,//2M
    uploadFile: function (file, imgId, callback) {
        var me = this;
        if (file.files && file.files[0]) {
            var newfile = file.files[0];
            var filename = newfile.name;
            var ext = filename.substr(filename.lastIndexOf(".")).toLowerCase();
            if (!(ext == ".jpg" || ext == ".png" || ext == ".jpeg" || ext == ".bmp" )) {
                alert("格式不正确，只能上传【jpg，png，jpeg，bmp】等格式的文件");
                $(file).val('');
                return;
            }

            var blob = null;
            if (file.files[0].size > me.maxsize) {
                me.photoCompress(newfile, {
                    quality: 0.7
                }, function(base64Codes){
                    blob = me.convertBase64UrlToBlob(base64Codes);
                    if(blob.size>me.maxsize){
                        alert("我们尝试了压缩，但还是太大，请自行压缩");
                        $(file).val('');
                        return;
                    }
                    me.upload(blob,callback,filename,ext,imgId);

                });
            }else{
                me.upload(newfile,callback,filename,ext,imgId);
            }
            return true;
        }
    },
    upload:function(obj,callback,fileName,ext,imgId){
        var me = this;
        var uploadUrl = rootPath + '/uploadFile';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", uploadUrl, true);
        //自定义添加头信息传参
        xhr.setRequestHeader("UPLOADFILESIZE", obj.size);
        xhr.setRequestHeader("UPLOADFILENAME", me.picName(fileName, ext))//TODO:文件名处理

        xhr.send(obj);
        xhr.addEventListener("load", function (e) {//上传成功监听器
            var response = eval("(" + e.currentTarget.response + ")");
            //根据返回地址显示
            if (response.success) {
                $(imgId).attr("src", encodeURI( response.src));
                $(imgId).data("relativePath", response.relativePath);
            } else {
                logistics.utils.msgs.getMsg("信息", response.message);
            }
            if (callback) {
                callback($(imgId));
            }
        });
    },
    uploadImgOrFile: function (file, callback) {
        var me = this;
        var maxsize = 2 * 1024 * 1024;//2M
        if (file.files && file.files[0]) {
            if (file.files[0].size > maxsize) {
                logistics.utils.msgs.getMsg("信息", "大小超过2M，不允许上传");
                $(file).val('');
                return;

            }
            var newfile = file.files[0];
            var filename = newfile.name;
            var ext = filename.substr(filename.lastIndexOf(".")).toLowerCase();
            if (!(ext == ".jpg" || ext == ".png" || ext == ".jpeg" || ext == ".bmp" || ext == ".gif" || ext == ".pdf" )) {
                logistics.utils.msgs.getMsg("信息", "格式不正确，只能上传【jpg，png，jpeg，bmp,gif,pdf】等格式的文件");
                $(file).val('');
                return;
            }
            var uploadUrl = rootPath + '/uploadFile';
            var xhr = new XMLHttpRequest();
            xhr.open("POST", uploadUrl, true);
            //自定义添加头信息传参

            xhr.setRequestHeader("UPLOADFILESIZE", newfile.size);
            xhr.setRequestHeader("UPLOADFILENAME", me.picName(filename, ext))//TODO:文件名处理

            xhr.send(newfile);
            xhr.addEventListener("load", function (e) {//上传成功监听器

                var response = eval("(" + e.currentTarget.response + ")");
                //根据返回地址显示
                if (callback) {
                    callback(response, filename);
                }
            });
            return true;
        }
    },
    picName: function (oldFileName, ext) {
        var myDate = new Date();
        var myYear = myDate.getYear();
        var myMonth = myDate.getMonth();
        var myHour = myDate.getHours();
        var myMinute = myDate.getMinutes();
        var mySecond = myDate.getSeconds();
        var newFileName = myYear + "" + myMonth + myHour + myMinute + mySecond + ext;
        return newFileName;

    }
}, true);

$.define("logistics.utils.date", {
    daysBetween: function (dateOne, type) {
        var start = logistics.utils.timeFormatConversion.formatTime(new Date(), "yyyy-MM-dd");
        var end = logistics.utils.timeFormatConversion.formatTime(dateOne, "yyyy-MM-dd");
        start = start.replace(/-/g, "/");
        var startdate = new Date(start);
        end = end.replace(/-/g, "/");
        var enddate = new Date(end);
        var time = enddate.getTime() - startdate.getTime();
        var days = parseInt(time / (1000 * 60 * 60 * 24));

        switch (days) {
            case 0:
                return "今天";
                break;
            case 1:
                return "明天";
                break;
            case 2:
                return "后天";
                break;
            default:
                if (type == null || type == "" || type == undefined) {
                    return logistics.utils.timeFormatConversion.formatTime(dateOne, "yyyy-MM-dd");
                } else {
                    return " ";
                }

                break;
        }
    },

    today: function () {
        var today = new Date();
        var h = today.getFullYear();
        var m = today.getMonth() + 1;
        var d = today.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        return h + "-" + m + "-" + d;
    }
}, true);
$.define('logistics.utils.mathRound', {
    toFixed: function (val, n) {
        if (val == null || val == undefined) {
            val = 0;
        }
        if (n == null || n == undefined) {
            n = 2;
        }
        return (Math.round(parseFloat(val) * 100) / 100).toFixed(n);
    }
}, true);
$.define("logistics.utils.eui", {
        editor: function (options) {
            var defaults = {
                type: "numberbox",
                precision: 2,
                validType: "intOrDecimal",
                onChange: function (val) {
                },

            }
            options = $.extend(defaults, options);
            return {
                type: options.type,
                options:
                    {
                        precision: options.precision,
                        validType: options.validType,
                        onChange: options.onChange,
                        onBlur: options.onBlur,
                        required: options.required,
                    }
            }
        },

        endEditing: function (options) {
            var defaults = {
                editIndex: undefined,
                gridField: "",
                event: [],
                me: null
            }
            options = $.extend(defaults, options);
            if (options.editIndex == undefined) {
                return true
            }
            if (options.gridField.datagrid('validateRow', options.editIndex)) {
                options.gridField.datagrid('endEdit', options.editIndex);
                options.editIndex = undefined;
                options.me.editIndex = undefined;
                $.each(options.event, function (i, v) {
                    $(v.field).bind(v.event, function () {
                        eval(v.method)
                    });
                });
                return true;
            } else {
                return false;
            }
        }
    },
    true
);


