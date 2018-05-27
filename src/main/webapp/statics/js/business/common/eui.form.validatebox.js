$.namespace('logistics.eui');
$.define('logistics.eui.validatebox', {

    textbox: function (ele, required, validType) {
        $("#" + ele).textbox({
            required: required,
            validType: validType
        });
    },
    validatebox: function (ele, required, validType) {
        $("#" + ele).validatebox({
            required: required,
            validType: validType
        });
    },
    combobox: function (ele, required, validType) {
        $("#" + ele).combobox({
            required: required,
            validType: validType
        });
    },

    numberbox: function (ele, required, precision, validType,max) {
        $("#" + ele).numberbox({
            required: required,
            precision: precision,
            validType: validType,
            max:max
        });
    },
    datebox: function (ele, required, validType) {
        $("#" + ele).validatebox({
            required: required,
            validType: validType
        });
    },
    combogrid: function (ele, required, validType) {
        $("#" + ele).combogrid({
            required: required,
            validType: validType
        });
    }


}, true);