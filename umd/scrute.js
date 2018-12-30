(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Scrute", [], factory);
	else if(typeof exports === 'object')
		exports["Scrute"] = factory();
	else
		root["Scrute"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/Constants.ts
var PROPERTY = '$obs';
var ARRAY_CHANGES = {
    'pop': 1,
    'push': 1,
    'shift': 1,
    'unshift': 1,
    'reverse': 1,
    'splice': 1,
    'sort': 1,
};
var ARRAY_ITERATIONS = {
    'concat': 1,
    'every': 1,
    'fill': 1,
    'filter': 1,
    'find': 1,
    'findIndex': 1,
    'forEach': 1,
    'includes': 1,
    'indexOf': 1,
    'join': 1,
    'lastIndexOf': 1,
    'map': 1,
    'reduce': 1,
    'reduceRight': 1,
    'slice': 1,
    'some': 1,
};

// CONCATENATED MODULE: ./src/Node.ts
var Node = /** @class */ (function () {
    function Node(value) {
        this.value = value;
        this.next = this.prev = this;
    }
    Node.prototype.forEach = function (iterator) {
        var curr = this.next;
        var index = 0;
        while (curr !== this) {
            var next = curr.next;
            iterator(curr.value, curr, index);
            curr = next;
            index++;
        }
        return index;
    };
    Node.prototype.insertAfter = function (prev) {
        this.next = prev.next;
        this.prev = prev;
        this.prev.next = this.next.prev = this;
    };
    Node.prototype.push = function (last) {
        last.insertAfter(this.prev);
    };
    Node.prototype.remove = function () {
        if (!this.isEmpty()) {
            this.next.prev = this.prev;
            this.prev.next = this.next;
            this.prev = this.next = this;
        }
    };
    Node.prototype.isEmpty = function () {
        return this.next === this;
    };
    Node.head = function () {
        return new Node(null);
    };
    return Node;
}());


// CONCATENATED MODULE: ./src/Dependency.ts

var Dependency_Dependency = /** @class */ (function () {
    function Dependency(observer) {
        this.observer = observer;
        this.links = Node.head();
    }
    Dependency.prototype.notify = function () {
        var deep = false;
        this.links.forEach(function (link) {
            link.watcher.notify();
            deep = deep || link.watcher.deep;
        });
        if (deep && this.observer.parent) {
            this.observer.parent.notify();
        }
    };
    Dependency.prototype.destroy = function () {
        this.links.forEach(function (link) { return link.remove(); });
    };
    return Dependency;
}());


// CONCATENATED MODULE: ./src/Watcher.ts

var liveWatchers = [];
var Watcher_Watcher = /** @class */ (function () {
    function Watcher(expression, immediate, deep) {
        if (immediate === void 0) { immediate = true; }
        if (deep === void 0) { deep = false; }
        this.expression = expression;
        this.immediate = immediate;
        this.deep = deep;
        this.dirty = false;
        this.paused = false;
        this.evaluating = false;
        this.links = Node.head();
    }
    Watcher.prototype.isWatching = function () {
        return !this.links.isEmpty();
    };
    Watcher.prototype.notify = function () {
        if (this.evaluating) {
            return;
        }
        this.dirty = true;
        if (this.immediate) {
            this.update();
        }
    };
    Watcher.prototype.update = function () {
        this.evaluating = true;
        this.off();
        liveWatchers.push(this);
        try {
            this.result = this.expression();
        }
        finally {
            liveWatchers.pop();
            this.dirty = false;
            if (this.onResult) {
                try {
                    this.onResult();
                }
                finally {
                    this.evaluating = false;
                }
            }
            this.evaluating = false;
        }
    };
    Watcher.prototype.off = function () {
        this.links.forEach(function (link) { return link.remove(); });
    };
    Watcher.prototype.pause = function () {
        if (!this.paused) {
            this.off();
            this.paused = true;
        }
    };
    Watcher.prototype.resume = function () {
        if (this.paused) {
            this.update();
            this.paused = false;
        }
    };
    return Watcher;
}());


// CONCATENATED MODULE: ./src/Observer.ts

var Observer_Observer = /** @class */ (function () {
    function Observer(parent) {
        if (parent === void 0) { parent = null; }
        this.parent = parent;
        this.deps = {};
    }
    Observer.prototype.dep = function (prop) {
        var dep = this.deps[prop];
        if (!dep) {
            this.deps[prop] = dep = new Dependency_Dependency(this);
        }
        return dep;
    };
    Observer.prototype.notify = function (prop) {
        var deps = this.deps;
        if (prop in deps) {
            deps[prop].notify();
        }
    };
    Observer.prototype.destroy = function (prop) {
        var deps = this.deps;
        if (prop in deps) {
            deps[prop].destroy();
            delete deps[prop];
        }
    };
    return Observer;
}());


// CONCATENATED MODULE: ./src/Link.ts

var Link_Link = /** @class */ (function () {
    function Link(watcher, dependency) {
        this.watcher = watcher;
        this.dependency = dependency;
        this.watcherNode = new Node(this);
        this.dependencyNode = new Node(this);
    }
    Link.prototype.remove = function () {
        this.watcherNode.remove();
        this.dependencyNode.remove();
    };
    Link.create = function (watcher, dependency) {
        var exists = false;
        dependency.links.forEach(function (link) { return exists = exists || link.watcher === watcher; });
        if (!exists) {
            var link = new Link(watcher, dependency);
            dependency.links.push(link.dependencyNode);
            watcher.links.push(link.watcherNode);
        }
    };
    return Link;
}());


// CONCATENATED MODULE: ./src/observe.ts



function observe(input, _a) {
    var _b = (_a === void 0 ? {} : _a).parent, parent = _b === void 0 ? null : _b;
    if (isObservable(input)) {
        if (!input[PROPERTY]) {
            Object.defineProperty(input, PROPERTY, {
                value: new Observer_Observer(parent),
                writable: false,
                configurable: false,
                enumerable: false
            });
            input = new Proxy(input, handler);
        }
    }
    return input;
}
function isObservable(input) {
    return !!(typeof input === 'object' && input !== null);
}
function isObserved(input) {
    return !!(typeof input === 'object' && input !== null && input[PROPERTY]);
}

// CONCATENATED MODULE: ./src/handler.ts




var handler = {
    get: function (target, prop, _reciever) {
        var val = target[prop];
        if (prop === PROPERTY) {
            return val;
        }
        var obs = target[PROPERTY];
        if (typeof val === 'function') {
            if (target instanceof Array) {
                if (prop in ARRAY_CHANGES) {
                    return handleArrayChange(target, val, obs);
                }
                if (prop in ARRAY_ITERATIONS) {
                    return handleArrayIteration(target, val, obs);
                }
            }
            return val;
        }
        return handleWatching(target, prop, val, obs);
    },
    set: function (target, prop, value, _reciever) {
        if (value !== target[prop]) {
            target[prop] = value;
            var obs = target[PROPERTY];
            obs.notify(prop);
        }
        return true;
    },
    deleteProperty: function (target, prop) {
        var obs = target[PROPERTY];
        obs.destroy(prop);
        return true;
    }
};
function handleWatching(target, prop, val, obs) {
    var dep = obs.dep(prop);
    liveWatchers.forEach(function (watcher) { return Link_Link.create(watcher, dep); });
    if (isObservable(val) && !isObserved(val)) {
        target[prop] = val = observe(val, { parent: dep });
    }
    return val;
}
function handleArrayIteration(target, val, obs) {
    return function () {
        var length = target.length;
        for (var i = 0; i < length; i++) {
            handleWatching(target, i, target[i], obs);
        }
        handleWatching(target, 'length', target.length, obs);
        return val.apply(target, arguments);
    };
}
function handleArrayChange(target, val, obs) {
    return function () {
        var copy = target.slice();
        var result = val.apply(target, arguments);
        var max = Math.max(copy.length, target.length);
        for (var i = 0; i < max; i++) {
            if (copy[i] !== target[i]) {
                obs.notify(i);
            }
            if (i >= target.length) {
                obs.destroy(i);
            }
        }
        if (target.length !== copy.length) {
            obs.notify('length');
        }
        return result;
    };
}

// CONCATENATED MODULE: ./src/watch.ts

function watch(expr, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.immediate, immediate = _c === void 0 ? true : _c, _d = _b.deep, deep = _d === void 0 ? false : _d;
    var watcher = new Watcher_Watcher(expr, immediate, deep);
    watcher.update();
    return watcher;
}

// CONCATENATED MODULE: ./src/computed.ts

function computed(target, prop, expr) {
    var watcher = watch(expr, { immediate: false, deep: false });
    watcher.dirty = true;
    Object.defineProperty(target, prop, {
        configurable: false,
        enumerable: true,
        get: function () {
            if (watcher.dirty) {
                watcher.update();
            }
            return watcher.result;
        }
    });
    return watcher;
}

// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PROPERTY", function() { return PROPERTY; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ARRAY_CHANGES", function() { return ARRAY_CHANGES; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ARRAY_ITERATIONS", function() { return ARRAY_ITERATIONS; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Dependency", function() { return Dependency_Dependency; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Watcher", function() { return Watcher_Watcher; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Observer", function() { return Observer_Observer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Link", function() { return Link_Link; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "watch", function() { return watch; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "observe", function() { return observe; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isObservable", function() { return isObservable; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isObserved", function() { return isObserved; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "computed", function() { return computed; });













/***/ })
/******/ ]);
});
//# sourceMappingURL=scrute.js.map