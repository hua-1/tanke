/**
 *  常用JS 通用类
 *  author:huanshare
 */


/**
 * 去掉前后空格
 * " dd ".trim(); == "dd"
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 去掉左空格
 * " dd".leftTrim(); == "dd"
 */
String.prototype.leftTrim = function () {
    return this.replace(/(^\s*)/g, "");
};

/**
 * 去掉右空格
 * "dd ".rightTrim(); == "dd"
 */
String.prototype.rightTrim = function () {
    return this.replace(/(\s*$)/g, "");
};
/**
 * 只留下数字(0123456789)
 * "dd 09".toNumber(); == ""
 * onkeyup="change_number(this)"
 * onafterpaste="change_number(this)"
 */
String.prototype.toNumber = function () {
    return this.replace(/\D/g, "");

};

/**
 * 银行账户格式化
 * "1234561231456448".bankAccountsFormat()== "1234 5612 3145 6448"
 */
String.prototype.bankAccountsFormat = function () {
    var _tep = '';
    if (this) {
        var before_format = this.replace(/\s/g, '');
        for (var i = 0; i < before_format.length; i++) {
            _tep += before_format[i];
            if (i > 0 && (i + 1) % 4 == 0) {
                _tep += " ";
            }
        }
    }
    return _tep;
};

/**
 * 删除数组指定下标或指定对象
 * arr.remove(2);//删除下标为2的对象（从0开始计算）
 * arr.remove(str);//删除指定对象
 */
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
};
/**
 * 将时间转换成固定格式输出
 * new Date().Format('yyyy-MM-dd HH:mm:ss');
 * new Date().Format('yyyy/MM/dd hh:mm:ss');
 * 只支持关键字（yyyy、MM、dd、HH、hh、mm、ss）HH：表示24小时，hh表示12小时
 */
