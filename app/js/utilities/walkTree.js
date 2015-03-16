define(function (require) {

    var _ = require("underscore");

    return function (node, fn, prop) {
        var stack, children, result, i;

        if (_.isFunction(fn)) {
            stack = [];
            stack.push(node);

            while ((node = stack.pop())) {
                if ((result = fn.call(null, node)) === undefined) {
                    children = prop ? node[prop] : node;

                    for (i = children.length - 1; i >= 0; i--) {
                        stack.push(children[i]);
                    }
                }
                else {
                    break;
                }
            }
        }

        return result;
    };

});
