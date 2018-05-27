(function () {
    function initLeftMenu(_menus) {
        $("#nav").accordion({ animate: true, fit: true });
        $.each(_menus.modules, function (i, n) {
            var menulist = '';
            menulist += '<ul>';
            $.each(n.childModules, function (j, o) {
                var linkUrl = "";
                if (o.MENU_NAVIGATEURL == undefined || o.MENU_NAVIGATEURL == "" || o.MENU_NAVIGATEURL == null) {
                    linkUrl = "javascript:;";
                } else {
                    linkUrl = o.MENU_NAVIGATEURL;
                }
                //menulist += '<li><div><a ref="' + o.MENU_ID + '" href="javascript:;" rel="' + linkUrl + '" title="' + o.MENU_NAME + '"><span class="icon icon-nav" >&nbsp;</span><span class="nav">' + o.MENU_NAME + '</span></a></div></li> ';
                menulist += '<li><div><a ref="' + o.MENU_ID + '" href="javascript:;" rel="' + linkUrl + '" title="' + o.MENU_NAME + '"><span class="nav">' + o.MENU_NAME + '</span></a></div></li> ';
            });
            menulist += '</ul>';

            $('#nav').accordion('add', {
                title: '&nbsp;&nbsp;' + n.MENU_NAME,
                content: menulist,
                //iconCls: 'icon icon-nav'
            });
        });

        $('.easyui-accordion li a').click(function () {

            //插入最近访问
            $.post("/home/InsertHistoryMenu", "menuid=" + $(this).attr('ref'), function () { });


            var tabTitle = $(this).children('.nav').text();
            if (tabTitle.indexOf("新增任务")>=0) {
                tabTitle = tabTitle + i;
                i++;
            }
            var url = $(this).attr("rel");
            var menuid = $(this).attr("ref");
            parent.OpenUpdateTabs(url, tabTitle);
            $('.easyui-accordion li div').removeClass("selected");
            $(this).parent().addClass("selected");
        }).hover(function () {
            $(this).parent().addClass("hover");
        }, function () {
            $(this).parent().removeClass("hover");
        });

        //选中第一个
        var panels = $('#nav').accordion('panels');
        var t = panels[0].panel('options').title;
        $('#nav').accordion('select', t);
    }

    $(document).ready(function () {
        $.ajax({
            type: "post",
            url: "/Home/GetModules",
            async: false,
            dataType: "json",
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (data) {
                initLeftMenu(eval(data));
            }
        });
    });
})()