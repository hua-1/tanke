$.fn.formExt = function (options, param) {
    if (typeof options == 'string') {
        return $.fn.formExt.methods[options](this, param);
    }
};

$.fn.formExt.methods = $.extend({}, $.fn.form.methods, {

    loadTagNameMap: {

        'SPAN': function (component, val) {
            component.html(val);
        },
        'TD': function (component, val) {
            component.html(val);
        },
        'INPUT': function (component, val) {
            var type = component.attr('type');
            if (type == 'radio') {
                var rVal = component.attr('value');
                if (rVal == val) {
                    component.attr("checked", "true");
                }
            }
            else if (type == 'checkbox') {
                var rVal = component.attr('value');
                var vals = val.split(",");
                for (var i = 0; i < vals.length; i++) {
                    if (rVal == vals[i]) {
                        component.attr("checked", "true");
                    }
                }
            }
            else {
                component.val(val);
            }
        },
        'TEXTAREA': function (component, val) {
            component.val(val);
        },
        // 'IMG': function (component, val) {
        //     component.attr("src", val);
        // }
    },

    load: function (target, param) {
        if (!target || !param) return;
        var me = this;
        var components = target.find('[name]');
        if (components && components.length > 0) {
            for (var i = 0; i < components.length; i++) {
                var component = $(components[i]);
                var fun = me.loadTagNameMap[component[0].tagName];
                if (!fun) continue;
                fun(component, me.getValueForParam(param, component.attr('name')));
            }
        }
        target.form('load', param);
    },

    getValueForParam: function (param, name) {
        if (!param || !name) {
            return null;
        }
        var value = param;
        var names = name.split(".");
        for (var i = 0; i < names.length; i++) {
            value = value[names[i]];
        }
        return value;
    }
});