Date.prototype.Format = function (format) {
    var formatstr = format;
    if (format != null && format != "") {
        //设置年
        if (formatstr.indexOf("yyyy") >= 0) {
            formatstr = formatstr.replace("yyyy", this.getFullYear());
        }
        //设置月
        if (formatstr.indexOf("MM") >= 0) {
            var month = this.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            formatstr = formatstr.replace("MM", month);
        }
        //设置日
        if (formatstr.indexOf("dd") >= 0) {
            var day = this.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            formatstr = formatstr.replace("dd", day);
        }
        //设置时 - 24小时
        var hours = this.getHours();
        if (formatstr.indexOf("HH") >= 0) {
            if (hours < 10) {
                hours = "0" + hours;
            }
            formatstr = formatstr.replace("HH", hours);
        }
        //设置时 - 12小时
        if (formatstr.indexOf("hh") >= 0) {
            if (hours > 12) {
                hours = hours - 12;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            formatstr = formatstr.replace("hh", hours);
        }
        //设置分
        if (formatstr.indexOf("mm") >= 0) {
            var minute = this.getMinutes();
            if (minute < 10) {
                minute = "0" + minute;
            }
            formatstr = formatstr.replace("mm", minute);
        }
        //设置秒
        if (formatstr.indexOf("ss") >= 0) {
            var second = this.getSeconds();
            if (second < 10) {
                second = "0" + second;
            }
            formatstr = formatstr.replace("ss", second);
        }
    }
    return formatstr;
};
Date.prototype.AddMonth = function (n) {
    this.setMonth(this.getMonth() + n);
    var dt = this;

    if ((this.getYear() * 12 + this.getMonth()) > (this.getFullYear() * 12 + this.getMonth() + n)) {
        dt = new Date(this.getYear(), this.getMonth(), 0);
    }
    return dt;
};
//时间格式化
var com = {};
com.formatDate = function (value) {
    return formatDate(value, 'yyyy-MM-dd');
};

com.formatTime = function (value) {
    return formatDate(value, 'yyyy-MM-dd hh:mm:ss');
};
com.formatDatehhmm = function (value) {
    return formatDate(value, 'yyyy-MM-dd hh:mm');
};

com.formatTime_hm = function (value) {
    return formatDate(value, 'hh:mm');
};

com.formatMoney = function (value) {
    if (isNaN(value)) {
        return 0.00;
    } else {
        return Number(value).toFixed(2);
    }
};


/**
 * 格式化时间显示方式
 * 用法:format="yyyy-MM-dd hh:mm:ss";
 */
formatDate = function (v, format) {
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
};

//离开该页面时，提示！
window.onbeforeunload = function () {
    if (commn.IsSearch == true) {
        return "\n警告！~  \n操作正在执行中，确认需要继续？\n";
    }
};

//commn对象
var commn = {
    IsSearch: false,//是否正在查询数据
    InputDisabled: function (eid) {//按钮点击后，按钮不可用 例如：window.setTimeout("commn.InputDisabled('#bt_submit,#bt_back')", 1);
        commn.IsSearch = true;
        jQuery(eid).attr("disabled", "disabled");
    },
    DateDiffDay: function (beginDate, endDate) {//获取两个时间的天数差
        //beginDate、endDate 格式：2011-8-25
        var arrDate = [];
        //设置开始时间
        arrDate = beginDate.split("-");
        beginDate = new Date(arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0]);//默认格式：8/25/2011
        //设置结束时间
        arrDate = endDate.split("-");
        endDate = new Date(arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0]);//默认格式：8/25/2011
        var iDays = parseInt(Math.abs((beginDate - endDate) / 1000 / 60 / 60 / 24));//转换天，默认毫秒
        return iDays;
    },
    DateTimeIsFomart: function (val) {//验证时分秒格式是否正确12:00:25
        //判断时间位数是否正确
        if (val.length == 8) {
            var val_r = val.replace(/\D/g, '');//只取数字
            if (val_r.length == 6) {//判读位置是否正确
                var val_s = val.split(":");//按：分成数组
                if (val_s.length == 3) {//如果数组正确
                    var v0 = parseInt(val_s[0]);
                    var v1 = parseInt(val_s[1]);
                    var v2 = parseInt(val_s[2]);
                    // 当时分秒的值 处于正常范围时，返回true
                    if (v0 != null && (v0 >= 0 && v0 <= 23) &&
                        v1 != null && (v1 >= 0 && v1 <= 59) &&
                        v2 != null && (v2 >= 0 && v2 <= 59)
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
};


//json时间转换为正常时间(yyyy-mm-dd MM:HH:SS)
String.prototype.convertJsonDate = function (hasTime) {
    if ($.isEmptyObject(this) || this.toString() == "") {
        return "";
    }
    try {
        var date = new Date(parseInt(this.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        if (hasTime) {
            var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + min + ":" + seconds;
        } else {
            return date.getFullYear() + "-" + month + "-" + currentDate
        }
    } catch (e) {
        return "";
    }
};


/*
 是否大于某个值
 */
String.prototype.IsGreater = function (number) {
    if (/^[0-9]*$/.test(this)) {
        return parseInt(this) > number;
    }
    return false;
};
/*
 是否是有效手机号码
 */
String.prototype.IsMobile = function () {
    return /(^0?[1][0-9]{10}$)/.test(this);
};

/*
 URL替换指定参数
 */
String.prototype.URLReplaceParamVal = function (paramName, replaceWith) {
    var re = eval('/(' + paramName + '=)([^&]*)/gi');
    if (re.test(this))
        return this.replace(re, paramName + '=' + replaceWith);
    else {
        if (this.indexOf("?") > 0)
            return this + "&" + paramName + '=' + replaceWith;
        else
            return this + "?" + paramName + '=' + replaceWith;
    }
};

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}


var DateUtil = function () {

    /*
     获取本日
     */
    this.getCurrentDate = function () {
        return new Date();
    }
    ;

    /*
     获取本周
     */
    this.getCurrentWeek = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天  
        var week = currentDate.getDay();
        //返回date是一个月中的某一天  
        var month = currentDate.getDate();
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);  
        //本周 周一  
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日  
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间  
        startStop.push(monday);
        //本周起始时间  
        //添加本周最后一天时间  
        startStop.push(sunday);
        //本周终止时间  
        //返回  
        return startStop;
    }
    ;

    /*
     获取本月
     */
    this.getCurrentMonth = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //求出本月第一天  
        var firstDay = new Date(currentYear, currentMonth, 1);
        //当为12月的时候年份需要加1  
        //月份需要更新为0 也就是下一年的第一个月  
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0;
            //就为  
        } else {
            //否则只是月份增加,以便求的下一月的第一天  
            currentMonth++;
        }
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天  
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天  
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
        //添加至数组中返回  
        startStop.push(firstDay);
        startStop.push(lastDay);
        //返回  
        return startStop;
    }
    ;
    /*
     获取本季度开始月份
     */
    this.getQuarterSeasonStartMonth = function (month) {
        var quarterMonthStart = 0;
        var spring = 0;
        //春  
        var summer = 3;
        //夏  
        var fall = 6;
        //秋  
        var winter = 9;
        //冬  
        //月份从0-11  
        if (month < 3) {
            return spring;
        }
        if (month < 6) {
            return summer;
        }
        if (month < 9) {
            return fall;
        }
        return winter;
    }
    ;
    /*
     计算天数
     year:年份  month:月份
     */
    this.getMonthDays = function (year, month) {
        //本月第一天 1-31  
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11  
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年  
        var relativeYear = relativeDate.getFullYear();
        //当为12月的时候年份需要加1  
        //月份需要更新为0 也就是下一年的第一个月  
        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            //否则只是月份增加,以便求的下一月的第一天  
            relativeMonth++;
        }
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天  
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数  
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    }
    ;

    this.getCurrentSeason = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份  
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份  
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;
        //获得本季度开始的日期  
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        //获得本季度结束的日期  
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
        //加入数组返回  
        startStop.push(quarterSeasonStartDate);
        startStop.push(quarterSeasonEndDate);
        //返回  
        return startStop;
    }
    ;

    this.getCurrentYear = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //本年第一天  
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        //本年最后一天  
        var currentYearLastDate = new Date(currentYear, 11, 31);
        //添加至数组  
        startStop.push(currentYearFirstDate);
        startStop.push(currentYearLastDate);
        //返回  
        return startStop;
    }
    ;

    this.getPriorMonthFirstDay = function (year, month) {
        //年份为0代表,是本年的第一月,所以不能减  
        if (month == 0) {
            month = 11;
            //月份为上年的最后月份  
            year--;
            //年份减1  
            return new Date(year, month, 1);
        }
        //否则,只减去月份  
        month--;
        return new Date(year, month, 1);
    }
    ;

    this.getPreviousMonth = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得上一个月的第一天  
        var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
        //获得上一月的最后一天  
        var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
        //添加至数组  
        startStop.push(priorMonthFirstDay);
        startStop.push(priorMonthLastDay);
        //返回  
        return startStop;
    }
    ;

    this.getPreviousWeek = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天  
        var week = currentDate.getDay();
        //返回date是一个月中的某一天  
        var month = currentDate.getDate();
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //获得当前周的第一天  
        var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
        //上周最后一天即本周开始的前一天  
        var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
        //上周的第一天  
        var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));
        //添加至数组  
        startStop.push(priorWeekFirstDay);
        startStop.push(priorWeekLastDay);
        return startStop;
    }
    ;

    this.getPriorSeasonFirstDay = function (year, month) {
        var quarterMonthStart = 0;
        var spring = 0;
        //春  
        var summer = 3;
        //夏  
        var fall = 6;
        //秋  
        var winter = 9;
        //冬  
        //月份从0-11  
        switch (month) {
            //季度的其实月份  
            case spring:
                //如果是第一季度则应该到去年的冬季  
                year--;
                month = winter;
                break;
            case summer:
                month = spring;
                break;
            case fall:
                month = summer;
                break;
            case winter:
                month = fall;
                break;
        }
        return new Date(year, month, 1);
    }
    ;

    this.getPreviousSeason = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //上季度的第一天  
        var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth);
        //上季度的最后一天  
        var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));
        //添加至数组  
        startStop.push(priorSeasonFirstDay);
        startStop.push(priorSeasonLastDay);
        return startStop;
    }
    ;

    this.getPreviousYear = function () {
        //起止日期数组  
        var startStop = [];
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        currentYear--;
        var priorYearFirstDay = new Date(currentYear, 0, 1);
        var priorYearLastDay = new Date(currentYear, 11, 1);
        //添加至数组  
        startStop.push(priorYearFirstDay);
        startStop.push(priorYearLastDay);
        return startStop;
    };

    this.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
};
var openOtherTabs = function (shellPath, url, title) {
    var url = encodeURIComponent(url);
    FrameMessage.exec(shellPath + "/FrameMessage", "", "OpenUpdateTabs", [url, title]);
};


function isNullOrEmpty(strVal) {
    if (strVal == '' || strVal == null || strVal == 'undefined') {
        return true;
    } else {
        return false;
    }
}

$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
