(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("scrute", [], factory);
	else if(typeof exports === 'object')
		exports["scrute"] = factory();
	else
		root["scrute"] = factory();
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
/**
 * The hidden property which stores the reference to the Observer for an object.
 */
var PROPERTY = '$obs';
/**
 * This is a map of array functions which modify the contents of an array. When
 * this happens the observed array is checked for referential and length changes.
 */
var ARRAY_CHANGES = {
    'pop': 1,
    'push': 1,
    'shift': 1,
    'unshift': 1,
    'reverse': 1,
    'splice': 1,
    'sort': 1,
};
/**
 * This is a map of array functions which can return different results when the
 * array is modified with the above functions. When these functions are called
 * the watch function observes all items in the array and it's length.
 */
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
/**
 * A node in a doubly-linked list. The functions in this class are mostly
 * intended for use by the head node. A default head node points to itself and
 * has a null value. A node always has a next or previous node reference.
 */
var Node = /** @class */ (function () {
    /**
     * Creates a new node given a value.
     *
     * @param value The value for the node.
     */
    function Node(value) {
        this.value = value;
        this.next = this.prev = this;
    }
    /**
     * Iterates over the nodes in the linked list and returns the number of nodes
     * in the list.
     *
     * @param iterator The function to call with the value of the node, the
     *    reference to the node (useful for removing the value from the list),
     *    and the index of the value in the list starting at the next node.
     */
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
    /**
     * Inserts this Node after the given node.
     *
     * @param prev The node to insert this Node after.
     */
    Node.prototype.insertAfter = function (prev) {
        this.next = prev.next;
        this.prev = prev;
        this.prev.next = this.next.prev = this;
    };
    /**
     * If this is the head of a list, this function adds a node to the very end
     * of the list. This is also equivalent to adding the given node directly
     * before this node.
     *
     * @param last The node to insert at the end of the list / before this node.
     */
    Node.prototype.push = function (last) {
        last.insertAfter(this.prev);
    };
    /**
     * If this Node is in a list, it removes itself from the list.
     */
    Node.prototype.remove = function () {
        if (!this.isEmpty()) {
            this.next.prev = this.prev;
            this.prev.next = this.next;
            this.prev = this.next = this;
        }
    };
    /**
     * Returns whether the list this node is in is empty.
     */
    Node.prototype.isEmpty = function () {
        return this.next === this;
    };
    /**
     * Returns a new node for the head of the list.
     */
    Node.head = function () {
        return new Node(null);
    };
    return Node;
}());


// CONCATENATED MODULE: ./src/Dependency.ts

/**
 * A dependency is a property of an object or an item in an array.
 */
var Dependency_Dependency = /** @class */ (function () {
    /**
     * Creates a new Dependency.
     *
     * @param observer The observer for the object.
     */
    function Dependency(observer) {
        this.observer = observer;
        this.links = Node.head();
    }
    /**
     * Notifies all observing watchers that this dependency has changed. If any
     * of the watchers are watching for deep (sub) changes the parent dependency
     * is notified.
     *
     * @param notifyParent If a deep watcher is listening on this dependency,
     *    should we notify the parent of the observer?
     * @returns True if a deep watcher was notified.
     */
    Dependency.prototype.notify = function (notifyParent) {
        if (notifyParent === void 0) { notifyParent = false; }
        var deep = false;
        this.links.forEach(function (link) {
            link.watcher.notify();
            deep = deep || link.watcher.deep;
        });
        if (notifyParent && deep && this.observer.parent) {
            this.observer.parent.notify(notifyParent);
        }
        return deep;
    };
    /**
     * Destroys the depdendency removing it from all watchers.
     */
    Dependency.prototype.destroy = function () {
        this.links.forEach(function (link) { return link.remove(); });
    };
    return Dependency;
}());


// CONCATENATED MODULE: ./src/Watcher.ts

/**
 * An array of watcher functions which are currently executing.
 */
var liveWatchers = [];
/**
 * A class which holds a user supplied function and list of observed
 * depdendencies it references. When any of those dependencies change a watcher
 * is notified.
 */
var Watcher_Watcher = /** @class */ (function () {
    /**
     * Creates a new Watcher given an expression, if it's immediate, and if the
     * watches are deep.
     */
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
    /**
     * Determines whether the watch function is currently observing anything for
     * changes.
     */
    Watcher.prototype.isWatching = function () {
        return !this.links.isEmpty();
    };
    /**
     * Notifies the watcher that a dependency has changed.
     */
    Watcher.prototype.notify = function () {
        if (this.evaluating) {
            return;
        }
        this.dirty = true;
        if (this.immediate) {
            this.update();
        }
    };
    /**
     * Executes the function and gathers a new list of dependencies.
     */
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
    /**
     * Stops watching for changes.
     */
    Watcher.prototype.off = function () {
        this.links.forEach(function (link) { return link.remove(); });
    };
    /**
     * Stops watching for changes and marks the watcher as paused.
     */
    Watcher.prototype.pause = function () {
        if (!this.paused) {
            this.off();
            this.paused = true;
        }
    };
    /**
     * Resumes watching for changes if the watcher was paused.
     */
    Watcher.prototype.resume = function () {
        if (this.paused) {
            this.update();
            this.paused = false;
        }
    };
    return Watcher;
}());


// CONCATENATED MODULE: ./src/Link.ts

/**
 * A relationship between a Watcher and Dependency which stores both links so
 * the lists stored in the watcher and dependency can both be removed from
 * instantly.
 */
var Link_Link = /** @class */ (function () {
    /**
     * Creates a new Link given the Watcher and Dependency.
     */
    function Link(watcher, dependency) {
        this.watcher = watcher;
        this.dependency = dependency;
        this.watcherNode = new Node(this);
        this.dependencyNode = new Node(this);
    }
    /**
     * Removes the relationship between the Watcher and Dependency.
     */
    Link.prototype.remove = function () {
        this.watcherNode.remove();
        this.dependencyNode.remove();
    };
    /**
     * Creates a link between the given Watcher and Dependency. If a link already
     * exists, then this function has no effect. If a link does not exist, one is
     * created and added to both the dependency and watcher lists. A link
     * reference is always returned.
     */
    Link.create = function (watcher, dependency) {
        var existing = null;
        dependency.links.forEach(function (link) { return existing = (link.watcher === watcher ? link : existing); });
        if (!existing) {
            existing = new Link(watcher, dependency);
            dependency.links.push(existing.dependencyNode);
            watcher.links.push(existing.watcherNode);
        }
        return existing;
    };
    return Link;
}());


// CONCATENATED MODULE: ./src/handler.ts




/**
 * The handler to pass to the Proxy constructor.
 */
var handler = {
    /**
     * Intercepts the property getting so any watch functions can gather its list
     * of dependencies.
     */
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
    /**
     * Intercepts the property setting so all dependent watchers are notified,
     */
    set: function (target, prop, value, _reciever) {
        if (value !== target[prop]) {
            target[prop] = value;
            var obs = target[PROPERTY];
            obs.notify(prop, true);
        }
        return true;
    },
    /**
     * Intercepts the property delete operator so all dependent watchers no longer
     * listen to changes.
     */
    deleteProperty: function (target, prop) {
        var obs = target[PROPERTY];
        obs.remove(prop);
        return true;
    }
};
/**
 * If a property on an object contains an observable object/array which is not
 * yet being observered - it is replaced with a proxy. The value of the property
 * is returned.
 */
function handleWatching(target, prop, val, obs) {
    var dep = obs.dep(prop);
    liveWatchers.forEach(function (watcher) { return Link_Link.create(watcher, dep); });
    if (isObservable(val) && !isObserved(val)) {
        target[prop] = val = observe(val, { parent: dep });
    }
    return val;
}
/**
 * Returns a function which ensures when its called that all items and the
 * length of the array is watched by any live watchers.
 */
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
/**
 * Returns a function which notifies any watched functions of changes after a
 * mutating array operation is executed.
 */
function handleArrayChange(target, val, obs) {
    return function () {
        var copy = target.slice();
        var result = val.apply(target, arguments);
        var max = Math.max(copy.length, target.length);
        var deepNotified = false;
        for (var i = 0; i < max; i++) {
            if (copy[i] !== target[i]) {
                deepNotified = deepNotified || obs.notify(i);
            }
            if (i >= target.length) {
                obs.remove(i);
            }
        }
        if (target.length !== copy.length) {
            deepNotified = deepNotified || obs.notify('length');
        }
        if (deepNotified && obs.parent) {
            obs.parent.notify(true);
        }
        return result;
    };
}

// CONCATENATED MODULE: ./src/observe.ts



/**
 * Observes the object/array if is not yet observed. An observed object is one
 * that can be used in watch functions and will trigger then when referenced
 * values in the observed object changes.
 *
 * @param input The object/array to observe for changes.
 * @returns The reference to the object/array or the Proxy if it is observable
 *    and has not yet been observed.
 */
function observe(input, _a) {
    var _b = (_a === void 0 ? {} : _a).parent, parent = _b === void 0 ? null : _b;
    if (isObservable(input)) {
        if (!input[PROPERTY]) {
            var proxy = Proxy.revocable(input, handler);
            input = proxy.proxy;
            Object.defineProperty(input, PROPERTY, {
                value: new Observer_Observer(proxy.revoke, parent),
                writable: false,
                configurable: true,
                enumerable: false
            });
        }
    }
    return input;
}
/**
 * Determines whether the given input can be observed.
 *
 * @param input The input to test.
 */
function isObservable(input) {
    return !!(typeof input === 'object' && input !== null);
}
/**
 * Determines whether the given input is currently being observed.
 *
 * @param input The input to check for observation.
 */
function isObserved(input) {
    return !!(typeof input === 'object' && input !== null && input[PROPERTY]);
}

// CONCATENATED MODULE: ./src/Observer.ts



/**
 * An observer is for an object/array and keeps track of all watched properties.
 * If the observer belongs to a sub-object on an observed object then it has a
 * parent. This parent reference is needed for deeply watched objects.
 */
var Observer_Observer = /** @class */ (function () {
    /**
     * Creates a new Observer.
     *
     * @param parent An optional parent dependency.
     */
    function Observer(revoke, parent) {
        if (parent === void 0) { parent = null; }
        this.revoke = revoke;
        this.parent = parent;
        this.deps = Object.create(null);
    }
    /**
     * Returns a Dependency for the given property and creates it if it doesn't
     * exist already.
     *
     * @param prop The name of the property or the index of the array element.
     */
    Observer.prototype.dep = function (prop) {
        var dep = this.deps[prop];
        if (!dep) {
            this.deps[prop] = dep = new Dependency_Dependency(this);
        }
        return dep;
    };
    /**
     * If the given property or array element is being watched, all watchers will
     * be notified.
     *
     * @param prop The name of the property or the index of the array element to
     *    notify of changes.
     * @param notifyParent If a deep watcher is listening on this dependency,
     *    should we notify the parent of the observer?
     * @returns True if a deep watcher was notified.
     */
    Observer.prototype.notify = function (prop, notifyParent) {
        if (notifyParent === void 0) { notifyParent = false; }
        var deps = this.deps;
        if (prop in deps) {
            return deps[prop].notify(notifyParent);
        }
        else if (notifyParent && this.parent) {
            this.parent.notify(notifyParent);
        }
        return false;
    };
    /**
     * Removes the given property or array element so it's no longer observed for
     * changes.
     *
     * @param prop The name of the property or the index of the array element to
     *    cease watching on.
     */
    Observer.prototype.remove = function (prop) {
        var deps = this.deps;
        if (prop in deps) {
            deps[prop].destroy();
            delete deps[prop];
        }
    };
    /**
     * Destroys this observer by destroying all dependents.
     *
     * @param target The object which holds this observer.
     * @param deep If any descendant objects should be destroyed as well.
     * @param revoke If the proxy should be revoked, making the object unusable.
     */
    Observer.prototype.destroy = function (target, deep, revoke) {
        if (deep === void 0) { deep = false; }
        if (revoke === void 0) { revoke = true; }
        var deps = this.deps;
        for (var prop in deps) {
            deps[prop].destroy();
            delete deps[prop];
            if (deep) {
                var value = target[prop];
                if (isObserved(value)) {
                    var obs = value[PROPERTY];
                    obs.destroy(value, deep, revoke);
                }
            }
        }
        if (revoke) {
            this.revoke();
        }
    };
    return Observer;
}());


// CONCATENATED MODULE: ./src/watch.ts

/**
 * Given a function to execute, any observed objects/arrays which are referenced
 * in that function are tracked. If they change the given function will execute
 * again and a new list of dependencies is generated. A Watcher instance is
 * returned which can be used to pause, resume, or stop watching for changes.
 *
 * @param expr The function to execute when any referenced observed values change.
 * @param immediate If the function should executed as soon as a dependent value
 *    changes (true), or simply mark the returned Watcher instance as dirty (false).
 * @param deep If true, not only does the function execute when referenced
 *    values change, but also nested values.
 * @returns A new instance of Watcher.
 */
function watch(expr, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.immediate, immediate = _c === void 0 ? true : _c, _d = _b.deep, deep = _d === void 0 ? false : _d;
    var watcher = new Watcher_Watcher(expr, immediate, deep);
    watcher.update();
    return watcher;
}

// CONCATENATED MODULE: ./src/unobserve.ts


/**
 * Stops all observations for the given variable. Optionally it can travel
 * through all descendant observers and unobserve them as well.
 *
 * @param input The possibly observed object.
 * @param deep If all descendant observers should be unobserved.
 * @param destroy If the proxy should be destroyed, making it unusable.
 * @returns The reference to the value passed to this function.
 */
function unobserve(input, deep, destroy) {
    if (deep === void 0) { deep = false; }
    if (destroy === void 0) { destroy = true; }
    if (isObserved(input)) {
        var obs = input[PROPERTY];
        delete input[PROPERTY];
        obs.destroy(input, deep, destroy);
    }
    return input;
}

// CONCATENATED MODULE: ./src/computed.ts

/**
 * Adds or overrides the given property on the given object so when the property
 * is read a watched expression is ran whch generates and returns a value. If
 * no dependent variables have changed, then a cached is returned.
 *
 * @param target The object to add a proeprty to.
 * @param prop The name of the property to add.
 * @param expr The watched function which should return a value.
 * @returns A new instance of Watcher.
 */
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
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "unobserve", function() { return unobserve; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "computed", function() { return computed; });














/***/ })
/******/ ]);
});
//# sourceMappingURL=scrute.js.map