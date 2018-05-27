$.fn.euiDataGrid = function (options, param) {
    var me = $(this);
    if (typeof options == 'string') {
        var method = $(this).datagrid('options')[options];
        if (!method)
            return $(this).datagrid(options, param);
        if (method)
            return method(this, param);
        else
            alert(options + 'can not support');
    }
    options = options || {};

    var defaults = {
        url: options.url,
        method: 'get',
        border: true,
        singleSelect: true,
        fitColumns: false,
        autoRowHeight: false,
        autoSizeColumn: true,
        rownumbers: true,
        pagination: true,
        height: $(document).height() - me.position().top - 15,
        pagePosition: 'bottom',
        pageSize: 50,
        pageList: [50, 100, 150],
        pageNumber: 1,
        columns: [],
        toolbar: [],
        loadMsg: "努力加载中,请稍等.."
    };

    options = $.extend(defaults, options);

    //view
    var viewOption = options.viewOpt || {};
    if (viewOption.viewType === 'empty') {
        options.view = $.fn.datagrid.emptydataView;
    } else if (viewOption.viewType === 'sub') {
        options.view = $.fn.datagrid.detailView;
        options.detailFormatter = function (index, row) {
            return '<table id="table-' + index + '"></table>';
        };
        options.onExpandRow = function (index, row) {
            $("#table-" + index).datagrid({
                method: viewOption.subMethod || "post",
                remoteSort: false,
                singleSelect: viewOption.subSingleSelect,
                fitColumns: viewOption.subFitColumns,
                queryParams: viewOption.getSubQueryParams ? viewOption.getSubQueryParams(row, index) : {},
                url: viewOption.subUrl,
                height: viewOption.subHeight || '',
                frozenColumns: [viewOption.subFrozenColumns],
                columns: [viewOption.subColumns],
                onResize: function () {
                    me.datagrid('fixDetailRowHeight', index);
                },
                onLoadSuccess: function () {
                    setTimeout(function () {
                        me.datagrid('fixDetailRowHeight', index);
                        me.datagrid('fixRowHeight', index);
                    }, 0);
                }
            });
            me.datagrid('fixDetailRowHeight', index);
        };
    }

    me.datagrid(options).datagrid('doCellTip', {
        onlyShowInterrupt: true,//显示不全自动提示
        position: 'bottom',
        maxWidth: '400px'
    });
};

