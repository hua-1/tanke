$.namespace('logistics.commonUtils');
$.define('logistics.commonUtils.areaHelper', {
    /**
     * 省市区三级联动
     * @param option包含
     *  provinceId 省ID
     *  cityId 市ID
     *  areaId 区ID
     *  provinceValue 省初始化值
     *  cityValue    市初始化值
     *  areaValue    区初始化值
     */
    getTreeLinkageArea: function (option, isLoadData, isFirst) {
        var $province = $('#' + option.provinceId);
        var $city = $('#' + option.cityId);
        var $area = $('#' + option.areaId);
        var disabled = option.disabled || false;
        isLoadData = isLoadData == undefined ? false : isLoadData;
        if (isFirst == undefined || isFirst == true) {
            $province.combobox({
                data: logistics.common.data.province,
                valueField: 'id',
                textField: 'mapName',
                disabled: disabled,
                required: true,
                validType: 'selectValueRequired',
                onSelect: function (rec) {
                    if (rec.id != null && rec.id != "") {
                        var data = [];
                        var obj = {};
                        var d = {id: '-1', mapName: '-请选择-', selected: true}
                        data.push(d);
                        $.each(logistics.common.data.city, function (i, v) {
                            if (rec.id == v.mapParentId) {
                                obj = {};
                                obj = v;
                                data.push(obj);
                            }
                        });
                        $city.combobox('loadData', data);
                    }
                }
            });
            $city.combobox({
                valueField: 'id',
                textField: 'mapName',
                disabled: disabled,
                required: true,
                validType: 'selectValueRequired',
                data: [{mapName: '-请选择-', id: '-1', selected: true}],
                onSelect: function (rec) {
                    if (rec.id != null && rec.id != "") {
                        var data = [];
                        var obj = {};
                        var d = {id: '-1', mapName: '-请选择-', selected: true}
                        data.push(d);
                        $.each(logistics.common.data.area, function (i, v) {
                            if (rec.id == v.mapParentId) {
                                obj = {};
                                obj = v;
                                data.push(obj);
                            }
                        });
                        $area.combobox('loadData', data);
                    }
                }
            });
            $area.combobox({
                valueField: 'id',
                textField: 'mapName',
                disabled: disabled,
                required: true,
                validType: 'selectValueRequired',
                data: [{mapName: '-请选择-', id: '-1', selected: true}]
            });
        }
        if (isLoadData) {
            $province.combobox('setValue', option.provinceValue);
            if (option.provinceValue == null || option.provinceValue == -100) {
                $province.combobox("setValue", -1);
            }
            if (option.cityValue == null || option.cityValue == -100) {
                $city.combobox("setValue", -1);
            }
            if (option.areaValue == null || option.areaValue == -100) {
                $area.combobox("setValue", -1);
            }

            if (option.provinceValue != null && option.provinceValue != -100 && option.provinceValue != -1) {
                var data = [{mapName: '-请选择-', id: '-1', selected: true}];
                var obj = {};

                $.each(logistics.common.data.city, function (i, v) {
                    if (option.provinceValue == v.mapParentId) {
                        obj = {};
                        obj = v;
                        data.push(obj);
                    }
                });
                $city.combobox('loadData', data);
                $city.combobox('setValue', option.cityValue);
            }
            if (option.cityValue != null && option.cityValue != -100 && option.cityValue != -1) {
                var data = [{mapName: '-请选择-', id: '-1', selected: true}];
                var obj = {};
                $.each(logistics.common.data.area, function (i, v) {
                    if (option.cityValue == v.mapParentId) {
                        obj = {};
                        obj = v;
                        data.push(obj);
                    }
                });
                $area.combobox('loadData', data);
                $area.combobox('setValue', option.areaValue);
            }
        }
    },

    /**
     * 可筛选地区下拉列表
     * @param inputId 控件ID request
     * @param levelType 2显示省市，3显示省市区
     * @param topRow  初始化展示条数
     */
    getDropDownArea: function (inputId, levelType, topRow) {
        levelType = levelType == undefined ? "" : levelType;
        topRow = topRow == undefined ? "" : topRow;
        $('#' + inputId).combogrid({
            prompt: '请选择',
            panelHeight: 400,
            url: rootPath + "/api/commonData/getAreaPathList?levelType=" + levelType + "&topRow=" + topRow,
            idField: 'key',
            textField: 'value',
            mode: 'remote',
            selectOnNavigation: false,
            pagination: false,
            fitColumns: true,
            columns: [[
                {field: 'value', width: 138, sortable: true},
                {field: 'key', width: 400, sortable: true, hidden: true}
            ]],
            disabled: true,
            onChange: function () {
                var url = rootPath + '/api/commonData/getAreaPathList?keyword=' + $.trim($(this).combogrid('getText')) + "&levelType=" + levelType + "&topRow=" + topRow;
                $(this).combogrid('grid').datagrid({url: url});
            }
        }).combogrid('panel').find('.datagrid-header').hide();
    }
}, true);