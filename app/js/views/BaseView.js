define(function (require) {

    var Backbone = require("backbone");
    var walkTree = require("utilities/walkTree");

    var BaseView = Backbone.View.extend({

        initialize: function (options) {
            Object.defineProperty(this, "childNodes", {
                value: [],
                writable: true
            });

            Object.defineProperty(this, "firstChild", {
                value: null,
                writable: true
            });

            Object.defineProperty(this, "lastChild", {
                value: null,
                writable: true
            });

            Object.defineProperty(this, "parentNode", {
                value: null,
                writable: true
            });
        },

        appendChild: function (child) {
            if (child.parentNode) {
                child.parentNode.removeChild(child);
            }

            this.childNodes.push(child);
            child.parentNode = this;

            return child;
        },

        hasChildNodes: function () {
            return this.childNodes.length > 0;
        },

        insertBefore: function (newElement, referenceElement) {
            var childNodes = this.childNodes;
            var i;

            if (newElement.parentNode) {
                newElement.parentNode.removeChild(newElement);
            }

            if (referenceElement) {
                for (i = childNodes.length - 1; i >= 0; i--) {
                    if (childNodes[i] === referenceElement) {
                        childNodes.splice(i, 0, newElement);
                        break;
                    }
                }
            }
            else {
                this.appendChild(newElement);
            }

            newElement.parentNode = this;

            return newElement;
        },

        contains: function (other) {
            var contains = this.walk(function (node) {
                if (node === other) {
                    return true;
                }
            });

            return contains || false;
        },

        removeChild: function (child) {
            var childNodes = this.childNodes;

            for (var i = childNodes.length - 1; i >= 0; i--) {
                if (childNodes[i] === child) {
                    childNodes.splice(i, 1);
                    child.parentNode = null;
                    break;
                }
            }

            return child;
        },

        replaceChild: function (newChild, oldChild) {
            var childNodes = this.childNodes;
            var removed;
            var i;

            if (newChild.parentNode) {
                newChild.parentNode.removeChild(newChild);
            }

            for (i = childNodes.length - 1; i >= 0; i--) {
                if (childNodes[i] === oldChild) {
                    removed = childNodes.splice(i, 1, newChild);
                    removed[0].parentNode = null;
                    break;
                }
            }

            newChild.parentNode = this;

            return removed[0];
        },

        search: function (fn) {
            return walkTree(this, fn, "childNodes");
        }

    });

    return BaseView;

});
