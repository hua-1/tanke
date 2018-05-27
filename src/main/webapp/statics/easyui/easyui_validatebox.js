$(function () {
    $.extend($.fn.validatebox.defaults.rules, {
        phone: {// 验证电话号码
            validator: function (value) {
                return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
            },
            message: '格式不正确,请使用下面格式:020-88888888'
        },
        idcard: {// 验证身份证
            validator: function (value) {
                return /^\d{15}(\d{2}[0-9A-Z])?$/.test(value);
            },
            message: '身份证号码格式不正确'
        },
        mobile: {// 验证手机号码
            validator: function (value) {
                return /^(13|15|14|18|17|19)\d{9}$/i.test(value);
            },
            message: '手机号码格式不正确'
        },
        mobileOrPhone: {// 验证手机号码或座机号
            validator: function (value) {
                var rex = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i;
                var rex2 = /^(13|15|14|18|17|19)\d{9}$/i;

                if (rex.test(value) || rex2.test(value)) {
                    return true;
                } else {
                    return false;
                }

            },
            message: '请输入正确的手机号码或座机号码'
        },
        maxlength:
            {//最大长度
                validator: function (value, param) {
                    return param[0] >= value.length;
                }
                ,
                message: '请输入最大{0}位字符.'
            }
        ,
        minlength: {//最小长度
            validator: function (value, param) {
                return value.length >= param[0];
            }
            ,
            message: '请输入最小{0}位字符.'
        }
        ,
        intOrFloat: {// 验证整数或小数
            validator: function (value) {
                return /^\d+(\.\d+)?$/i.test(value);
            }
            ,
            message: '请输入数字，并确保格式正确'
        }
        ,
        intOrDecimal: {// 验证整数或小数
            validator: function (value) {
                return /^(?!0(\.0+)?$)([1-9][0-9]*|0)(\.[0-9]+)?$/i.test(value);
            }
            ,
            message: '请输入有效的数字和小数'
        }
        ,
        weight: {
            validator: function (value, param) {
                return (/^\d{1,7}(\.\d{1,3})?$/).test(value);
            }
            ,
            message: '整数部分最多7位，小数最多三位'
        }
        ,
        ruleMoney: {
            validator: function (value, param) {
                return (/^\d{1,7}(\.\d{1,2})?$/).test(value);
            }
            ,
            message: '整数部分最多7位，小数最多两位'
        }
        ,
        money: {
            validator: function (value, param) {
                return (/^(([1-9]\d*)|\d)(\.\d{1})?$/).test(value);
            }
            ,
            message: '请输入整数或最多保留一位小数'

        }
        ,
        currency: {// 验证货币
            validator: function (value) {
                return /^\d+(\.\d+)?$/i.test(value);
            }
            ,
            message: '货币格式不正确'
        }
        ,
        moreThanOrEqualsNumber:{
            validator: function (value, param) {
                return param[0] <= value;
            }
            ,
            message: "取值需大于等于{0}"
        },
        tonnage: {// 验证吨位
            validator: function (value) {
                return /^\d+(\.\d+)?$/i.test(value);
            }
            ,
            message: '请输入有效的数字和小数'
        }
        ,
        qq: {// 验证QQ,从10000开始
            validator: function (value) {
                return /^[1-9]\d{4,9}$/i.test(value);
            }
            ,
            message: 'QQ号码格式不正确'
        }
        ,
        integer: {// 验证整数
            validator: function (value) {
                return /^[+]?[-]?[1-9]+\d*$/i.test(value);
            }
            ,
            message: '请输入整数'
        }
        ,
        positiveInteger: {// 验证整数
            validator: function (value) {
                return /^[1-9]\d{0,10}$/i.test(value);
            }
            ,
            message: '请输入整数'
        }
        ,
        age: {// 验证年龄
            validator: function (value) {
                return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
            }
            ,
            message: '年龄必须是0到120之间的整数'
        }
        ,

        chinese: {// 验证中文
            validator: function (value) {
                return /^[\Α-\￥]+$/i.test(value);
            }
            ,
            message: '请输入中文'
        }
        ,
        english: {// 验证英语
            validator: function (value) {
                return /^[A-Za-z]+$/i.test(value);
            }
            ,
            message: '请输入英文'
        }
        ,
        unnormal: {// 验证是否包含空格和非法字符
            validator: function (value) {
                return /^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(value);
            }
            ,
            message: '输入值不能为空和包含其他非法字符'
        }
        ,
        unempty: {//检验文本框非空或者空格
            validator: function (value) {
                return $.trim(value).length > 0;
            }
            ,
            message: '输入值不能为空或空格'
        }
        ,
        username: {// 验证用户名
            validator: function (value) {
                return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
            }
            ,
            message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
        }
        ,
        faxno: {// 验证传真
            validator: function (value) {
                //            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
                return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
            }
            ,
            message: '传真号码不正确'
        }
        ,
        zip: {// 验证邮政编码
            validator: function (value) {
                return /^[1-9]\d{5}$/i.test(value);
            }
            ,
            message: '邮政编码格式不正确'
        }
        ,
        ip: {// 验证IP地址
            validator: function (value) {
                return /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/i.test(value);
            }
            ,
            message: 'IP地址格式不正确'
        }
        ,
        name: {// 验证姓名，可以是中文或英文
            validator: function (value) {
                return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
            }
            ,
            message: '请输入姓名'
        }
        ,
        date: {
            validator: function (value) {
                //格式yyyy-MM-dd或yyyy-M-d
                return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
            }
            ,
            message: '请输入合适的日期格式'
        }
        ,
        msn: {
            validator: function (value) {
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
            }
            ,
            message: '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
        }
        ,
        same: {
            validator: function (value, param) {
                return $(param[0]).val() == value;
            }
            ,
            message: '字段不匹配'
        }
        ,
        selectCheck: {//验证下拉列表选中的不是默认的数据
            validator: function (value, param) {
                return value != '-请选择-';//param[0];
            }
            ,
            message: '请选择'
        }
        ,
        selectValueRequired: {
            validator: function (value, param) {
                if (value == "" || value.indexOf('请选择') >= 0) {
                    return false;
                } else {
                    return true;
                }
            }
            ,
            message: '该下拉框为必选项'
        }
        ,

        isEmpty: {
            validator: function (value, param) {
                if (logistics.utils.validation.isEmptyWithType(value)) {
                    return false;
                } else {
                    return true;
                }
            }
            ,
            message: '该输入项为必输项'
        }
        ,
        contactsphoneexists: {
            validator: function (value) {
                var result = false;
                $.ajax({
                    type: "post",
                    url: rootPath + "/contacts/existsPhone",
                    data: "phone=" + value,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        result = data.status == 1;
                    }
                });
                return result;
            }
            ,
            message: '此联系人手机号已存在'
        }
        ,
        customernameexists: {
            validator: function (value) {
                var result = false;
                $.ajax({
                    type: "post",
                    url: "/customer/checkExistsCustomerName",
                    data: "name=" + value,
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        result = data.success == "1";
                    }
                });
                return result;
            }
            ,
            message: '此公司名称已存在'
        }
        ,
        vehicleNo: {
            validator: function (value) {
                return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value);
            }
            ,
            message: '请输入正确的车牌号码(例:南K12001)'
        }
        ,
        isNotZero: {//非零
            validator: function (value) {
                return value != 0;
            }
            ,
            message: '请输入大于0的数字'
        },
        characterOrNumber: {//字母或者数字
            validator: function (value) {
                return /^[\d\w]*$/.test(value);
            }
            ,
            message: '请输入字母或者数字'
        },
        vehicleNumber: {// 验证车号
            validator: function (value) {
                return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9]{1}$/.test(value);
            },
            message: '车牌号格式不正确'
        },
        trailerNumber: {// 验证挂车号
            validator: function (value) {
                return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂]{1}$/.test(value);
            },
            message: '挂车号格式不正确'
        },
        roadTransportCertificateNumber: {// 验证整数
            validator: function (value) {
                return /^[1-9]\d{1,30}$/i.test(value);
            },
            message: '请输入有效的道路运输许可证号'
        },
        drivingLicenseNumber: {// 验证整数
            validator: function (value) {
                return /^[0-9A-Z]{1,30}$/.test(value);
            },
            message: '请输入有效的驾驶证号'
        },
        qualificationCertificateNumber: {// 验证整数
            validator: function (value) {
                return /^[0-9A-Z]{1,30}$/.test(value);
            },
            message: '请输入有效的从业资格证号'
        },
        followVehiclesNumber: {// 验证整数
            validator: function (value) {
                return /^[1-9]\d{1,30}$/i.test(value);
            },
            message: '请输入有效的押车员从业资格证号'
        }
    })
});