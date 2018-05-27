/**
 * Created by yun,zhou on 2017/10/19.
 */

$.namespace('logistics.enum');

$.define('logistics.enum.enabledEnum', {
        getEnumList: function () {
            return [{key: "1", value: "启用"}, {key: "0", value: "禁用"}]
        },
        getEnum: function () {
            return {normal: "1", disable: "0"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.lossTypeEnum', {
        getEnumList: function () {
            return [{key: "1", value: "标准"}, {key: "2", value: "非标准"}]
        },
        getEnum: function () {
            return {standard: "1", nonStandard: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.enabledStateEnum', {
        getEnumList: function () {
            return [{key: "1", value: "启用"}, {key: "0", value: "禁用"}]
        },
        getEnum: function () {
            return {disabled: "0", enabled: "1"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

/*审核状态即认证状态*/
$.define('logistics.enum.auditStatus', {
        getEnumList: function () {
            return [{key: "1", value: "已认证"}, {key: "0", value: "待认证"}, {key: "2", value: "已驳回"}]
        },
        getEnum: function () {
            return {waitAudit: "0", auditThrough: "1", auditReject: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.userType', {
        getEnumList: function () {
            return [{key: "1", value: "公司"}, {key: "2", value: "个人"}]
        },
        getEnum: function () {
            return {company: "1", individual: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.orderDealStatusEnum', {
        getEnumList: function () {
            return [{key: "", value: "全部"}, {key: "0", value: "未成交"}, {key: "1", value: "已成交"}]
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.entrustOrderTransStatusEnum', {
        getEnumList: function () {
            return [{key: "500", value: "待发布"},
                {key: "1000", value: "待确认报价"},{key: "1025", value: "待调度车辆"}, {key: "1050", value: "待到达装货地"},
                {key: "1100", value: "待装货"},{key: "1130", value: "待到达卸货地"}, {key: "1150", value: "待卸货"}, {key: "1200", value: "待签收"},
                {
                    key: "1250",
                    value: "已签收"
                }]
        },
        getEnum: function () {
            return {
                AWAITING_PUBLISH: 500,
                AWAITING_QUOTE: 1000,
                AWAITING_PERFECTING: 1050,
                AWAITING_LOADING: 1100,
                TRANSPORT: 1150,
                AWAITING_RECEIVING: 1200,
                END_COMPLETE: 1250
            };

        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.entrustOrderSearchPanelTransStatusEnum', {
        getEnumList: function () {
            return [{key: "", value: "全部"},{key: "1000", value: "待确认报价"},{key: "1025", value: "待调度车辆"},{key: "1050", value: "待到达装货地"},
                {key: "1100", value: "待装货"},{key: "1130", value: "待到达卸货地"}, {key: "1150", value: "待卸货"},{key: "1200", value: "待签收"},
                {key: "1250", value: "已签收"},{key: "1", value: "待关闭"},{key: "1300", value: "已终止"}]
        },
    getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.ticketsAuditStatus', {
        getEnumList: function () {
            return [{key: "0", value: "待审核"}, {key: "1", value: "已审核"}, {key: "2", value: "标记问题"}]
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

/*对应货源单详情页中的运单信息*/
$.define('logistics.enum.carrierOrderTransStatusEnum', {
        getEnumList: function () {
            return [{key: "", value: "全部"}, {key: "1050", value: "待到达装货地"},
                {key: "1100", value: "待装货"},{key: "1130", value: "待到达卸货地"},
                {key: "1150", value: "待卸货"}, {key: "1200", value: "待签收"},
                {key: "1250", value: "已签收"}]
        },
    getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.carrierOrderSearchPanelTransStatusEnum', {
        getEnumList: function () {
            return [{key: "", value: "全部"}, {key: "1050", value: "待到达装货地"},
                {key: "1100", value: "待装货"},{key: "1130", value: "待到达卸货地"},
                {key: "1150", value: "待卸货"}, {key: "1200", value: "待签收"},
                {key: "1250", value: "已签收"}, {key: "1400", value: "已终止"},
                {key: "1350", value: "待关闭"}, {key: "1450", value: "已关闭"}]
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.orderPayableStatusEnum', {
        getEnumList: function () {
            return [{key: "", value: "全部"}, {key: "10", value: "待编辑对账单"}, {key: "20", value: "待对账"}, {
                key: "30",
                value: "待付款"
            }, {key: "40", value: "待确认部分付款"}, {key: "50", value: "待确认已付款"}, {
                key: "60",
                value: "部分付款"
            }, {key: "70", value: "已付款"}]
        },
        getEnum: function () {
            return {
                ALL: "",
                TO_BE_EDITED: "10",
                WAIT_RECONCILIATION: "20",
                WAIT_PAY: "30",
                PART_REPLACED_PAYED: "40",
                FULL_REPLACED_PAYED: "50",
                PART_PAYED: "60",
                FULL_PAYED: "70",
            };

        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.orderReceivableStatusEnum', {
    getEnumList: function () {
        return [{key: "", value: "全部"}, {key: "10", value: "待编辑对账单"}, {key: "20", value: "待对账"}, {
            key: "30",
            value: "待收款"
        }, {key: "40", value: "部分收款"}, {key: "50", value: "已收款"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getEnum: function () {
        return {
            ALL: "",
            TO_BE_EDITED: "10",
            WAIT_RECONCILIATION: "20",
            WAIT_RECEIVABLE: "30",
            PART_REPLACED_RECEIVABLES: "40",
            FULL_REPLACED_RECEIVABLES: "50",
        };

    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.entrustOrderOperateTypeEnum', {
    getEnumList: function () {
        return []
    },
    getEnum: function () {
        return {REQUIRE_VEHICLES: "require", EXISTING_VEHICLES: "existing", UPDATE_ORDER: "updating", PUBLISH: "publishing"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);


$.define('logistics.enum.infoFeeTypeEnum', {
        getEnumList: function () {
            return [{key: "1", value: "-(提)"}, {key: "2", value: "+(补)"}]
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.quotedResultEnum', {
        getEnumList: function () {
            return [{key: '1', value: "中标"}, {key: '2', value: "未中标"}]
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.cancelTypeEnum', {
    getEnumList: function () {
        return [{key: 0, value: "正常"}, {key: 1, value: "取消"}, {key: 2, value: "终止"},{key: 3, value: "自动超时取消"}]
    },
    getEnum: function () {
        return {NORMAL: 0, CANCEL: 1, TERMINATION: 2,TIMEOUTCANCEL:3};

    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.companyEnabledEnum', {
    getEnumList: function () {
        return [{key: "", value: "全部"}, {key: "1", value: "正常"}, {key: "0", value: "禁用"}]
    }, getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    }, getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.companyAuditStatusEnum', {
    getEnumList: function () {
        return [{key: "", value: "全部"}, {key: "0", value: "待认证"}, {key: "1", value: "已认证"}, {key: "2", value: "已驳回"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);


$.define('logistics.enum.adjustExpenseTypeEnum', {
    getEnumList: function () {
        return [{key: 10, value: "压车费"}, {key: 20, value: "放空费"}, {key: 30, value: "延时费"}
            , {key: 40, value: "处理罐子费"}, {key: 50, value: "领车费"}, {key: 60, value: "染货费"}
            , {key: 70, value: "信息费"}, {key: 80, value: "其他"}, {key: 90, value: "返利"}
            , {key: 100, value: "退款"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.adjustExpenseOwnerEnum', {
    getEnumList: function () {
        return [{key: "1", value: "货主"}, {key: "2", value: "车主"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.adjustExpenseCalcTypeEnum', {
    getEnumList: function () {
        return [{key: 1, value: "单价(元/吨)"}, {key: 2, value: "总价(元)"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.adjustExpenseCalcOperatorTypeEnum', {
    getEnumList: function () {
        return [{key: 1, value: "－"}, {key: 2, value: "＋"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.settleCycleTypeEnum', {
    getEnumList: function () {
        return [{key: "", value: "全部"}, {key: 1, value: "卸结"}, {key: 2, value: "周结"}, {key: 3, value: "半月结"}, {
            key: 4,
            value: "月结"
        }, {key: 5, value: "其他"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.entrustOrderIfInvoiceTypeEnum', {
    getEnumList: function () {
        return [{key: "", value: "全部"}, {key: 1, value: "开票"}, {key: 2, value: "不开票"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.carrierOrderLogStatusEnum', {
    getEnumList: function () {
        return [{key: 1, value: "创建"}, {key: 2, value: "确认信息"}, {key: 3, value: "装货"}, {key: 4, value: "卸货"}, {
            key: 5,
            value: "完成"
        }, {key: 6, value: "终止"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.orderLossType', {
    getEnumList: function () {
        return [{key: 1, value: "标准"}, {key: 2, value: "非标准"}]
    },
    getEnum: function () {
        return {STANDARD: 1, NOTSTANDARD: 2};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.orderLossStandard', {
    getEnumList: function () {
        return [{key: 0, value: "无损耗"}, {key: 1, value: "千分之一"}, {key: 2, value: "千分之二"}, {
            key: 3,
            value: "千分之三"
        }, {key: 4, value: "千分之四"}]
    },
    getEnum: function () {
        return {NO: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.vehicleType', {
    getEnumList: function () {
        return [{key: "", value: "全部"}, {key: 1, value: "半挂车"}, {key: 2, value: "一体车"}]
    },
    getEnum: function () {
        return {ONE: 1, TWO: 2};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.tankRequire', {
    getEnumList: function () {
        return [
            {key: 1, value: "铁罐（单层）"},
            {key: 2, value: "铁罐（保温）"},
            {key: 3, value: "不锈钢罐（单层）"},
            {key: 4, value: "不锈钢罐（保温）"},
            {key: 5, value: "不锈钢罐（保温带加热槽）"},
            {key: 6, value: "铝合金罐（单层）"},
            {key: 7, value: "铝合金罐（保温）"},
            {key: 8, value: "玻璃钢"},
            {key: 9, value: "压力罐"},
            {key: 10, value: "双仓罐"},
            {key: 11, value: "其他"}]
    },
    getEnum: function () {
        return {ONE: 1, TWO: 2, NINE: 9};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.contractStatusEnum', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "1", value: "待进行"},
            {key: "2", value: "进行中"},
            {key: "3", value: "已终止"}]
    },
    getEnum: function () {
        return {ONE: "1", TWO: "2", THREE: "3"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.contractEnabledEnum', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "0", value: "正常"},
            {key: "1", value: "作废"}]
    },
    getEnum: function () {
        return {ONE: 1, TWO: 2, THREE: 3};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.contractSignObjectEnum', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "1", value: "货主"},
            {key: "2", value: "车主"}]
    },
    getEnum: function () {
        return {ZERO: "1", ONE: "2"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.contractTypeEnum', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "1", value: "长协运输合同"},
            {key: "2", value: "长协居间合同"},
            {key: "3", value: "批次运输合同"},
            {key: "4", value: "批次居间合同"},
            {key: "5", value: "单次运输合同"},
            {key: "6", value: "单次居间合同"}]
    },
    getEnum: function () {
        return {ONE: "1", TWO: "2", THREE: "3", FOUR: "4", FIVE: "5", SIX: "6"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.contractTypeEnum2', {
    getEnumList: function () {
        return [
            {key: "1", value: "长协运输合同"},
            {key: "2", value: "长协居间合同"},
            {key: "3", value: "批次运输合同"},
            {key: "4", value: "批次居间合同"},
            {key: "5", value: "单次运输合同"},
            {key: "6", value: "单次居间合同"}]
    },
    getEnum: function () {
        return {ONE: "1", TWO: "2", THREE: "3", FOUR: "4", FIVE: "5", SIX: "6"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);


$.define('logistics.enum.contractHierarchyEnum', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "1", value: "主体合同"},
            {key: "2", value: "补充合同"}]
    },
    getEnum: function () {
        return {MAIN: "1", SUPPLEMENT: "2"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.contractArchivingStatusEnum', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "0", value: "未归档"},
            {key: "1", value: "电子归档"},
            {key: "2", value: "传真纸质归档"},
            {key: "3", value: "原件归档"}]
    },
    getEnum: function () {
        return {ALL: "", NOTPIGEONHOLE: "0", ELECTRONICPIGEONHOLE: "1", PAPERPIGEONHOLE: "2", ORIGINALPIGEONHOLE: "3"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.contractArchivingStatusEnumPanel', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "1", value: "电子归档"},
            {key: "2", value: "传真纸质归档"},
            {key: "3", value: "原件归档"}]
    },
    getEnum: function () {
        return {ALL: "", NOTPIGEONHOLE: "0", PAPERPIGEONHOLE: "2", ORIGINALPIGEONHOLE: "3"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.contractSignSubjectEnum', {
    getEnumList: function () {
        return [
            {key: "", value: "全部"},
            {key: "1", value: "公司"},
            {key: "2", value: "个人"}]
    },
    getEnum: function () {
        return {COMPANY: "1", PERSONAL: "2"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.contractTemplate', {
    getEnumList: function () {
        return [
            {key: "1", value: "本司"},
            {key: "2", value: "对方"}]
    },
    getEnum: function () {
        return {WE: "1", OPPOSITE: "2"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.contractSendType', {
    getEnumList: function () {
        return [
            {key: "1", value: "传真"},
            {key: "2", value: "邮件"},
            {key: "3", value: "微信"},
            {key: "4", value: "原件"},
            {key: "5", value: "其他"}]
    },
    getEnum: function () {
        return {FAX: "1", EMAIL: "2", WECHAT: "3", ORDINARY: "4", ELSE: "5"};
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);


$.define('logistics.enum.bankAccountType', {
        getEnumList: function () {
            return [{key: "1", value: "收款账号"}, {key: "2", value: "付款账号"}]
        },
        getEnum: function () {
            return {company: "1", individual: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);


$.define('logistics.enum.financeOrderPayableStatusPanelEnum', {
        getEnumList: function () {
            return [{key: "", value: "全部"}, {
                key: "30",
                value: "待付款"
            }, {key: "40", value: "待确认部分付款"}, {key: "50", value: "待确认已付款"}, {
                key: "60",
                value: "部分付款"
            }, {key: "70", value: "已付款"}]
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.rebatePanelStatusEnum', {
        getEnumList: function () {
            return [{key: "", value: "全部"}, {key: "500", value: "无需返利"}, {key: "1000", value: "待返利"}, {
                key: "1050",
                value: "待支付返利"
            }, {key: "1100", value: "已返利"}]
        },
        getEnum: function () {
            return {ALL: "", NOTREBATE: "500", WAITREBATE: "1000", WAITPAYREBATE: "1050", HASREBATED: "1100"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.rebateStatusEnum', {
        getEnumList: function () {
            return [{key: "500", value: "无需返利"}, {key: "1000", value: "待返利"}, {key: "1050", value: "待支付返利"}, {
                key: "1100",
                value: "已返利"
            }]
        },
        getEnum: function () {
            return {NOTREBATE: "500", WAITREBATE: "1000", WAITPAYREBATE: "1050", HASREBATED: "1100"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.financialPayTypeEnum', {
        getEnumListSelect: function () {
            return [{key: "", value: "全部"}, {key: "1", value: "转账"}, {key: "2", value: "支付宝"}, {
                key: "3",
                value: "微信"
            }, {key: "4", value: "现金"}, {key: "5", value: "其他"}]
        },
        getEnumList: function () {
            return [{key: "1", value: "转账"}, {key: "2", value: "支付宝"}, {key: "3", value: "微信"}, {
                key: "4",
                value: "现金"
            }, {key: "5", value: "其他"}]
        },
        getEnum: function () {
            return {TRANSFER: "1", ALI_PAY: "2", WECHAT_PAY: "3", CASH: "4", OTHER: "5"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.financialAssociatedRecordStatusEnum', {
        getEnumList: function () {
            return [{key: "1", value: "已关联"}, {key: "2", value: "已取消"}]
        },
        getEnum: function () {
            return {RELATE: "1", CANCEL_RELATE: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.takeoverPriceTypeEnum', {
        getEnumList: function () {
            return [{key: "1", value: "单价"}, {key: "2", value: "一口价"}]
        },
        getEnum: function () {
            return {UNIT_PRICE: "1", ONCE_PRICE: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.takeoverPriceTypeDetailEnum', {
        getEnumList: function () {
            return [{key: "1", value: "单价(元/吨)"}, {key: "2", value: "一口价(元)"}]
        },
        getEnum: function () {
            return {UNIT_PRICE: "1", ONCE_PRICE: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.departmentTypeEnum', {
    getEnumList: function () {
        return [{key: "", value: "--请选择--"}, {key: 1, value: "运营部"}, {key: 2, value: "运能部"}, {
            key: 3,
            value: "财务部"
        }, {key: 4, value: "产品技术部"}, {key: 5, value: "跟单组"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);
$.define('logistics.enum.kaiGongEnum', {
        getEnumList: function () {
            return [{key: "1", value: "开工"}, {key: "0", value: "休业"}]
        },
        getEnum: function () {
            return {normal: "1", disable: "0"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.roleType', {
        getEnumList: function () {
            return [{key: "1", value: "司机"}, {key: "2", value: "押车员"}]
        },
        getEnum: function () {
            return {driver: "1", guard: "2"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);

$.define('logistics.enum.objectionStatus', {
        getEnumList: function () {
            return [{key: "0", value: "待提交"}, {key: "1", value: "待解决"},{key: "2", value: "待解决（驳回）"}, {key: "3", value: "待审核"}, {key: "4", value: "已解决"}, {key: "5", value: "已关闭"}]
        },
        getEnum: function () {
            return {WAIT_RAISED: "0", WAIT_SOLVED: "1",WAIT_SOLVED_REJECT: "2", WAIT_AUDIT: "3", RESOLVED: "4", CLOSED: "5"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.objectType', {
        getEnumList: function () {
            return [{key: "1", value: "车主"}, {key: "2", value: "司机"}, {key: "3", value: "交易员"}, {key: "4", value: "运能"}]
        },
        getEnum: function () {
            return {CARRIER: "1", DRIVER: "2", DEALER: "3", DISPATCHER: "4"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);
$.define('logistics.enum.billType', {
    getEnumList: function () {
        return [
            {key: "1", value: "到达提货地凭证"},
            {key: "2", value: "出库磅单"},
            {key: "3", value: "随车油样"},
            {key: "4", value: "铅封"},
            {key: "5", value: "卸货点凭证"},
            {key: "6", value: "签收单"},
            {key: "7", value: "入库磅单"},
            {key: "8", value: "取样照片"},
            {key: "9", value: "其他"}]
    },
    getValue: function (val) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (val) {
                case obj.key:
                    value = obj.value;
                    break;
            }
        });
        return value;
    },
    getKey: function (key) {
        var value = "";
        $.each(this.getEnumList(), function (index, obj) {
            switch (key) {
                case obj.value:
                    value = obj.key;
                    break;
            }
        });
        return value;
    }
}, true);

$.define('logistics.enum.carrierCloseStatus', {
        getEnumList: function () {
            return [{key: "1", value: "待关闭"},{key: "2", value: "已关闭"}]
        },
        getEnum: function () {
            return {WAIT_RAISED: "0", WAIT_SOLVED: "1",WAIT_SOLVED_REJECT: "2", WAIT_AUDIT: "3", RESOLVED: "4", CLOSED: "5"};
        },
        getValue: function (val) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (val) {
                    case obj.key:
                        value = obj.value;
                        break;
                }
            });
            return value;
        },
        getKey: function (key) {
            var value = "";
            $.each(this.getEnumList(), function (index, obj) {
                switch (key) {
                    case obj.value:
                        value = obj.key;
                        break;
                }
            });
            return value;
        }
    },
    true);