$.extend({
    namespace: function (path) {
        var parts = path.split("."), root = window, max, i;
        for (i = 0, max = parts.length; i < max; i++) {
            if (typeof root[parts[i]] === "undefined") {
                root[parts[i]] = {};
            }
            root = root[parts[i]];
        }
        return root;
    },

    define: function (className, options, isStatic) {
        var classStr = className + (isStatic ? ' = {};' : ' = function(){};');
        eval(classStr);
        $.extend(isStatic ? eval(className) : eval(className).prototype, options);
    }
});


