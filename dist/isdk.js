
/*! isdk 2.6.3 https://github.com/TimeOne-Group/isdk#readme @license GPL-3.0 */
(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var fails$g = function fails(exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$f = fails$g;
	var functionBindNative = !fails$f(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = function () {/* empty */}.bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$2 = functionBindNative;
	var FunctionPrototype$1 = Function.prototype;
	var call$9 = FunctionPrototype$1.call;
	var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$1.bind.bind(call$9, call$9);
	var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$9.apply(fn, arguments);
	  };
	};

	var uncurryThis$i = functionUncurryThis;
	var toString$3 = uncurryThis$i({}.toString);
	var stringSlice$2 = uncurryThis$i(''.slice);
	var classofRaw$2 = function classofRaw(it) {
	  return stringSlice$2(toString$3(it), 8, -1);
	};

	var uncurryThis$h = functionUncurryThis;
	var fails$e = fails$g;
	var classof$9 = classofRaw$2;
	var $Object$4 = Object;
	var split$1 = uncurryThis$h(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$e(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$9(it) === 'String' ? split$1(it, '') : $Object$4(it);
	} : $Object$4;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$5 = function isNullOrUndefined(it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$4 = isNullOrUndefined$5;
	var $TypeError$a = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function requireObjectCoercible(it) {
	  if (isNullOrUndefined$4(it)) throw new $TypeError$a("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$1 = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;
	var toIndexedObject$6 = function toIndexedObject(it) {
	  return IndexedObject$1(requireObjectCoercible$1(it));
	};

	function _iterableToArrayLimit(r, l) {
	  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	  if (null != t) {
	    var e,
	      n,
	      i,
	      u,
	      a = [],
	      f = !0,
	      o = !1;
	    try {
	      if (i = (t = t.call(r)).next, 0 === l) {
	        if (Object(t) !== t) return;
	        f = !1;
	      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
	    } catch (r) {
	      o = !0, n = r;
	    } finally {
	      try {
	        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
	      } finally {
	        if (o) throw n;
	      }
	    }
	    return a;
	  }
	}
	function ownKeys$2(e, r) {
	  var t = Object.keys(e);
	  if (Object.getOwnPropertySymbols) {
	    var o = Object.getOwnPropertySymbols(e);
	    r && (o = o.filter(function (r) {
	      return Object.getOwnPropertyDescriptor(e, r).enumerable;
	    })), t.push.apply(t, o);
	  }
	  return t;
	}
	function _objectSpread2(e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var t = null != arguments[r] ? arguments[r] : {};
	    r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) {
	      _defineProperty(e, r, t[r]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) {
	      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
	    });
	  }
	  return e;
	}
	function _regeneratorRuntime() {
	  _regeneratorRuntime = function () {
	    return e;
	  };
	  var t,
	    e = {},
	    r = Object.prototype,
	    n = r.hasOwnProperty,
	    o = Object.defineProperty || function (t, e, r) {
	      t[e] = r.value;
	    },
	    i = "function" == typeof Symbol ? Symbol : {},
	    a = i.iterator || "@@iterator",
	    c = i.asyncIterator || "@@asyncIterator",
	    u = i.toStringTag || "@@toStringTag";
	  function define(t, e, r) {
	    return Object.defineProperty(t, e, {
	      value: r,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), t[e];
	  }
	  try {
	    define({}, "");
	  } catch (t) {
	    define = function (t, e, r) {
	      return t[e] = r;
	    };
	  }
	  function wrap(t, e, r, n) {
	    var i = e && e.prototype instanceof Generator ? e : Generator,
	      a = Object.create(i.prototype),
	      c = new Context(n || []);
	    return o(a, "_invoke", {
	      value: makeInvokeMethod(t, r, c)
	    }), a;
	  }
	  function tryCatch(t, e, r) {
	    try {
	      return {
	        type: "normal",
	        arg: t.call(e, r)
	      };
	    } catch (t) {
	      return {
	        type: "throw",
	        arg: t
	      };
	    }
	  }
	  e.wrap = wrap;
	  var h = "suspendedStart",
	    l = "suspendedYield",
	    f = "executing",
	    s = "completed",
	    y = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var p = {};
	  define(p, a, function () {
	    return this;
	  });
	  var d = Object.getPrototypeOf,
	    v = d && d(d(values([])));
	  v && v !== r && n.call(v, a) && (p = v);
	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
	  function defineIteratorMethods(t) {
	    ["next", "throw", "return"].forEach(function (e) {
	      define(t, e, function (t) {
	        return this._invoke(e, t);
	      });
	    });
	  }
	  function AsyncIterator(t, e) {
	    function invoke(r, o, i, a) {
	      var c = tryCatch(t[r], t, o);
	      if ("throw" !== c.type) {
	        var u = c.arg,
	          h = u.value;
	        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
	          invoke("next", t, i, a);
	        }, function (t) {
	          invoke("throw", t, i, a);
	        }) : e.resolve(h).then(function (t) {
	          u.value = t, i(u);
	        }, function (t) {
	          return invoke("throw", t, i, a);
	        });
	      }
	      a(c.arg);
	    }
	    var r;
	    o(this, "_invoke", {
	      value: function (t, n) {
	        function callInvokeWithMethodAndArg() {
	          return new e(function (e, r) {
	            invoke(t, n, e, r);
	          });
	        }
	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(e, r, n) {
	    var o = h;
	    return function (i, a) {
	      if (o === f) throw new Error("Generator is already running");
	      if (o === s) {
	        if ("throw" === i) throw a;
	        return {
	          value: t,
	          done: !0
	        };
	      }
	      for (n.method = i, n.arg = a;;) {
	        var c = n.delegate;
	        if (c) {
	          var u = maybeInvokeDelegate(c, n);
	          if (u) {
	            if (u === y) continue;
	            return u;
	          }
	        }
	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
	          if (o === h) throw o = s, n.arg;
	          n.dispatchException(n.arg);
	        } else "return" === n.method && n.abrupt("return", n.arg);
	        o = f;
	        var p = tryCatch(e, r, n);
	        if ("normal" === p.type) {
	          if (o = n.done ? s : l, p.arg === y) continue;
	          return {
	            value: p.arg,
	            done: n.done
	          };
	        }
	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(e, r) {
	    var n = r.method,
	      o = e.iterator[n];
	    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
	    var i = tryCatch(o, e.iterator, r.arg);
	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
	    var a = i.arg;
	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
	  }
	  function pushTryEntry(t) {
	    var e = {
	      tryLoc: t[0]
	    };
	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
	  }
	  function resetTryEntry(t) {
	    var e = t.completion || {};
	    e.type = "normal", delete e.arg, t.completion = e;
	  }
	  function Context(t) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], t.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(e) {
	    if (e || "" === e) {
	      var r = e[a];
	      if (r) return r.call(e);
	      if ("function" == typeof e.next) return e;
	      if (!isNaN(e.length)) {
	        var o = -1,
	          i = function next() {
	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
	            return next.value = t, next.done = !0, next;
	          };
	        return i.next = i;
	      }
	    }
	    throw new TypeError(typeof e + " is not iterable");
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), o(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
	    var e = "function" == typeof t && t.constructor;
	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
	  }, e.mark = function (t) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
	  }, e.awrap = function (t) {
	    return {
	      __await: t
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
	    return this;
	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
	    void 0 === i && (i = Promise);
	    var a = new AsyncIterator(wrap(t, r, n, o), i);
	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
	      return t.done ? t.value : a.next();
	    });
	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
	    return this;
	  }), define(g, "toString", function () {
	    return "[object Generator]";
	  }), e.keys = function (t) {
	    var e = Object(t),
	      r = [];
	    for (var n in e) r.push(n);
	    return r.reverse(), function next() {
	      for (; r.length;) {
	        var t = r.pop();
	        if (t in e) return next.value = t, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, e.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function (e) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
	    },
	    stop: function () {
	      this.done = !0;
	      var t = this.tryEntries[0].completion;
	      if ("throw" === t.type) throw t.arg;
	      return this.rval;
	    },
	    dispatchException: function (e) {
	      if (this.done) throw e;
	      var r = this;
	      function handle(n, o) {
	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
	      }
	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
	        var i = this.tryEntries[o],
	          a = i.completion;
	        if ("root" === i.tryLoc) return handle("end");
	        if (i.tryLoc <= this.prev) {
	          var c = n.call(i, "catchLoc"),
	            u = n.call(i, "finallyLoc");
	          if (c && u) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          } else if (c) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	          } else {
	            if (!u) throw new Error("try statement without catch or finally");
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function (t, e) {
	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
	        var o = this.tryEntries[r];
	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
	          var i = o;
	          break;
	        }
	      }
	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
	      var a = i ? i.completion : {};
	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
	    },
	    complete: function (t, e) {
	      if ("throw" === t.type) throw t.arg;
	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
	    },
	    finish: function (t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
	      }
	    },
	    catch: function (t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.tryLoc === t) {
	          var n = r.completion;
	          if ("throw" === n.type) {
	            var o = n.arg;
	            resetTryEntry(r);
	          }
	          return o;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function (e, r, n) {
	      return this.delegate = {
	        iterator: values(e),
	        resultName: r,
	        nextLoc: n
	      }, "next" === this.method && (this.arg = t), y;
	    }
	  }, e;
	}
	function _toPrimitive(t, r) {
	  if ("object" != typeof t || !t) return t;
	  var e = t[Symbol.toPrimitive];
	  if (void 0 !== e) {
	    var i = e.call(t, r || "default");
	    if ("object" != typeof i) return i;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return ("string" === r ? String : Number)(t);
	}
	function _toPropertyKey(t) {
	  var i = _toPrimitive(t, "string");
	  return "symbol" == typeof i ? i : String(i);
	}
	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, _typeof(o);
	}
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }
	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}
	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	      args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);
	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }
	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }
	      _next(undefined);
	    });
	  };
	}
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}
	function _defineProperty(obj, key, value) {
	  key = _toPropertyKey(key);
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }
	  return target;
	}
	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = _objectWithoutPropertiesLoose(source, excluded);
	  var key, i;
	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }
	  return target;
	}
	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}
	function _toArray(arr) {
	  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
	}
	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}
	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}
	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}
	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _classPrivateFieldGet(receiver, privateMap) {
	  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
	  return _classApplyDescriptorGet(receiver, descriptor);
	}
	function _classPrivateFieldSet(receiver, privateMap, value) {
	  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
	  _classApplyDescriptorSet(receiver, descriptor, value);
	  return value;
	}
	function _classExtractFieldDescriptor(receiver, privateMap, action) {
	  if (!privateMap.has(receiver)) {
	    throw new TypeError("attempted to " + action + " private field on non-instance");
	  }
	  return privateMap.get(receiver);
	}
	function _classApplyDescriptorGet(receiver, descriptor) {
	  if (descriptor.get) {
	    return descriptor.get.call(receiver);
	  }
	  return descriptor.value;
	}
	function _classApplyDescriptorSet(receiver, descriptor, value) {
	  if (descriptor.set) {
	    descriptor.set.call(receiver, value);
	  } else {
	    if (!descriptor.writable) {
	      throw new TypeError("attempted to set read only private field");
	    }
	    descriptor.value = value;
	  }
	}
	function _classPrivateMethodGet(receiver, privateSet, fn) {
	  if (!privateSet.has(receiver)) {
	    throw new TypeError("attempted to get private field on non-instance");
	  }
	  return fn;
	}
	function _checkPrivateRedeclaration(obj, privateCollection) {
	  if (privateCollection.has(obj)) {
	    throw new TypeError("Cannot initialize the same private elements twice on an object");
	  }
	}
	function _classPrivateFieldInitSpec(obj, privateMap, value) {
	  _checkPrivateRedeclaration(obj, privateMap);
	  privateMap.set(obj, value);
	}
	function _classPrivateMethodInitSpec(obj, privateSet) {
	  _checkPrivateRedeclaration(obj, privateSet);
	  privateSet.add(obj);
	}

	var check = function check(it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$e =
	// eslint-disable-next-line es/no-global-this -- safe
	check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window) ||
	// eslint-disable-next-line no-restricted-globals -- safe
	check((typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self) || check(_typeof(commonjsGlobal) == 'object' && commonjsGlobal) || check(_typeof(commonjsGlobal) == 'object' && commonjsGlobal) ||
	// eslint-disable-next-line no-new-func -- fallback
	function () {
	  return this;
	}() || Function('return this')();

	var sharedStore = {exports: {}};

	var isPure = false;

	var global$d = global$e;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$6 = Object.defineProperty;
	var defineGlobalProperty$3 = function defineGlobalProperty(key, value) {
	  try {
	    defineProperty$6(global$d, key, {
	      value: value,
	      configurable: true,
	      writable: true
	    });
	  } catch (error) {
	    global$d[key] = value;
	  }
	  return value;
	};

	var globalThis$1 = global$e;
	var defineGlobalProperty$2 = defineGlobalProperty$3;
	var SHARED = '__core-js_shared__';
	var store$3 = sharedStore.exports = globalThis$1[SHARED] || defineGlobalProperty$2(SHARED, {});
	(store$3.versions || (store$3.versions = [])).push({
	  version: '3.36.0',
	  mode: 'global',
	  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});
	var sharedStoreExports = sharedStore.exports;

	var store$2 = sharedStoreExports;
	var shared$3 = function shared(key, value) {
	  return store$2[key] || (store$2[key] = value || {});
	};

	var requireObjectCoercible = requireObjectCoercible$2;
	var $Object$3 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$3 = function toObject(argument) {
	  return $Object$3(requireObjectCoercible(argument));
	};

	var uncurryThis$g = functionUncurryThis;
	var toObject$2 = toObject$3;
	var hasOwnProperty = uncurryThis$g({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$2(it), key);
	};

	var uncurryThis$f = functionUncurryThis;
	var id$2 = 0;
	var postfix = Math.random();
	var toString$2 = uncurryThis$f(1.0.toString);
	var uid$3 = function uid(key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$2(++id$2 + postfix, 36);
	};

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$c = global$e;
	var userAgent = engineUserAgent;
	var process = global$c.process;
	var Deno = global$c.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;
	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}
	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION = engineV8Version;
	var fails$d = fails$g;
	var global$b = global$e;
	var $String$5 = global$b.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$d(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
	  // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;
	var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && _typeof(Symbol.iterator) == 'symbol';

	var global$a = global$e;
	var shared$2 = shared$3;
	var hasOwn$b = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
	var _Symbol = global$a.Symbol;
	var WellKnownSymbolsStore = shared$2('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? _Symbol['for'] || _Symbol : _Symbol && _Symbol.withoutSetter || uid$2;
	var wellKnownSymbol$e = function wellKnownSymbol(name) {
	  if (!hasOwn$b(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$b(_Symbol, name) ? _Symbol[name] : createWellKnownSymbol('Symbol.' + name);
	  }
	  return WellKnownSymbolsStore[name];
	};

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = (typeof document === "undefined" ? "undefined" : _typeof(document)) == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var isCallable$i = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$h = isCallable$i;
	var isObject$f = function isObject(it) {
	  return _typeof(it) == 'object' ? it !== null : isCallable$h(it);
	};

	var isObject$e = isObject$f;
	var $String$4 = String;
	var $TypeError$9 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$a = function anObject(argument) {
	  if (isObject$e(argument)) return argument;
	  throw new $TypeError$9($String$4(argument) + ' is not an object');
	};

	var objectDefineProperties = {};

	var fails$c = fails$g;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$c(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, {
	    get: function get() {
	      return 7;
	    }
	  })[1] !== 7;
	});

	var DESCRIPTORS$b = descriptors;
	var fails$b = fails$g;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$b && fails$b(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () {/* empty */}, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var objectDefineProperty = {};

	var global$9 = global$e;
	var isObject$d = isObject$f;
	var document$1 = global$9.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$d(document$1) && isObject$d(document$1.createElement);
	var documentCreateElement$2 = function documentCreateElement(it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$a = descriptors;
	var fails$a = fails$g;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$a && !fails$a(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function get() {
	      return 7;
	    }
	  }).a !== 7;
	});

	var NATIVE_BIND$1 = functionBindNative;
	var call$8 = Function.prototype.call;
	var functionCall = NATIVE_BIND$1 ? call$8.bind(call$8) : function () {
	  return call$8.apply(call$8, arguments);
	};

	var global$8 = global$e;
	var isCallable$g = isCallable$i;
	var aFunction = function aFunction(argument) {
	  return isCallable$g(argument) ? argument : undefined;
	};
	var getBuiltIn$4 = function getBuiltIn(namespace, method) {
	  return arguments.length < 2 ? aFunction(global$8[namespace]) : global$8[namespace] && global$8[namespace][method];
	};

	var uncurryThis$e = functionUncurryThis;
	var objectIsPrototypeOf = uncurryThis$e({}.isPrototypeOf);

	var getBuiltIn$3 = getBuiltIn$4;
	var isCallable$f = isCallable$i;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var $Object$2 = Object;
	var isSymbol$2 = USE_SYMBOL_AS_UID ? function (it) {
	  return _typeof(it) == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$3('Symbol');
	  return isCallable$f($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$2(it));
	};

	var $String$3 = String;
	var tryToString$3 = function tryToString(argument) {
	  try {
	    return $String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$e = isCallable$i;
	var tryToString$2 = tryToString$3;
	var $TypeError$8 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$4 = function aCallable(argument) {
	  if (isCallable$e(argument)) return argument;
	  throw new $TypeError$8(tryToString$2(argument) + ' is not a function');
	};

	var aCallable$3 = aCallable$4;
	var isNullOrUndefined$3 = isNullOrUndefined$5;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$3 = function getMethod(V, P) {
	  var func = V[P];
	  return isNullOrUndefined$3(func) ? undefined : aCallable$3(func);
	};

	var call$7 = functionCall;
	var isCallable$d = isCallable$i;
	var isObject$c = isObject$f;
	var $TypeError$7 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function ordinaryToPrimitive(input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$d(fn = input.toString) && !isObject$c(val = call$7(fn, input))) return val;
	  if (isCallable$d(fn = input.valueOf) && !isObject$c(val = call$7(fn, input))) return val;
	  if (pref !== 'string' && isCallable$d(fn = input.toString) && !isObject$c(val = call$7(fn, input))) return val;
	  throw new $TypeError$7("Can't convert object to primitive value");
	};

	var call$6 = functionCall;
	var isObject$b = isObject$f;
	var isSymbol$1 = isSymbol$2;
	var getMethod$2 = getMethod$3;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$d = wellKnownSymbol$e;
	var $TypeError$6 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$d('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function toPrimitive(input, pref) {
	  if (!isObject$b(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$6(exoticToPrim, input, pref);
	    if (!isObject$b(result) || isSymbol$1(result)) return result;
	    throw new $TypeError$6("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function toPropertyKey(argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var DESCRIPTORS$9 = descriptors;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$9 = anObject$a;
	var toPropertyKey$1 = toPropertyKey$2;
	var $TypeError$5 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$9 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey$1(P);
	  anObject$9(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  }
	  return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey$1(P);
	  anObject$9(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$5('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$1 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$2 = function toIntegerOrInfinity(argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function toAbsoluteIndex(index, length) {
	  var integer = toIntegerOrInfinity$1(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity = toIntegerOrInfinity$2;
	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function toLength(argument) {
	  var len = toIntegerOrInfinity(argument);
	  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$3 = function lengthOfArrayLike(obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$5 = toIndexedObject$6;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$2 = lengthOfArrayLike$3;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function createMethod(IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$5($this);
	    var length = lengthOfArrayLike$2(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	      // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};
	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var hiddenKeys$5 = {};

	var uncurryThis$d = functionUncurryThis;
	var hasOwn$a = hasOwnProperty_1;
	var toIndexedObject$4 = toIndexedObject$6;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$5;
	var push$2 = uncurryThis$d([].push);
	var objectKeysInternal = function objectKeysInternal(object, names) {
	  var O = toIndexedObject$4(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$a(hiddenKeys$4, key) && hasOwn$a(O, key) && push$2(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$a(O, key = names[i++])) {
	    ~indexOf(result, key) || push$2(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys$1(O, enumBugKeys$2);
	};

	var DESCRIPTORS$8 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$8 = anObject$a;
	var toIndexedObject$3 = toIndexedObject$6;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$8 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$8(O);
	  var props = toIndexedObject$3(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$2 = getBuiltIn$4;
	var html$1 = getBuiltIn$2('document', 'documentElement');

	var shared$1 = shared$3;
	var uid$1 = uid$3;
	var keys = shared$1('keys');
	var sharedKey$3 = function sharedKey(key) {
	  return keys[key] || (keys[key] = uid$1(key));
	};

	/* global ActiveXObject -- old IE, WSH */
	var anObject$7 = anObject$a;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$3 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$2 = sharedKey$3;
	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$2('IE_PROTO');
	var EmptyConstructor = function EmptyConstructor() {/* empty */};
	var scriptTag = function scriptTag(content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var _NullProtoObject = function NullProtoObject() {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) {/* ignore */}
	  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys$1.length;
	  while (length--) delete _NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
	  return _NullProtoObject();
	};
	hiddenKeys$3[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$7(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = _NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var wellKnownSymbol$c = wellKnownSymbol$e;
	var create$2 = objectCreate;
	var defineProperty$5 = objectDefineProperty.f;
	var UNSCOPABLES = wellKnownSymbol$c('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
	  defineProperty$5(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$2(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function addToUnscopables(key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var global$7 = global$e;
	var isCallable$c = isCallable$i;
	var WeakMap$2 = global$7.WeakMap;
	var weakMapBasicDetection = isCallable$c(WeakMap$2) && /native code/.test(String(WeakMap$2));

	var createPropertyDescriptor$4 = function createPropertyDescriptor(bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var DESCRIPTORS$7 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$4;
	var createNonEnumerableProperty$4 = DESCRIPTORS$7 ? function (object, key, value) {
	  return definePropertyModule$2.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$6 = global$e;
	var isObject$a = isObject$f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
	var hasOwn$9 = hasOwnProperty_1;
	var shared = sharedStoreExports;
	var sharedKey$1 = sharedKey$3;
	var hiddenKeys$2 = hiddenKeys$5;
	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$2 = global$6.TypeError;
	var WeakMap$1 = global$6.WeakMap;
	var set, get, has;
	var enforce = function enforce(it) {
	  return has(it) ? get(it) : set(it, {});
	};
	var getterFor = function getterFor(TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$a(it) || (state = get(it)).type !== TYPE) {
	      throw new TypeError$2('Incompatible receiver, ' + TYPE + ' required');
	    }
	    return state;
	  };
	};
	if (NATIVE_WEAK_MAP || shared.state) {
	  var store$1 = shared.state || (shared.state = new WeakMap$1());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store$1.get = store$1.get;
	  store$1.has = store$1.has;
	  store$1.set = store$1.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function set(it, metadata) {
	    if (store$1.has(it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store$1.set(it, metadata);
	    return metadata;
	  };
	  get = function get(it) {
	    return store$1.get(it) || {};
	  };
	  has = function has(it) {
	    return store$1.has(it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$2[STATE] = true;
	  set = function set(it, metadata) {
	    if (hasOwn$9(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$3(it, STATE, metadata);
	    return metadata;
	  };
	  get = function get(it) {
	    return hasOwn$9(it, STATE) ? it[STATE] : {};
	  };
	  has = function has(it) {
	    return hasOwn$9(it, STATE);
	  };
	}
	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var objectGetOwnPropertyDescriptor = {};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({
	  1: 2
	}, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var DESCRIPTORS$6 = descriptors;
	var call$5 = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$4;
	var toIndexedObject$2 = toIndexedObject$6;
	var toPropertyKey = toPropertyKey$2;
	var hasOwn$8 = hasOwnProperty_1;
	var IE8_DOM_DEFINE = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$2(O);
	  P = toPropertyKey(P);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) {/* empty */}
	  if (hasOwn$8(O, P)) return createPropertyDescriptor$2(!call$5(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$5 = descriptors;
	var hasOwn$7 = hasOwnProperty_1;
	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;
	var EXISTS = hasOwn$7(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && function something() {/* empty */}.name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || DESCRIPTORS$5 && getDescriptor(FunctionPrototype, 'name').configurable);
	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$c = functionUncurryThis;
	var isCallable$b = isCallable$i;
	var store = sharedStoreExports;
	var functionToString = uncurryThis$c(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$b(store.inspectSource)) {
	  store.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}
	var inspectSource$2 = store.inspectSource;

	var uncurryThis$b = functionUncurryThis;
	var fails$9 = fails$g;
	var isCallable$a = isCallable$i;
	var hasOwn$6 = hasOwnProperty_1;
	var DESCRIPTORS$4 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule$3 = internalState;
	var enforceInternalState = InternalStateModule$3.enforce;
	var getInternalState$1 = InternalStateModule$3.get;
	var $String$2 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;
	var stringSlice$1 = uncurryThis$b(''.slice);
	var replace$1 = uncurryThis$b(''.replace);
	var join$1 = uncurryThis$b([].join);
	var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$9(function () {
	  return defineProperty$4(function () {/* empty */}, 'length', {
	    value: 8
	  }).length !== 8;
	});
	var TEMPLATE = String(String).split('String');
	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice$1($String$2(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$1($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$6(value, 'name') || CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name) {
	    if (DESCRIPTORS$4) defineProperty$4(value, 'name', {
	      value: name,
	      configurable: true
	    });else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$6(options, 'arity') && value.length !== options.arity) {
	    defineProperty$4(value, 'length', {
	      value: options.arity
	    });
	  }
	  try {
	    if (options && hasOwn$6(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$4) defineProperty$4(value, 'prototype', {
	        writable: false
	      });
	      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) {/* empty */}
	  var state = enforceInternalState(value);
	  if (!hasOwn$6(state, 'source')) {
	    state.source = join$1(TEMPLATE, typeof name == 'string' ? name : '');
	  }
	  return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$a(this) && getInternalState$1(this).source || inspectSource$1(this);
	}, 'toString');
	var makeBuiltInExports = makeBuiltIn$3.exports;

	var isCallable$9 = isCallable$i;
	var definePropertyModule$1 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltInExports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;
	var defineBuiltIn$7 = function defineBuiltIn(O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$9(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
	    } catch (error) {/* empty */}
	    if (simple) O[key] = value;else definePropertyModule$1.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  }
	  return O;
	};

	var objectGetOwnPropertyNames = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$1 = getBuiltIn$4;
	var uncurryThis$a = functionUncurryThis;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$6 = anObject$a;
	var concat = uncurryThis$a([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$1.f(anObject$6(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$5 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var copyConstructorProperties$1 = function copyConstructorProperties(target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$5(target, key) && !(exceptions && hasOwn$5(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$8 = fails$g;
	var isCallable$8 = isCallable$i;
	var replacement = /#|\.prototype\./;
	var isForced$2 = function isForced(feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true : value === NATIVE ? false : isCallable$8(detection) ? fails$8(detection) : !!detection;
	};
	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};
	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';
	var isForced_1 = isForced$2;

	var global$5 = global$e;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
	var defineBuiltIn$6 = defineBuiltIn$7;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced$1 = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function _export(options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$5;
	  } else if (STATIC) {
	    target = global$5[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = global$5[TARGET] && global$5[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (_typeof(sourceProperty) == _typeof(targetProperty)) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty$2(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$6(target, key, sourceProperty, options);
	  }
	};

	var fails$7 = fails$g;
	var correctPrototypeGetter = !fails$7(function () {
	  function F() {/* empty */}
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$4 = hasOwnProperty_1;
	var isCallable$7 = isCallable$i;
	var toObject$1 = toObject$3;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object$1 = Object;
	var ObjectPrototype = $Object$1.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
	  var object = toObject$1(O);
	  if (hasOwn$4(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$7(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  }
	  return object instanceof $Object$1 ? ObjectPrototype : null;
	};

	var fails$6 = fails$g;
	var isCallable$6 = isCallable$i;
	var isObject$9 = isObject$f;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var defineBuiltIn$5 = defineBuiltIn$7;
	var wellKnownSymbol$b = wellKnownSymbol$e;
	var ITERATOR$7 = wellKnownSymbol$b('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}
	var NEW_ITERATOR_PROTOTYPE = !isObject$9(IteratorPrototype$2) || fails$6(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
	});
	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$6(IteratorPrototype$2[ITERATOR$7])) {
	  defineBuiltIn$5(IteratorPrototype$2, ITERATOR$7, function () {
	    return this;
	  });
	}
	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$3 = objectDefineProperty.f;
	var hasOwn$3 = hasOwnProperty_1;
	var wellKnownSymbol$a = wellKnownSymbol$e;
	var TO_STRING_TAG$2 = wellKnownSymbol$a('toStringTag');
	var setToStringTag$5 = function setToStringTag(target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$3(target, TO_STRING_TAG$2)) {
	    defineProperty$3(target, TO_STRING_TAG$2, {
	      configurable: true,
	      value: TAG
	    });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$1 = objectCreate;
	var createPropertyDescriptor$1 = createPropertyDescriptor$4;
	var setToStringTag$4 = setToStringTag$5;
	var Iterators$4 = iterators;
	var returnThis$1 = function returnThis() {
	  return this;
	};
	var iteratorCreateConstructor = function iteratorCreateConstructor(IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
	    next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next)
	  });
	  setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var uncurryThis$9 = functionUncurryThis;
	var aCallable$2 = aCallable$4;
	var functionUncurryThisAccessor = function functionUncurryThisAccessor(object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$9(aCallable$2(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) {/* empty */}
	};

	var isObject$8 = isObject$f;
	var isPossiblePrototype$1 = function isPossiblePrototype(argument) {
	  return isObject$8(argument) || argument === null;
	};

	var isPossiblePrototype = isPossiblePrototype$1;
	var $String$1 = String;
	var $TypeError$4 = TypeError;
	var aPossiblePrototype$1 = function aPossiblePrototype(argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError$4("Can't set " + $String$1(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = functionUncurryThisAccessor;
	var anObject$5 = anObject$a;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {/* empty */}
	  return function setPrototypeOf(O, proto) {
	    anObject$5(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$3 = _export;
	var call$4 = functionCall;
	var FunctionName = functionName;
	var isCallable$5 = isCallable$i;
	var createIteratorConstructor$1 = iteratorCreateConstructor;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf$1 = objectSetPrototypeOf;
	var setToStringTag$3 = setToStringTag$5;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
	var defineBuiltIn$4 = defineBuiltIn$7;
	var wellKnownSymbol$9 = wellKnownSymbol$e;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;
	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$6 = wellKnownSymbol$9('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';
	var returnThis = function returnThis() {
	  return this;
	};
	var iteratorDefine = function iteratorDefine(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$1(IteratorConstructor, NAME, next);
	  var getIterationMethod = function getIterationMethod(KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS:
	        return function keys() {
	          return new IteratorConstructor(this, KIND);
	        };
	      case VALUES:
	        return function values() {
	          return new IteratorConstructor(this, KIND);
	        };
	      case ENTRIES:
	        return function entries() {
	          return new IteratorConstructor(this, KIND);
	        };
	    }
	    return function () {
	      return new IteratorConstructor(this);
	    };
	  };
	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$6] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$1) {
	          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable$5(CurrentIteratorPrototype[ITERATOR$6])) {
	          defineBuiltIn$4(CurrentIteratorPrototype, ITERATOR$6, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$3(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() {
	        return call$4(nativeIterator, this);
	      };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        defineBuiltIn$4(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$3({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
	    defineBuiltIn$4(IterablePrototype, ITERATOR$6, defaultIterator, {
	      name: DEFAULT
	    });
	  }
	  Iterators$3[NAME] = defaultIterator;
	  return methods;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$2 = function createIterResultObject(value, done) {
	  return {
	    value: value,
	    done: done
	  };
	};

	var toIndexedObject$1 = toIndexedObject$6;
	var addToUnscopables = addToUnscopables$1;
	var Iterators$2 = iterators;
	var InternalStateModule$2 = internalState;
	var defineProperty$2 = objectDefineProperty.f;
	var defineIterator = iteratorDefine;
	var createIterResultObject$1 = createIterResultObject$2;
	var DESCRIPTORS$3 = descriptors;
	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$2(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$1(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind
	  });
	  // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject$1(undefined, true);
	  }
	  switch (state.kind) {
	    case 'keys':
	      return createIterResultObject$1(index, false);
	    case 'values':
	      return createIterResultObject$1(target[index], false);
	  }
	  return createIterResultObject$1([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators$2.Arguments = Iterators$2.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$3 && values.name !== 'values') try {
	  defineProperty$2(values, 'name', {
	    value: 'values'
	  });
	} catch (error) {/* empty */}

	var wellKnownSymbol$8 = wellKnownSymbol$e;
	var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag');
	var test = {};
	test[TO_STRING_TAG$1] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$4 = isCallable$i;
	var classofRaw$1 = classofRaw$2;
	var wellKnownSymbol$7 = wellKnownSymbol$e;
	var TO_STRING_TAG = wellKnownSymbol$7('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw$1(function () {
	  return arguments;
	}()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (error) {/* empty */}
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$8 = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	  // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw$1(O)
	  // ES3 arguments fallback
	  : (result = classofRaw$1(O)) === 'Object' && isCallable$4(O.callee) ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$7 = classof$8;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$7(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$3 = defineBuiltIn$7;
	var toString$1 = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$3(Object.prototype, 'toString', toString$1, {
	    unsafe: true
	  });
	}

	var internalMetadata = {exports: {}};

	var objectGetOwnPropertyNamesExternal = {};

	var uncurryThis$8 = functionUncurryThis;
	var arraySlice$2 = uncurryThis$8([].slice);

	/* eslint-disable es/no-object-getownpropertynames -- safe */
	var classof$6 = classofRaw$2;
	var toIndexedObject = toIndexedObject$6;
	var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var arraySlice$1 = arraySlice$2;
	var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
	var getWindowNames = function getWindowNames(it) {
	  try {
	    return $getOwnPropertyNames(it);
	  } catch (error) {
	    return arraySlice$1(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$6(it) === 'Window' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
	};

	// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
	var fails$5 = fails$g;
	var arrayBufferNonExtensible = fails$5(function () {
	  if (typeof ArrayBuffer == 'function') {
	    var buffer = new ArrayBuffer(8);
	    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
	    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', {
	      value: 8
	    });
	  }
	});

	var fails$4 = fails$g;
	var isObject$7 = isObject$f;
	var classof$5 = classofRaw$2;
	var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

	// eslint-disable-next-line es/no-object-isextensible -- safe
	var $isExtensible = Object.isExtensible;
	var FAILS_ON_PRIMITIVES = fails$4(function () {
	  $isExtensible(1);
	});

	// `Object.isExtensible` method
	// https://tc39.es/ecma262/#sec-object.isextensible
	var objectIsExtensible = FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE ? function isExtensible(it) {
	  if (!isObject$7(it)) return false;
	  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$5(it) === 'ArrayBuffer') return false;
	  return $isExtensible ? $isExtensible(it) : true;
	} : $isExtensible;

	var fails$3 = fails$g;
	var freezing = !fails$3(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var $$2 = _export;
	var uncurryThis$7 = functionUncurryThis;
	var hiddenKeys = hiddenKeys$5;
	var isObject$6 = isObject$f;
	var hasOwn$2 = hasOwnProperty_1;
	var defineProperty$1 = objectDefineProperty.f;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
	var isExtensible = objectIsExtensible;
	var uid = uid$3;
	var FREEZING = freezing;
	var REQUIRED = false;
	var METADATA = uid('meta');
	var id$1 = 0;
	var setMetadata = function setMetadata(it) {
	  defineProperty$1(it, METADATA, {
	    value: {
	      objectID: 'O' + id$1++,
	      // object ID
	      weakData: {} // weak collections IDs
	    }
	  });
	};
	var fastKey = function fastKey(it, create) {
	  // return a primitive with prefix
	  if (!isObject$6(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!hasOwn$2(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	    // return object ID
	  }
	  return it[METADATA].objectID;
	};
	var getWeakData$1 = function getWeakData(it, create) {
	  if (!hasOwn$2(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	    // return the store of weak collections IDs
	  }
	  return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function onFreeze(it) {
	  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn$2(it, METADATA)) setMetadata(it);
	  return it;
	};
	var enable = function enable() {
	  meta.enable = function () {/* empty */};
	  REQUIRED = true;
	  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
	  var splice = uncurryThis$7([].splice);
	  var test = {};
	  test[METADATA] = 1;

	  // prevent exposing of metadata key
	  if (getOwnPropertyNames(test).length) {
	    getOwnPropertyNamesModule.f = function (it) {
	      var result = getOwnPropertyNames(it);
	      for (var i = 0, length = result.length; i < length; i++) {
	        if (result[i] === METADATA) {
	          splice(result, i, 1);
	          break;
	        }
	      }
	      return result;
	    };
	    $$2({
	      target: 'Object',
	      stat: true,
	      forced: true
	    }, {
	      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
	    });
	  }
	};
	var meta = internalMetadata.exports = {
	  enable: enable,
	  fastKey: fastKey,
	  getWeakData: getWeakData$1,
	  onFreeze: onFreeze
	};
	hiddenKeys[METADATA] = true;
	var internalMetadataExports = internalMetadata.exports;

	var classofRaw = classofRaw$2;
	var uncurryThis$6 = functionUncurryThis;
	var functionUncurryThisClause = function functionUncurryThisClause(fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return uncurryThis$6(fn);
	};

	var uncurryThis$5 = functionUncurryThisClause;
	var aCallable$1 = aCallable$4;
	var NATIVE_BIND = functionBindNative;
	var bind$3 = uncurryThis$5(uncurryThis$5.bind);

	// optional / simple context binding
	var functionBindContext = function functionBindContext(fn, that) {
	  aCallable$1(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$3(fn, that) : function /* ...args */
	  () {
	    return fn.apply(that, arguments);
	  };
	};

	var wellKnownSymbol$6 = wellKnownSymbol$e;
	var Iterators$1 = iterators;
	var ITERATOR$5 = wellKnownSymbol$6('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function isArrayIteratorMethod(it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$5] === it);
	};

	var classof$4 = classof$8;
	var getMethod$1 = getMethod$3;
	var isNullOrUndefined$2 = isNullOrUndefined$5;
	var Iterators = iterators;
	var wellKnownSymbol$5 = wellKnownSymbol$e;
	var ITERATOR$4 = wellKnownSymbol$5('iterator');
	var getIteratorMethod$3 = function getIteratorMethod(it) {
	  if (!isNullOrUndefined$2(it)) return getMethod$1(it, ITERATOR$4) || getMethod$1(it, '@@iterator') || Iterators[classof$4(it)];
	};

	var call$3 = functionCall;
	var aCallable = aCallable$4;
	var anObject$4 = anObject$a;
	var tryToString$1 = tryToString$3;
	var getIteratorMethod$2 = getIteratorMethod$3;
	var $TypeError$3 = TypeError;
	var getIterator$2 = function getIterator(argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject$4(call$3(iteratorMethod, argument));
	  throw new $TypeError$3(tryToString$1(argument) + ' is not iterable');
	};

	var call$2 = functionCall;
	var anObject$3 = anObject$a;
	var getMethod = getMethod$3;
	var iteratorClose$1 = function iteratorClose(iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$3(iterator);
	  try {
	    innerResult = getMethod(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$2(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$3(innerResult);
	  return value;
	};

	var bind$2 = functionBindContext;
	var call$1 = functionCall;
	var anObject$2 = anObject$a;
	var tryToString = tryToString$3;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var lengthOfArrayLike$1 = lengthOfArrayLike$3;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var getIterator$1 = getIterator$2;
	var getIteratorMethod$1 = getIteratorMethod$3;
	var iteratorClose = iteratorClose$1;
	var $TypeError$2 = TypeError;
	var Result = function Result(stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};
	var ResultPrototype = Result.prototype;
	var iterate$2 = function iterate(iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$2(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;
	  var stop = function stop(condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };
	  var callFn = function callFn(value) {
	    if (AS_ENTRIES) {
	      anObject$2(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    }
	    return INTERRUPTED ? fn(value, stop) : fn(value);
	  };
	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod$1(iterable);
	    if (!iterFn) throw new $TypeError$2(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$1(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$1(ResultPrototype, result)) return result;
	      }
	      return new Result(false);
	    }
	    iterator = getIterator$1(iterable, iterFn);
	  }
	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call$1(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (_typeof(result) == 'object' && result && isPrototypeOf$1(ResultPrototype, result)) return result;
	  }
	  return new Result(false);
	};

	var isPrototypeOf = objectIsPrototypeOf;
	var $TypeError$1 = TypeError;
	var anInstance$3 = function anInstance(it, Prototype) {
	  if (isPrototypeOf(Prototype, it)) return it;
	  throw new $TypeError$1('Incorrect invocation');
	};

	var wellKnownSymbol$4 = wellKnownSymbol$e;
	var ITERATOR$3 = wellKnownSymbol$4('iterator');
	var SAFE_CLOSING = false;
	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function next() {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function _return() {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$3] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {/* empty */}
	var checkCorrectnessOfIteration$1 = function checkCorrectnessOfIteration(exec, SKIP_CLOSING) {
	  try {
	    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  } catch (error) {
	    return false;
	  } // workaround of old WebKit + `eval` bug
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$3] = function () {
	      return {
	        next: function next() {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) {/* empty */}
	  return ITERATION_SUPPORT;
	};

	var isCallable$3 = isCallable$i;
	var isObject$5 = isObject$f;
	var setPrototypeOf = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$1 = function inheritIfRequired($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	  // it can work only with native `setPrototypeOf`
	  setPrototypeOf &&
	  // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	  isCallable$3(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$5(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var $$1 = _export;
	var global$4 = global$e;
	var uncurryThis$4 = functionUncurryThis;
	var isForced = isForced_1;
	var defineBuiltIn$2 = defineBuiltIn$7;
	var InternalMetadataModule = internalMetadataExports;
	var iterate$1 = iterate$2;
	var anInstance$2 = anInstance$3;
	var isCallable$2 = isCallable$i;
	var isNullOrUndefined$1 = isNullOrUndefined$5;
	var isObject$4 = isObject$f;
	var fails$2 = fails$g;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
	var setToStringTag$2 = setToStringTag$5;
	var inheritIfRequired = inheritIfRequired$1;
	var collection$1 = function collection(CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global$4[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};
	  var fixMethod = function fixMethod(KEY) {
	    var uncurriedNativeMethod = uncurryThis$4(NativePrototype[KEY]);
	    defineBuiltIn$2(NativePrototype, KEY, KEY === 'add' ? function add(value) {
	      uncurriedNativeMethod(this, value === 0 ? 0 : value);
	      return this;
	    } : KEY === 'delete' ? function (key) {
	      return IS_WEAK && !isObject$4(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	    } : KEY === 'get' ? function get(key) {
	      return IS_WEAK && !isObject$4(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	    } : KEY === 'has' ? function has(key) {
	      return IS_WEAK && !isObject$4(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	    } : function set(key, value) {
	      uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
	      return this;
	    });
	  };
	  var REPLACE = isForced(CONSTRUCTOR_NAME, !isCallable$2(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$2(function () {
	    new NativeConstructor().entries().next();
	  })));
	  if (REPLACE) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    InternalMetadataModule.enable();
	  } else if (isForced(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails$2(function () {
	      instance.has(1);
	    });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new -- required for testing
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
	      new NativeConstructor(iterable);
	    });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails$2(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance$2(dummy, NativePrototype);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (!isNullOrUndefined$1(iterable)) iterate$1(iterable, that[ADDER], {
	          that: that,
	          AS_ENTRIES: IS_MAP
	        });
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }
	  exported[CONSTRUCTOR_NAME] = Constructor;
	  $$1({
	    global: true,
	    constructor: true,
	    forced: Constructor !== NativeConstructor
	  }, exported);
	  setToStringTag$2(Constructor, CONSTRUCTOR_NAME);
	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
	  return Constructor;
	};

	var defineBuiltIn$1 = defineBuiltIn$7;
	var defineBuiltIns$2 = function defineBuiltIns(target, src, options) {
	  for (var key in src) defineBuiltIn$1(target, key, src[key], options);
	  return target;
	};

	var classof$3 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$1 = Array.isArray || function isArray(argument) {
	  return classof$3(argument) === 'Array';
	};

	var uncurryThis$3 = functionUncurryThis;
	var fails$1 = fails$g;
	var isCallable$1 = isCallable$i;
	var classof$2 = classof$8;
	var getBuiltIn = getBuiltIn$4;
	var inspectSource = inspectSource$2;
	var noop = function noop() {/* empty */};
	var construct = getBuiltIn('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis$3(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);
	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$1(argument)) return false;
	  try {
	    construct(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};
	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$1(argument)) return false;
	  switch (classof$2(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction':
	      return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};
	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$1 = !construct || fails$1(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
	    called = true;
	  }) || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray = isArray$1;
	var isConstructor = isConstructor$1;
	var isObject$3 = isObject$f;
	var wellKnownSymbol$3 = wellKnownSymbol$e;
	var SPECIES = wellKnownSymbol$3('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function arraySpeciesConstructor(originalArray) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;else if (isObject$3(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }
	  return C === undefined ? $Array : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$1 = function arraySpeciesCreate(originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind$1 = functionBindContext;
	var uncurryThis$2 = functionUncurryThis;
	var IndexedObject = indexedObject;
	var toObject = toObject$3;
	var lengthOfArrayLike = lengthOfArrayLike$3;
	var arraySpeciesCreate = arraySpeciesCreate$1;
	var push$1 = uncurryThis$2([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod = function createMethod(TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(self);
	    var boundFunction = bind$1(callbackfn, that);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3:
	            return true;
	          // some
	          case 5:
	            return value;
	          // find
	          case 6:
	            return index;
	          // findIndex
	          case 2:
	            push$1(target, value);
	          // filter
	        } else switch (TYPE) {
	          case 4:
	            return false;
	          // every
	          case 7:
	            push$1(target, value);
	          // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};
	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod(7)
	};

	var uncurryThis$1 = functionUncurryThis;
	var defineBuiltIns$1 = defineBuiltIns$2;
	var getWeakData = internalMetadataExports.getWeakData;
	var anInstance$1 = anInstance$3;
	var anObject$1 = anObject$a;
	var isNullOrUndefined = isNullOrUndefined$5;
	var isObject$2 = isObject$f;
	var iterate = iterate$2;
	var ArrayIterationModule = arrayIteration;
	var hasOwn$1 = hasOwnProperty_1;
	var InternalStateModule$1 = internalState;
	var setInternalState$1 = InternalStateModule$1.set;
	var internalStateGetterFor = InternalStateModule$1.getterFor;
	var find$1 = ArrayIterationModule.find;
	var findIndex = ArrayIterationModule.findIndex;
	var splice$1 = uncurryThis$1([].splice);
	var id = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function uncaughtFrozenStore(state) {
	  return state.frozen || (state.frozen = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function UncaughtFrozenStore() {
	  this.entries = [];
	};
	var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
	  return find$1(store.entries, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function get(key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function has(key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function set(key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;else this.entries.push([key, value]);
	  },
	  'delete': function _delete(key) {
	    var index = findIndex(this.entries, function (it) {
	      return it[0] === key;
	    });
	    if (~index) splice$1(this.entries, index, 1);
	    return !!~index;
	  }
	};
	var collectionWeak$1 = {
	  getConstructor: function getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var Constructor = wrapper(function (that, iterable) {
	      anInstance$1(that, Prototype);
	      setInternalState$1(that, {
	        type: CONSTRUCTOR_NAME,
	        id: id++,
	        frozen: undefined
	      });
	      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], {
	        that: that,
	        AS_ENTRIES: IS_MAP
	      });
	    });
	    var Prototype = Constructor.prototype;
	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var define = function define(that, key, value) {
	      var state = getInternalState(that);
	      var data = getWeakData(anObject$1(key), true);
	      if (data === true) uncaughtFrozenStore(state).set(key, value);else data[state.id] = value;
	      return that;
	    };
	    defineBuiltIns$1(Prototype, {
	      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
	      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
	      'delete': function _delete(key) {
	        var state = getInternalState(this);
	        if (!isObject$2(key)) return false;
	        var data = getWeakData(key);
	        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
	        return data && hasOwn$1(data, state.id) && delete data[state.id];
	      },
	      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
	      // https://tc39.es/ecma262/#sec-weakset.prototype.has
	      has: function has(key) {
	        var state = getInternalState(this);
	        if (!isObject$2(key)) return false;
	        var data = getWeakData(key);
	        if (data === true) return uncaughtFrozenStore(state).has(key);
	        return data && hasOwn$1(data, state.id);
	      }
	    });
	    defineBuiltIns$1(Prototype, IS_MAP ? {
	      // `WeakMap.prototype.get(key)` method
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
	      get: function get(key) {
	        var state = getInternalState(this);
	        if (isObject$2(key)) {
	          var data = getWeakData(key);
	          if (data === true) return uncaughtFrozenStore(state).get(key);
	          return data ? data[state.id] : undefined;
	        }
	      },
	      // `WeakMap.prototype.set(key, value)` method
	      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
	      set: function set(key, value) {
	        return define(this, key, value);
	      }
	    } : {
	      // `WeakSet.prototype.add(value)` method
	      // https://tc39.es/ecma262/#sec-weakset.prototype.add
	      add: function add(value) {
	        return define(this, value, true);
	      }
	    });
	    return Constructor;
	  }
	};

	var collection = collection$1;
	var collectionWeak = collectionWeak$1;

	// `WeakSet` constructor
	// https://tc39.es/ecma262/#sec-weakset-constructor
	collection('WeakSet', function (init) {
	  return function WeakSet() {
	    return init(this, arguments.length ? arguments[0] : undefined);
	  };
	}, collectionWeak);

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;
	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var global$3 = global$e;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty = createNonEnumerableProperty$4;
	var setToStringTag$1 = setToStringTag$5;
	var wellKnownSymbol$2 = wellKnownSymbol$e;
	var ITERATOR$2 = wellKnownSymbol$2('iterator');
	var ArrayValues = ArrayIteratorMethods.values;
	var handlePrototype = function handlePrototype(CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$2] = ArrayValues;
	    }
	    setToStringTag$1(CollectionPrototype, COLLECTION_NAME, true);
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};
	for (var COLLECTION_NAME in DOMIterables) {
	  handlePrototype(global$3[COLLECTION_NAME] && global$3[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}
	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	var global$2 = global$e;
	var DESCRIPTORS$2 = descriptors;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Avoid NodeJS experimental warning
	var safeGetBuiltIn$1 = function safeGetBuiltIn(name) {
	  if (!DESCRIPTORS$2) return global$2[name];
	  var descriptor = getOwnPropertyDescriptor(global$2, name);
	  return descriptor && descriptor.value;
	};

	var fails = fails$g;
	var wellKnownSymbol$1 = wellKnownSymbol$e;
	var DESCRIPTORS$1 = descriptors;
	var IS_PURE = isPure;
	var ITERATOR$1 = wellKnownSymbol$1('iterator');
	var urlConstructorDetection = !fails(function () {
	  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
	  var url = new URL('b?a=1&b=2&c=3', 'http://a');
	  var params = url.searchParams;
	  var params2 = new URLSearchParams('a=1&a=2&b=3');
	  var result = '';
	  url.pathname = 'c%20d';
	  params.forEach(function (value, key) {
	    params['delete']('b');
	    result += key + value;
	  });
	  params2['delete']('a', 2);
	  // `undefined` case is a Chromium 117 bug
	  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
	  params2['delete']('b', undefined);
	  return IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')) || !params.size && (IS_PURE || !DESCRIPTORS$1) || !params.sort || url.href !== 'http://a/c%20d?a=1&c=3' || params.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !params[ITERATOR$1]
	  // throws in Edge
	  || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	  // not punycoded in Edge
	  || new URL('http://тест').host !== 'xn--e1aybc'
	  // not escaped in Chrome 62-
	  || new URL('http://a#б').hash !== '#%D0%B1'
	  // fails in Chrome 66-
	  || result !== 'a1c3'
	  // throws in Safari
	  || new URL('http://x', undefined).host !== 'x';
	});

	var makeBuiltIn = makeBuiltInExports;
	var defineProperty = objectDefineProperty;
	var defineBuiltInAccessor$1 = function defineBuiltInAccessor(target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, {
	    getter: true
	  });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, {
	    setter: true
	  });
	  return defineProperty.f(target, name, descriptor);
	};

	var classof$1 = classof$8;
	var $String = String;
	var toString = function toString(argument) {
	  if (classof$1(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};

	var $TypeError = TypeError;
	var validateArgumentsLength$1 = function validateArgumentsLength(passed, required) {
	  if (passed < required) throw new $TypeError('Not enough arguments');
	  return passed;
	};

	var arraySlice = arraySlice$2;
	var floor = Math.floor;
	var sort = function sort(array, comparefn) {
	  var length = array.length;
	  if (length < 8) {
	    // insertion sort
	    var i = 1;
	    var element, j;
	    while (i < length) {
	      j = i;
	      element = array[i];
	      while (j && comparefn(array[j - 1], element) > 0) {
	        array[j] = array[--j];
	      }
	      if (j !== i++) array[j] = element;
	    }
	  } else {
	    // merge sort
	    var middle = floor(length / 2);
	    var left = sort(arraySlice(array, 0, middle), comparefn);
	    var right = sort(arraySlice(array, middle), comparefn);
	    var llength = left.length;
	    var rlength = right.length;
	    var lindex = 0;
	    var rindex = 0;
	    while (lindex < llength || rindex < rlength) {
	      array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
	    }
	  }
	  return array;
	};
	var arraySort$1 = sort;

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $ = _export;
	var global$1 = global$e;
	var safeGetBuiltIn = safeGetBuiltIn$1;
	var call = functionCall;
	var uncurryThis = functionUncurryThis;
	var DESCRIPTORS = descriptors;
	var USE_NATIVE_URL = urlConstructorDetection;
	var defineBuiltIn = defineBuiltIn$7;
	var defineBuiltInAccessor = defineBuiltInAccessor$1;
	var defineBuiltIns = defineBuiltIns$2;
	var setToStringTag = setToStringTag$5;
	var createIteratorConstructor = iteratorCreateConstructor;
	var InternalStateModule = internalState;
	var anInstance = anInstance$3;
	var isCallable = isCallable$i;
	var hasOwn = hasOwnProperty_1;
	var bind = functionBindContext;
	var classof = classof$8;
	var anObject = anObject$a;
	var isObject$1 = isObject$f;
	var $toString = toString;
	var create = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$4;
	var getIterator = getIterator$2;
	var getIteratorMethod = getIteratorMethod$3;
	var createIterResultObject = createIterResultObject$2;
	var validateArgumentsLength = validateArgumentsLength$1;
	var wellKnownSymbol = wellKnownSymbol$e;
	var arraySort = arraySort$1;
	var ITERATOR = wellKnownSymbol('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
	var nativeFetch = safeGetBuiltIn('fetch');
	var NativeRequest = safeGetBuiltIn('Request');
	var Headers$1 = safeGetBuiltIn('Headers');
	var RequestPrototype = NativeRequest && NativeRequest.prototype;
	var HeadersPrototype = Headers$1 && Headers$1.prototype;
	var RegExp = global$1.RegExp;
	var TypeError$1 = global$1.TypeError;
	var decodeURIComponent$1 = global$1.decodeURIComponent;
	var encodeURIComponent$1 = global$1.encodeURIComponent;
	var charAt = uncurryThis(''.charAt);
	var join = uncurryThis([].join);
	var push = uncurryThis([].push);
	var replace = uncurryThis(''.replace);
	var shift = uncurryThis([].shift);
	var splice = uncurryThis([].splice);
	var split = uncurryThis(''.split);
	var stringSlice = uncurryThis(''.slice);
	var plus = /\+/g;
	var sequences = Array(4);
	var percentSequence = function percentSequence(bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};
	var percentDecode = function percentDecode(sequence) {
	  try {
	    return decodeURIComponent$1(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};
	var deserialize = function deserialize(it) {
	  var result = replace(it, plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent$1(result);
	  } catch (error) {
	    while (bytes) {
	      result = replace(result, percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};
	var find = /[!'()~]|%20/g;
	var replacements = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};
	var replacer = function replacer(match) {
	  return replacements[match];
	};
	var _serialize = function serialize(it) {
	  return replace(encodeURIComponent$1(it), find, replacer);
	};
	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    target: getInternalParamsState(params).entries,
	    index: 0,
	    kind: kind
	  });
	}, URL_SEARCH_PARAMS, function next() {
	  var state = getInternalIteratorState(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject(undefined, true);
	  }
	  var entry = target[index];
	  switch (state.kind) {
	    case 'keys':
	      return createIterResultObject(entry.key, false);
	    case 'values':
	      return createIterResultObject(entry.value, false);
	  }
	  return createIterResultObject([entry.key, entry.value], false);
	}, true);
	var URLSearchParamsState = function URLSearchParamsState(init) {
	  this.entries = [];
	  this.url = null;
	  if (init !== undefined) {
	    if (isObject$1(init)) this.parseObject(init);else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
	  }
	};
	URLSearchParamsState.prototype = {
	  type: URL_SEARCH_PARAMS,
	  bindURL: function bindURL(url) {
	    this.url = url;
	    this.update();
	  },
	  parseObject: function parseObject(object) {
	    var entries = this.entries;
	    var iteratorMethod = getIteratorMethod(object);
	    var iterator, next, step, entryIterator, entryNext, first, second;
	    if (iteratorMethod) {
	      iterator = getIterator(object, iteratorMethod);
	      next = iterator.next;
	      while (!(step = call(next, iterator)).done) {
	        entryIterator = getIterator(anObject(step.value));
	        entryNext = entryIterator.next;
	        if ((first = call(entryNext, entryIterator)).done || (second = call(entryNext, entryIterator)).done || !call(entryNext, entryIterator).done) throw new TypeError$1('Expected sequence with length 2');
	        push(entries, {
	          key: $toString(first.value),
	          value: $toString(second.value)
	        });
	      }
	    } else for (var key in object) if (hasOwn(object, key)) {
	      push(entries, {
	        key: key,
	        value: $toString(object[key])
	      });
	    }
	  },
	  parseQuery: function parseQuery(query) {
	    if (query) {
	      var entries = this.entries;
	      var attributes = split(query, '&');
	      var index = 0;
	      var attribute, entry;
	      while (index < attributes.length) {
	        attribute = attributes[index++];
	        if (attribute.length) {
	          entry = split(attribute, '=');
	          push(entries, {
	            key: deserialize(shift(entry)),
	            value: deserialize(join(entry, '='))
	          });
	        }
	      }
	    }
	  },
	  serialize: function serialize() {
	    var entries = this.entries;
	    var result = [];
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      push(result, _serialize(entry.key) + '=' + _serialize(entry.value));
	    }
	    return join(result, '&');
	  },
	  update: function update() {
	    this.entries.length = 0;
	    this.parseQuery(this.url.query);
	  },
	  updateURL: function updateURL() {
	    if (this.url) this.url.update();
	  }
	};

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams( /* init */
	) {
	  anInstance(this, URLSearchParamsPrototype);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var state = setInternalState(this, new URLSearchParamsState(init));
	  if (!DESCRIPTORS) this.size = state.entries.length;
	};
	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
	defineBuiltIns(URLSearchParamsPrototype, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength(arguments.length, 2);
	    push(state.entries, {
	      key: $toString(name),
	      value: $toString(value)
	    });
	    if (!DESCRIPTORS) this.length++;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function _delete(name /* , value */) {
	    var state = getInternalParamsState(this);
	    var length = validateArgumentsLength(arguments.length, 1);
	    var entries = state.entries;
	    var key = $toString(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index];
	      if (entry.key === key && (value === undefined || entry.value === value)) {
	        splice(entries, index, 1);
	        if (value !== undefined) break;
	      } else index++;
	    }
	    if (!DESCRIPTORS) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength(arguments.length, 1);
	    var key = $toString(name);
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  // `URLSearchParams.prototype.getAll` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
	  getAll: function getAll(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength(arguments.length, 1);
	    var key = $toString(name);
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) push(result, entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name /* , value */) {
	    var entries = getInternalParamsState(this).entries;
	    var length = validateArgumentsLength(arguments.length, 1);
	    var key = $toString(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index++];
	      if (entry.key === key && (value === undefined || entry.value === value)) return true;
	    }
	    return false;
	  },
	  // `URLSearchParams.prototype.set` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
	  set: function set(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength(arguments.length, 1);
	    var entries = state.entries;
	    var found = false;
	    var key = $toString(name);
	    var val = $toString(value);
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) splice(entries, index--, 1);else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) push(entries, {
	      key: key,
	      value: val
	    });
	    if (!DESCRIPTORS) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    arraySort(state.entries, function (a, b) {
	      return a.key > b.key ? 1 : -1;
	    });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  // `URLSearchParams.prototype.keys` method
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  // `URLSearchParams.prototype.values` method
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  // `URLSearchParams.prototype.entries` method
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, {
	  enumerable: true
	});

	// `URLSearchParams.prototype[@@iterator]` method
	defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, {
	  name: 'entries'
	});

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
	  return getInternalParamsState(this).serialize();
	}, {
	  enumerable: true
	});

	// `URLSearchParams.prototype.size` getter
	// https://github.com/whatwg/url/pull/734
	if (DESCRIPTORS) defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
	  get: function size() {
	    return getInternalParamsState(this).entries.length;
	  },
	  configurable: true,
	  enumerable: true
	});
	setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
	$({
	  global: true,
	  constructor: true,
	  forced: !USE_NATIVE_URL
	}, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
	if (!USE_NATIVE_URL && isCallable(Headers$1)) {
	  var headersHas = uncurryThis(HeadersPrototype.has);
	  var headersSet = uncurryThis(HeadersPrototype.set);
	  var wrapRequestOptions = function wrapRequestOptions(init) {
	    if (isObject$1(init)) {
	      var body = init.body;
	      var headers;
	      if (classof(body) === URL_SEARCH_PARAMS) {
	        headers = init.headers ? new Headers$1(init.headers) : new Headers$1();
	        if (!headersHas(headers, 'content-type')) {
	          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	        return create(init, {
	          body: createPropertyDescriptor(0, $toString(body)),
	          headers: createPropertyDescriptor(0, headers)
	        });
	      }
	    }
	    return init;
	  };
	  if (isCallable(nativeFetch)) {
	    $({
	      global: true,
	      enumerable: true,
	      dontCallGetSet: true,
	      forced: true
	    }, {
	      fetch: function fetch(input /* , init */) {
	        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	      }
	    });
	  }
	  if (isCallable(NativeRequest)) {
	    var RequestConstructor = function Request(input /* , init */) {
	      anInstance(this, RequestPrototype);
	      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	    };
	    RequestPrototype.constructor = RequestConstructor;
	    RequestConstructor.prototype = RequestPrototype;
	    $({
	      global: true,
	      constructor: true,
	      dontCallGetSet: true,
	      forced: true
	    }, {
	      Request: RequestConstructor
	    });
	  }
	}

	var runtime = {exports: {}};

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function (module) {
		var runtime = (function (exports) {

		  var Op = Object.prototype;
		  var hasOwn = Op.hasOwnProperty;
		  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
		  var undefined$1; // More compressible than void 0.
		  var $Symbol = typeof Symbol === "function" ? Symbol : {};
		  var iteratorSymbol = $Symbol.iterator || "@@iterator";
		  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
		  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

		  function define(obj, key, value) {
		    Object.defineProperty(obj, key, {
		      value: value,
		      enumerable: true,
		      configurable: true,
		      writable: true
		    });
		    return obj[key];
		  }
		  try {
		    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
		    define({}, "");
		  } catch (err) {
		    define = function(obj, key, value) {
		      return obj[key] = value;
		    };
		  }

		  function wrap(innerFn, outerFn, self, tryLocsList) {
		    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
		    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
		    var generator = Object.create(protoGenerator.prototype);
		    var context = new Context(tryLocsList || []);

		    // The ._invoke method unifies the implementations of the .next,
		    // .throw, and .return methods.
		    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

		    return generator;
		  }
		  exports.wrap = wrap;

		  // Try/catch helper to minimize deoptimizations. Returns a completion
		  // record like context.tryEntries[i].completion. This interface could
		  // have been (and was previously) designed to take a closure to be
		  // invoked without arguments, but in all the cases we care about we
		  // already have an existing method we want to call, so there's no need
		  // to create a new function object. We can even get away with assuming
		  // the method takes exactly one argument, since that happens to be true
		  // in every case, so we don't have to touch the arguments object. The
		  // only additional allocation required is the completion record, which
		  // has a stable shape and so hopefully should be cheap to allocate.
		  function tryCatch(fn, obj, arg) {
		    try {
		      return { type: "normal", arg: fn.call(obj, arg) };
		    } catch (err) {
		      return { type: "throw", arg: err };
		    }
		  }

		  var GenStateSuspendedStart = "suspendedStart";
		  var GenStateSuspendedYield = "suspendedYield";
		  var GenStateExecuting = "executing";
		  var GenStateCompleted = "completed";

		  // Returning this object from the innerFn has the same effect as
		  // breaking out of the dispatch switch statement.
		  var ContinueSentinel = {};

		  // Dummy constructor functions that we use as the .constructor and
		  // .constructor.prototype properties for functions that return Generator
		  // objects. For full spec compliance, you may wish to configure your
		  // minifier not to mangle the names of these two functions.
		  function Generator() {}
		  function GeneratorFunction() {}
		  function GeneratorFunctionPrototype() {}

		  // This is a polyfill for %IteratorPrototype% for environments that
		  // don't natively support it.
		  var IteratorPrototype = {};
		  define(IteratorPrototype, iteratorSymbol, function () {
		    return this;
		  });

		  var getProto = Object.getPrototypeOf;
		  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
		  if (NativeIteratorPrototype &&
		      NativeIteratorPrototype !== Op &&
		      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
		    // This environment has a native %IteratorPrototype%; use it instead
		    // of the polyfill.
		    IteratorPrototype = NativeIteratorPrototype;
		  }

		  var Gp = GeneratorFunctionPrototype.prototype =
		    Generator.prototype = Object.create(IteratorPrototype);
		  GeneratorFunction.prototype = GeneratorFunctionPrototype;
		  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
		  defineProperty(
		    GeneratorFunctionPrototype,
		    "constructor",
		    { value: GeneratorFunction, configurable: true }
		  );
		  GeneratorFunction.displayName = define(
		    GeneratorFunctionPrototype,
		    toStringTagSymbol,
		    "GeneratorFunction"
		  );

		  // Helper for defining the .next, .throw, and .return methods of the
		  // Iterator interface in terms of a single ._invoke method.
		  function defineIteratorMethods(prototype) {
		    ["next", "throw", "return"].forEach(function(method) {
		      define(prototype, method, function(arg) {
		        return this._invoke(method, arg);
		      });
		    });
		  }

		  exports.isGeneratorFunction = function(genFun) {
		    var ctor = typeof genFun === "function" && genFun.constructor;
		    return ctor
		      ? ctor === GeneratorFunction ||
		        // For the native GeneratorFunction constructor, the best we can
		        // do is to check its .name property.
		        (ctor.displayName || ctor.name) === "GeneratorFunction"
		      : false;
		  };

		  exports.mark = function(genFun) {
		    if (Object.setPrototypeOf) {
		      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
		    } else {
		      genFun.__proto__ = GeneratorFunctionPrototype;
		      define(genFun, toStringTagSymbol, "GeneratorFunction");
		    }
		    genFun.prototype = Object.create(Gp);
		    return genFun;
		  };

		  // Within the body of any async function, `await x` is transformed to
		  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
		  // `hasOwn.call(value, "__await")` to determine if the yielded value is
		  // meant to be awaited.
		  exports.awrap = function(arg) {
		    return { __await: arg };
		  };

		  function AsyncIterator(generator, PromiseImpl) {
		    function invoke(method, arg, resolve, reject) {
		      var record = tryCatch(generator[method], generator, arg);
		      if (record.type === "throw") {
		        reject(record.arg);
		      } else {
		        var result = record.arg;
		        var value = result.value;
		        if (value &&
		            typeof value === "object" &&
		            hasOwn.call(value, "__await")) {
		          return PromiseImpl.resolve(value.__await).then(function(value) {
		            invoke("next", value, resolve, reject);
		          }, function(err) {
		            invoke("throw", err, resolve, reject);
		          });
		        }

		        return PromiseImpl.resolve(value).then(function(unwrapped) {
		          // When a yielded Promise is resolved, its final value becomes
		          // the .value of the Promise<{value,done}> result for the
		          // current iteration.
		          result.value = unwrapped;
		          resolve(result);
		        }, function(error) {
		          // If a rejected Promise was yielded, throw the rejection back
		          // into the async generator function so it can be handled there.
		          return invoke("throw", error, resolve, reject);
		        });
		      }
		    }

		    var previousPromise;

		    function enqueue(method, arg) {
		      function callInvokeWithMethodAndArg() {
		        return new PromiseImpl(function(resolve, reject) {
		          invoke(method, arg, resolve, reject);
		        });
		      }

		      return previousPromise =
		        // If enqueue has been called before, then we want to wait until
		        // all previous Promises have been resolved before calling invoke,
		        // so that results are always delivered in the correct order. If
		        // enqueue has not been called before, then it is important to
		        // call invoke immediately, without waiting on a callback to fire,
		        // so that the async generator function has the opportunity to do
		        // any necessary setup in a predictable way. This predictability
		        // is why the Promise constructor synchronously invokes its
		        // executor callback, and why async functions synchronously
		        // execute code before the first await. Since we implement simple
		        // async functions in terms of async generators, it is especially
		        // important to get this right, even though it requires care.
		        previousPromise ? previousPromise.then(
		          callInvokeWithMethodAndArg,
		          // Avoid propagating failures to Promises returned by later
		          // invocations of the iterator.
		          callInvokeWithMethodAndArg
		        ) : callInvokeWithMethodAndArg();
		    }

		    // Define the unified helper method that is used to implement .next,
		    // .throw, and .return (see defineIteratorMethods).
		    defineProperty(this, "_invoke", { value: enqueue });
		  }

		  defineIteratorMethods(AsyncIterator.prototype);
		  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
		    return this;
		  });
		  exports.AsyncIterator = AsyncIterator;

		  // Note that simple async functions are implemented on top of
		  // AsyncIterator objects; they just return a Promise for the value of
		  // the final result produced by the iterator.
		  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
		    if (PromiseImpl === void 0) PromiseImpl = Promise;

		    var iter = new AsyncIterator(
		      wrap(innerFn, outerFn, self, tryLocsList),
		      PromiseImpl
		    );

		    return exports.isGeneratorFunction(outerFn)
		      ? iter // If outerFn is a generator, return the full iterator.
		      : iter.next().then(function(result) {
		          return result.done ? result.value : iter.next();
		        });
		  };

		  function makeInvokeMethod(innerFn, self, context) {
		    var state = GenStateSuspendedStart;

		    return function invoke(method, arg) {
		      if (state === GenStateExecuting) {
		        throw new Error("Generator is already running");
		      }

		      if (state === GenStateCompleted) {
		        if (method === "throw") {
		          throw arg;
		        }

		        // Be forgiving, per GeneratorResume behavior specified since ES2015:
		        // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
		        // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
		        return doneResult();
		      }

		      context.method = method;
		      context.arg = arg;

		      while (true) {
		        var delegate = context.delegate;
		        if (delegate) {
		          var delegateResult = maybeInvokeDelegate(delegate, context);
		          if (delegateResult) {
		            if (delegateResult === ContinueSentinel) continue;
		            return delegateResult;
		          }
		        }

		        if (context.method === "next") {
		          // Setting context._sent for legacy support of Babel's
		          // function.sent implementation.
		          context.sent = context._sent = context.arg;

		        } else if (context.method === "throw") {
		          if (state === GenStateSuspendedStart) {
		            state = GenStateCompleted;
		            throw context.arg;
		          }

		          context.dispatchException(context.arg);

		        } else if (context.method === "return") {
		          context.abrupt("return", context.arg);
		        }

		        state = GenStateExecuting;

		        var record = tryCatch(innerFn, self, context);
		        if (record.type === "normal") {
		          // If an exception is thrown from innerFn, we leave state ===
		          // GenStateExecuting and loop back for another invocation.
		          state = context.done
		            ? GenStateCompleted
		            : GenStateSuspendedYield;

		          if (record.arg === ContinueSentinel) {
		            continue;
		          }

		          return {
		            value: record.arg,
		            done: context.done
		          };

		        } else if (record.type === "throw") {
		          state = GenStateCompleted;
		          // Dispatch the exception by looping back around to the
		          // context.dispatchException(context.arg) call above.
		          context.method = "throw";
		          context.arg = record.arg;
		        }
		      }
		    };
		  }

		  // Call delegate.iterator[context.method](context.arg) and handle the
		  // result, either by returning a { value, done } result from the
		  // delegate iterator, or by modifying context.method and context.arg,
		  // setting context.delegate to null, and returning the ContinueSentinel.
		  function maybeInvokeDelegate(delegate, context) {
		    var methodName = context.method;
		    var method = delegate.iterator[methodName];
		    if (method === undefined$1) {
		      // A .throw or .return when the delegate iterator has no .throw
		      // method, or a missing .next method, always terminate the
		      // yield* loop.
		      context.delegate = null;

		      // Note: ["return"] must be used for ES3 parsing compatibility.
		      if (methodName === "throw" && delegate.iterator["return"]) {
		        // If the delegate iterator has a return method, give it a
		        // chance to clean up.
		        context.method = "return";
		        context.arg = undefined$1;
		        maybeInvokeDelegate(delegate, context);

		        if (context.method === "throw") {
		          // If maybeInvokeDelegate(context) changed context.method from
		          // "return" to "throw", let that override the TypeError below.
		          return ContinueSentinel;
		        }
		      }
		      if (methodName !== "return") {
		        context.method = "throw";
		        context.arg = new TypeError(
		          "The iterator does not provide a '" + methodName + "' method");
		      }

		      return ContinueSentinel;
		    }

		    var record = tryCatch(method, delegate.iterator, context.arg);

		    if (record.type === "throw") {
		      context.method = "throw";
		      context.arg = record.arg;
		      context.delegate = null;
		      return ContinueSentinel;
		    }

		    var info = record.arg;

		    if (! info) {
		      context.method = "throw";
		      context.arg = new TypeError("iterator result is not an object");
		      context.delegate = null;
		      return ContinueSentinel;
		    }

		    if (info.done) {
		      // Assign the result of the finished delegate to the temporary
		      // variable specified by delegate.resultName (see delegateYield).
		      context[delegate.resultName] = info.value;

		      // Resume execution at the desired location (see delegateYield).
		      context.next = delegate.nextLoc;

		      // If context.method was "throw" but the delegate handled the
		      // exception, let the outer generator proceed normally. If
		      // context.method was "next", forget context.arg since it has been
		      // "consumed" by the delegate iterator. If context.method was
		      // "return", allow the original .return call to continue in the
		      // outer generator.
		      if (context.method !== "return") {
		        context.method = "next";
		        context.arg = undefined$1;
		      }

		    } else {
		      // Re-yield the result returned by the delegate method.
		      return info;
		    }

		    // The delegate iterator is finished, so forget it and continue with
		    // the outer generator.
		    context.delegate = null;
		    return ContinueSentinel;
		  }

		  // Define Generator.prototype.{next,throw,return} in terms of the
		  // unified ._invoke helper method.
		  defineIteratorMethods(Gp);

		  define(Gp, toStringTagSymbol, "Generator");

		  // A Generator should always return itself as the iterator object when the
		  // @@iterator function is called on it. Some browsers' implementations of the
		  // iterator prototype chain incorrectly implement this, causing the Generator
		  // object to not be returned from this call. This ensures that doesn't happen.
		  // See https://github.com/facebook/regenerator/issues/274 for more details.
		  define(Gp, iteratorSymbol, function() {
		    return this;
		  });

		  define(Gp, "toString", function() {
		    return "[object Generator]";
		  });

		  function pushTryEntry(locs) {
		    var entry = { tryLoc: locs[0] };

		    if (1 in locs) {
		      entry.catchLoc = locs[1];
		    }

		    if (2 in locs) {
		      entry.finallyLoc = locs[2];
		      entry.afterLoc = locs[3];
		    }

		    this.tryEntries.push(entry);
		  }

		  function resetTryEntry(entry) {
		    var record = entry.completion || {};
		    record.type = "normal";
		    delete record.arg;
		    entry.completion = record;
		  }

		  function Context(tryLocsList) {
		    // The root entry object (effectively a try statement without a catch
		    // or a finally block) gives us a place to store values thrown from
		    // locations where there is no enclosing try statement.
		    this.tryEntries = [{ tryLoc: "root" }];
		    tryLocsList.forEach(pushTryEntry, this);
		    this.reset(true);
		  }

		  exports.keys = function(val) {
		    var object = Object(val);
		    var keys = [];
		    for (var key in object) {
		      keys.push(key);
		    }
		    keys.reverse();

		    // Rather than returning an object with a next method, we keep
		    // things simple and return the next function itself.
		    return function next() {
		      while (keys.length) {
		        var key = keys.pop();
		        if (key in object) {
		          next.value = key;
		          next.done = false;
		          return next;
		        }
		      }

		      // To avoid creating an additional object, we just hang the .value
		      // and .done properties off the next function object itself. This
		      // also ensures that the minifier will not anonymize the function.
		      next.done = true;
		      return next;
		    };
		  };

		  function values(iterable) {
		    if (iterable != null) {
		      var iteratorMethod = iterable[iteratorSymbol];
		      if (iteratorMethod) {
		        return iteratorMethod.call(iterable);
		      }

		      if (typeof iterable.next === "function") {
		        return iterable;
		      }

		      if (!isNaN(iterable.length)) {
		        var i = -1, next = function next() {
		          while (++i < iterable.length) {
		            if (hasOwn.call(iterable, i)) {
		              next.value = iterable[i];
		              next.done = false;
		              return next;
		            }
		          }

		          next.value = undefined$1;
		          next.done = true;

		          return next;
		        };

		        return next.next = next;
		      }
		    }

		    throw new TypeError(typeof iterable + " is not iterable");
		  }
		  exports.values = values;

		  function doneResult() {
		    return { value: undefined$1, done: true };
		  }

		  Context.prototype = {
		    constructor: Context,

		    reset: function(skipTempReset) {
		      this.prev = 0;
		      this.next = 0;
		      // Resetting context._sent for legacy support of Babel's
		      // function.sent implementation.
		      this.sent = this._sent = undefined$1;
		      this.done = false;
		      this.delegate = null;

		      this.method = "next";
		      this.arg = undefined$1;

		      this.tryEntries.forEach(resetTryEntry);

		      if (!skipTempReset) {
		        for (var name in this) {
		          // Not sure about the optimal order of these conditions:
		          if (name.charAt(0) === "t" &&
		              hasOwn.call(this, name) &&
		              !isNaN(+name.slice(1))) {
		            this[name] = undefined$1;
		          }
		        }
		      }
		    },

		    stop: function() {
		      this.done = true;

		      var rootEntry = this.tryEntries[0];
		      var rootRecord = rootEntry.completion;
		      if (rootRecord.type === "throw") {
		        throw rootRecord.arg;
		      }

		      return this.rval;
		    },

		    dispatchException: function(exception) {
		      if (this.done) {
		        throw exception;
		      }

		      var context = this;
		      function handle(loc, caught) {
		        record.type = "throw";
		        record.arg = exception;
		        context.next = loc;

		        if (caught) {
		          // If the dispatched exception was caught by a catch block,
		          // then let that catch block handle the exception normally.
		          context.method = "next";
		          context.arg = undefined$1;
		        }

		        return !! caught;
		      }

		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        var record = entry.completion;

		        if (entry.tryLoc === "root") {
		          // Exception thrown outside of any try block that could handle
		          // it, so set the completion value of the entire function to
		          // throw the exception.
		          return handle("end");
		        }

		        if (entry.tryLoc <= this.prev) {
		          var hasCatch = hasOwn.call(entry, "catchLoc");
		          var hasFinally = hasOwn.call(entry, "finallyLoc");

		          if (hasCatch && hasFinally) {
		            if (this.prev < entry.catchLoc) {
		              return handle(entry.catchLoc, true);
		            } else if (this.prev < entry.finallyLoc) {
		              return handle(entry.finallyLoc);
		            }

		          } else if (hasCatch) {
		            if (this.prev < entry.catchLoc) {
		              return handle(entry.catchLoc, true);
		            }

		          } else if (hasFinally) {
		            if (this.prev < entry.finallyLoc) {
		              return handle(entry.finallyLoc);
		            }

		          } else {
		            throw new Error("try statement without catch or finally");
		          }
		        }
		      }
		    },

		    abrupt: function(type, arg) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.tryLoc <= this.prev &&
		            hasOwn.call(entry, "finallyLoc") &&
		            this.prev < entry.finallyLoc) {
		          var finallyEntry = entry;
		          break;
		        }
		      }

		      if (finallyEntry &&
		          (type === "break" ||
		           type === "continue") &&
		          finallyEntry.tryLoc <= arg &&
		          arg <= finallyEntry.finallyLoc) {
		        // Ignore the finally entry if control is not jumping to a
		        // location outside the try/catch block.
		        finallyEntry = null;
		      }

		      var record = finallyEntry ? finallyEntry.completion : {};
		      record.type = type;
		      record.arg = arg;

		      if (finallyEntry) {
		        this.method = "next";
		        this.next = finallyEntry.finallyLoc;
		        return ContinueSentinel;
		      }

		      return this.complete(record);
		    },

		    complete: function(record, afterLoc) {
		      if (record.type === "throw") {
		        throw record.arg;
		      }

		      if (record.type === "break" ||
		          record.type === "continue") {
		        this.next = record.arg;
		      } else if (record.type === "return") {
		        this.rval = this.arg = record.arg;
		        this.method = "return";
		        this.next = "end";
		      } else if (record.type === "normal" && afterLoc) {
		        this.next = afterLoc;
		      }

		      return ContinueSentinel;
		    },

		    finish: function(finallyLoc) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.finallyLoc === finallyLoc) {
		          this.complete(entry.completion, entry.afterLoc);
		          resetTryEntry(entry);
		          return ContinueSentinel;
		        }
		      }
		    },

		    "catch": function(tryLoc) {
		      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
		        var entry = this.tryEntries[i];
		        if (entry.tryLoc === tryLoc) {
		          var record = entry.completion;
		          if (record.type === "throw") {
		            var thrown = record.arg;
		            resetTryEntry(entry);
		          }
		          return thrown;
		        }
		      }

		      // The context.catch method must only be called with a location
		      // argument that corresponds to a known catch block.
		      throw new Error("illegal catch attempt");
		    },

		    delegateYield: function(iterable, resultName, nextLoc) {
		      this.delegate = {
		        iterator: values(iterable),
		        resultName: resultName,
		        nextLoc: nextLoc
		      };

		      if (this.method === "next") {
		        // Deliberately forget the last sent value so that we don't
		        // accidentally pass it on to the delegate.
		        this.arg = undefined$1;
		      }

		      return ContinueSentinel;
		    }
		  };

		  // Regardless of whether this script is executing as a CommonJS module
		  // or not, return the runtime object so that we can declare the variable
		  // regeneratorRuntime in the outer scope, which allows this module to be
		  // injected easily by `bin/regenerator --include-runtime script.js`.
		  return exports;

		}(
		  // If this script is executing as a CommonJS module, use module.exports
		  // as the regeneratorRuntime namespace. Otherwise create a new empty
		  // object. Either way, the resulting object will be used to initialize
		  // the regeneratorRuntime variable at the top of this file.
		  module.exports 
		));

		try {
		  regeneratorRuntime = runtime;
		} catch (accidentalStrictMode) {
		  // This module should not be running in strict mode, so the above
		  // assignment should always work unless something is misconfigured. Just
		  // in case runtime.js accidentally runs in strict mode, in modern engines
		  // we can explicitly access globalThis. In older engines we can escape
		  // strict mode using a global Function call. This could conceivably fail
		  // if a Content Security Policy forbids using Function, but in that case
		  // the proper solution is to fix the accidental strict mode problem. If
		  // you've misconfigured your bundler to force strict mode and applied a
		  // CSP to forbid Function, and you're not willing to fix either of those
		  // problems, please detail your unique predicament in a GitHub issue.
		  if (typeof globalThis === "object") {
		    globalThis.regeneratorRuntime = runtime;
		  } else {
		    Function("r", "regeneratorRuntime = r")(runtime);
		  }
		} 
	} (runtime));

	/* eslint-disable no-prototype-builtins */
	var g =
	  (typeof globalThis !== 'undefined' && globalThis) ||
	  (typeof self !== 'undefined' && self) ||
	  // eslint-disable-next-line no-undef
	  (typeof global !== 'undefined' && global) ||
	  {};

	var support = {
	  searchParams: 'URLSearchParams' in g,
	  iterable: 'Symbol' in g && 'iterator' in Symbol,
	  blob:
	    'FileReader' in g &&
	    'Blob' in g &&
	    (function() {
	      try {
	        new Blob();
	        return true
	      } catch (e) {
	        return false
	      }
	    })(),
	  formData: 'FormData' in g,
	  arrayBuffer: 'ArrayBuffer' in g
	};

	function isDataView(obj) {
	  return obj && DataView.prototype.isPrototypeOf(obj)
	}

	if (support.arrayBuffer) {
	  var viewClasses = [
	    '[object Int8Array]',
	    '[object Uint8Array]',
	    '[object Uint8ClampedArray]',
	    '[object Int16Array]',
	    '[object Uint16Array]',
	    '[object Int32Array]',
	    '[object Uint32Array]',
	    '[object Float32Array]',
	    '[object Float64Array]'
	  ];

	  var isArrayBufferView =
	    ArrayBuffer.isView ||
	    function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    };
	}

	function normalizeName(name) {
	  if (typeof name !== 'string') {
	    name = String(name);
	  }
	  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
	    throw new TypeError('Invalid character in header field name: "' + name + '"')
	  }
	  return name.toLowerCase()
	}

	function normalizeValue(value) {
	  if (typeof value !== 'string') {
	    value = String(value);
	  }
	  return value
	}

	// Build a destructive iterator for the value list
	function iteratorFor(items) {
	  var iterator = {
	    next: function() {
	      var value = items.shift();
	      return {done: value === undefined, value: value}
	    }
	  };

	  if (support.iterable) {
	    iterator[Symbol.iterator] = function() {
	      return iterator
	    };
	  }

	  return iterator
	}

	function Headers(headers) {
	  this.map = {};

	  if (headers instanceof Headers) {
	    headers.forEach(function(value, name) {
	      this.append(name, value);
	    }, this);
	  } else if (Array.isArray(headers)) {
	    headers.forEach(function(header) {
	      if (header.length != 2) {
	        throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length)
	      }
	      this.append(header[0], header[1]);
	    }, this);
	  } else if (headers) {
	    Object.getOwnPropertyNames(headers).forEach(function(name) {
	      this.append(name, headers[name]);
	    }, this);
	  }
	}

	Headers.prototype.append = function(name, value) {
	  name = normalizeName(name);
	  value = normalizeValue(value);
	  var oldValue = this.map[name];
	  this.map[name] = oldValue ? oldValue + ', ' + value : value;
	};

	Headers.prototype['delete'] = function(name) {
	  delete this.map[normalizeName(name)];
	};

	Headers.prototype.get = function(name) {
	  name = normalizeName(name);
	  return this.has(name) ? this.map[name] : null
	};

	Headers.prototype.has = function(name) {
	  return this.map.hasOwnProperty(normalizeName(name))
	};

	Headers.prototype.set = function(name, value) {
	  this.map[normalizeName(name)] = normalizeValue(value);
	};

	Headers.prototype.forEach = function(callback, thisArg) {
	  for (var name in this.map) {
	    if (this.map.hasOwnProperty(name)) {
	      callback.call(thisArg, this.map[name], name, this);
	    }
	  }
	};

	Headers.prototype.keys = function() {
	  var items = [];
	  this.forEach(function(value, name) {
	    items.push(name);
	  });
	  return iteratorFor(items)
	};

	Headers.prototype.values = function() {
	  var items = [];
	  this.forEach(function(value) {
	    items.push(value);
	  });
	  return iteratorFor(items)
	};

	Headers.prototype.entries = function() {
	  var items = [];
	  this.forEach(function(value, name) {
	    items.push([name, value]);
	  });
	  return iteratorFor(items)
	};

	if (support.iterable) {
	  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	}

	function consumed(body) {
	  if (body._noBody) return
	  if (body.bodyUsed) {
	    return Promise.reject(new TypeError('Already read'))
	  }
	  body.bodyUsed = true;
	}

	function fileReaderReady(reader) {
	  return new Promise(function(resolve, reject) {
	    reader.onload = function() {
	      resolve(reader.result);
	    };
	    reader.onerror = function() {
	      reject(reader.error);
	    };
	  })
	}

	function readBlobAsArrayBuffer(blob) {
	  var reader = new FileReader();
	  var promise = fileReaderReady(reader);
	  reader.readAsArrayBuffer(blob);
	  return promise
	}

	function readBlobAsText(blob) {
	  var reader = new FileReader();
	  var promise = fileReaderReady(reader);
	  var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
	  var encoding = match ? match[1] : 'utf-8';
	  reader.readAsText(blob, encoding);
	  return promise
	}

	function readArrayBufferAsText(buf) {
	  var view = new Uint8Array(buf);
	  var chars = new Array(view.length);

	  for (var i = 0; i < view.length; i++) {
	    chars[i] = String.fromCharCode(view[i]);
	  }
	  return chars.join('')
	}

	function bufferClone(buf) {
	  if (buf.slice) {
	    return buf.slice(0)
	  } else {
	    var view = new Uint8Array(buf.byteLength);
	    view.set(new Uint8Array(buf));
	    return view.buffer
	  }
	}

	function Body() {
	  this.bodyUsed = false;

	  this._initBody = function(body) {
	    /*
	      fetch-mock wraps the Response object in an ES6 Proxy to
	      provide useful test harness features such as flush. However, on
	      ES5 browsers without fetch or Proxy support pollyfills must be used;
	      the proxy-pollyfill is unable to proxy an attribute unless it exists
	      on the object before the Proxy is created. This change ensures
	      Response.bodyUsed exists on the instance, while maintaining the
	      semantic of setting Request.bodyUsed in the constructor before
	      _initBody is called.
	    */
	    // eslint-disable-next-line no-self-assign
	    this.bodyUsed = this.bodyUsed;
	    this._bodyInit = body;
	    if (!body) {
	      this._noBody = true;
	      this._bodyText = '';
	    } else if (typeof body === 'string') {
	      this._bodyText = body;
	    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	      this._bodyBlob = body;
	    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	      this._bodyFormData = body;
	    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	      this._bodyText = body.toString();
	    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	      this._bodyArrayBuffer = bufferClone(body.buffer);
	      // IE 10-11 can't handle a DataView body.
	      this._bodyInit = new Blob([this._bodyArrayBuffer]);
	    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	      this._bodyArrayBuffer = bufferClone(body);
	    } else {
	      this._bodyText = body = Object.prototype.toString.call(body);
	    }

	    if (!this.headers.get('content-type')) {
	      if (typeof body === 'string') {
	        this.headers.set('content-type', 'text/plain;charset=UTF-8');
	      } else if (this._bodyBlob && this._bodyBlob.type) {
	        this.headers.set('content-type', this._bodyBlob.type);
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	      }
	    }
	  };

	  if (support.blob) {
	    this.blob = function() {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return Promise.resolve(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as blob')
	      } else {
	        return Promise.resolve(new Blob([this._bodyText]))
	      }
	    };
	  }

	  this.arrayBuffer = function() {
	    if (this._bodyArrayBuffer) {
	      var isConsumed = consumed(this);
	      if (isConsumed) {
	        return isConsumed
	      } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
	        return Promise.resolve(
	          this._bodyArrayBuffer.buffer.slice(
	            this._bodyArrayBuffer.byteOffset,
	            this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
	          )
	        )
	      } else {
	        return Promise.resolve(this._bodyArrayBuffer)
	      }
	    } else if (support.blob) {
	      return this.blob().then(readBlobAsArrayBuffer)
	    } else {
	      throw new Error('could not read as ArrayBuffer')
	    }
	  };

	  this.text = function() {
	    var rejected = consumed(this);
	    if (rejected) {
	      return rejected
	    }

	    if (this._bodyBlob) {
	      return readBlobAsText(this._bodyBlob)
	    } else if (this._bodyArrayBuffer) {
	      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	    } else if (this._bodyFormData) {
	      throw new Error('could not read FormData body as text')
	    } else {
	      return Promise.resolve(this._bodyText)
	    }
	  };

	  if (support.formData) {
	    this.formData = function() {
	      return this.text().then(decode)
	    };
	  }

	  this.json = function() {
	    return this.text().then(JSON.parse)
	  };

	  return this
	}

	// HTTP methods whose capitalization should be normalized
	var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];

	function normalizeMethod(method) {
	  var upcased = method.toUpperCase();
	  return methods.indexOf(upcased) > -1 ? upcased : method
	}

	function Request(input, options) {
	  if (!(this instanceof Request)) {
	    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
	  }

	  options = options || {};
	  var body = options.body;

	  if (input instanceof Request) {
	    if (input.bodyUsed) {
	      throw new TypeError('Already read')
	    }
	    this.url = input.url;
	    this.credentials = input.credentials;
	    if (!options.headers) {
	      this.headers = new Headers(input.headers);
	    }
	    this.method = input.method;
	    this.mode = input.mode;
	    this.signal = input.signal;
	    if (!body && input._bodyInit != null) {
	      body = input._bodyInit;
	      input.bodyUsed = true;
	    }
	  } else {
	    this.url = String(input);
	  }

	  this.credentials = options.credentials || this.credentials || 'same-origin';
	  if (options.headers || !this.headers) {
	    this.headers = new Headers(options.headers);
	  }
	  this.method = normalizeMethod(options.method || this.method || 'GET');
	  this.mode = options.mode || this.mode || null;
	  this.signal = options.signal || this.signal || (function () {
	    if ('AbortController' in g) {
	      var ctrl = new AbortController();
	      return ctrl.signal;
	    }
	  }());
	  this.referrer = null;

	  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	    throw new TypeError('Body not allowed for GET or HEAD requests')
	  }
	  this._initBody(body);

	  if (this.method === 'GET' || this.method === 'HEAD') {
	    if (options.cache === 'no-store' || options.cache === 'no-cache') {
	      // Search for a '_' parameter in the query string
	      var reParamSearch = /([?&])_=[^&]*/;
	      if (reParamSearch.test(this.url)) {
	        // If it already exists then set the value with the current time
	        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
	      } else {
	        // Otherwise add a new '_' parameter to the end with the current time
	        var reQueryString = /\?/;
	        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
	      }
	    }
	  }
	}

	Request.prototype.clone = function() {
	  return new Request(this, {body: this._bodyInit})
	};

	function decode(body) {
	  var form = new FormData();
	  body
	    .trim()
	    .split('&')
	    .forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	  return form
	}

	function parseHeaders(rawHeaders) {
	  var headers = new Headers();
	  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	  // https://tools.ietf.org/html/rfc7230#section-3.2
	  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
	  // https://github.com/github/fetch/issues/748
	  // https://github.com/zloirock/core-js/issues/751
	  preProcessedHeaders
	    .split('\r')
	    .map(function(header) {
	      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
	    })
	    .forEach(function(line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        try {
	          headers.append(key, value);
	        } catch (error) {
	          console.warn('Response ' + error.message);
	        }
	      }
	    });
	  return headers
	}

	Body.call(Request.prototype);

	function Response(bodyInit, options) {
	  if (!(this instanceof Response)) {
	    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
	  }
	  if (!options) {
	    options = {};
	  }

	  this.type = 'default';
	  this.status = options.status === undefined ? 200 : options.status;
	  if (this.status < 200 || this.status > 599) {
	    throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].")
	  }
	  this.ok = this.status >= 200 && this.status < 300;
	  this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
	  this.headers = new Headers(options.headers);
	  this.url = options.url || '';
	  this._initBody(bodyInit);
	}

	Body.call(Response.prototype);

	Response.prototype.clone = function() {
	  return new Response(this._bodyInit, {
	    status: this.status,
	    statusText: this.statusText,
	    headers: new Headers(this.headers),
	    url: this.url
	  })
	};

	Response.error = function() {
	  var response = new Response(null, {status: 200, statusText: ''});
	  response.ok = false;
	  response.status = 0;
	  response.type = 'error';
	  return response
	};

	var redirectStatuses = [301, 302, 303, 307, 308];

	Response.redirect = function(url, status) {
	  if (redirectStatuses.indexOf(status) === -1) {
	    throw new RangeError('Invalid status code')
	  }

	  return new Response(null, {status: status, headers: {location: url}})
	};

	var DOMException = g.DOMException;
	try {
	  new DOMException();
	} catch (err) {
	  DOMException = function(message, name) {
	    this.message = message;
	    this.name = name;
	    var error = Error(message);
	    this.stack = error.stack;
	  };
	  DOMException.prototype = Object.create(Error.prototype);
	  DOMException.prototype.constructor = DOMException;
	}

	function fetch$1(input, init) {
	  return new Promise(function(resolve, reject) {
	    var request = new Request(input, init);

	    if (request.signal && request.signal.aborted) {
	      return reject(new DOMException('Aborted', 'AbortError'))
	    }

	    var xhr = new XMLHttpRequest();

	    function abortXhr() {
	      xhr.abort();
	    }

	    xhr.onload = function() {
	      var options = {
	        statusText: xhr.statusText,
	        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	      };
	      // This check if specifically for when a user fetches a file locally from the file system
	      // Only if the status is out of a normal range
	      if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
	        options.status = 200;
	      } else {
	        options.status = xhr.status;
	      }
	      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	      var body = 'response' in xhr ? xhr.response : xhr.responseText;
	      setTimeout(function() {
	        resolve(new Response(body, options));
	      }, 0);
	    };

	    xhr.onerror = function() {
	      setTimeout(function() {
	        reject(new TypeError('Network request failed'));
	      }, 0);
	    };

	    xhr.ontimeout = function() {
	      setTimeout(function() {
	        reject(new TypeError('Network request timed out'));
	      }, 0);
	    };

	    xhr.onabort = function() {
	      setTimeout(function() {
	        reject(new DOMException('Aborted', 'AbortError'));
	      }, 0);
	    };

	    function fixUrl(url) {
	      try {
	        return url === '' && g.location.href ? g.location.href : url
	      } catch (e) {
	        return url
	      }
	    }

	    xhr.open(request.method, fixUrl(request.url), true);

	    if (request.credentials === 'include') {
	      xhr.withCredentials = true;
	    } else if (request.credentials === 'omit') {
	      xhr.withCredentials = false;
	    }

	    if ('responseType' in xhr) {
	      if (support.blob) {
	        xhr.responseType = 'blob';
	      } else if (
	        support.arrayBuffer
	      ) {
	        xhr.responseType = 'arraybuffer';
	      }
	    }

	    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers || (g.Headers && init.headers instanceof g.Headers))) {
	      var names = [];
	      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
	        names.push(normalizeName(name));
	        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
	      });
	      request.headers.forEach(function(value, name) {
	        if (names.indexOf(name) === -1) {
	          xhr.setRequestHeader(name, value);
	        }
	      });
	    } else {
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value);
	      });
	    }

	    if (request.signal) {
	      request.signal.addEventListener('abort', abortXhr);

	      xhr.onreadystatechange = function() {
	        // DONE (success or failure)
	        if (xhr.readyState === 4) {
	          request.signal.removeEventListener('abort', abortXhr);
	        }
	      };
	    }

	    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	  })
	}

	fetch$1.polyfill = true;

	if (!g.fetch) {
	  g.fetch = fetch$1;
	  g.Headers = Headers;
	  g.Request = Request;
	  g.Response = Response;
	}

	// Unique ID creation requires a high quality random # generator. In the browser we therefore
	// require the crypto API and do not support built-in fallback to lower quality random number
	// generators (like Math.random()).
	var getRandomValues;
	var rnds8 = new Uint8Array(16);
	function rng() {
	  // lazy load so that environments that need to polyfill have a chance to do so
	  if (!getRandomValues) {
	    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
	    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
	    if (!getRandomValues) {
	      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
	    }
	  }
	  return getRandomValues(rnds8);
	}

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */

	var byteToHex = [];
	for (var i = 0; i < 256; ++i) {
	  byteToHex.push((i + 0x100).toString(16).slice(1));
	}
	function unsafeStringify(arr) {
	  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  // Note: Be careful editing this code!  It's been tuned for performance
	  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
	  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
	}

	var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
	var native = {
	  randomUUID: randomUUID
	};

	function v4(options, buf, offset) {
	  if (native.randomUUID && !buf && !options) {
	    return native.randomUUID();
	  }
	  options = options || {};
	  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

	  if (buf) {
	    offset = offset || 0;
	    for (var i = 0; i < 16; ++i) {
	      buf[offset + i] = rnds[i];
	    }
	    return buf;
	  }
	  return unsafeStringify(rnds);
	}

	/*! js-cookie v3.0.5 | MIT */
	/* eslint-disable no-var */
	function assign(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	    for (var key in source) {
	      target[key] = source[key];
	    }
	  }
	  return target;
	}
	/* eslint-enable no-var */

	/* eslint-disable no-var */
	var defaultConverter = {
	  read: function read(value) {
	    if (value[0] === '"') {
	      value = value.slice(1, -1);
	    }
	    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
	  },
	  write: function write(value) {
	    return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
	  }
	};
	/* eslint-enable no-var */

	/* eslint-disable no-var */

	function init$1(converter, defaultAttributes) {
	  function set(name, value, attributes) {
	    if (typeof document === 'undefined') {
	      return;
	    }
	    attributes = assign({}, defaultAttributes, attributes);
	    if (typeof attributes.expires === 'number') {
	      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
	    }
	    if (attributes.expires) {
	      attributes.expires = attributes.expires.toUTCString();
	    }
	    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
	    var stringifiedAttributes = '';
	    for (var attributeName in attributes) {
	      if (!attributes[attributeName]) {
	        continue;
	      }
	      stringifiedAttributes += '; ' + attributeName;
	      if (attributes[attributeName] === true) {
	        continue;
	      }

	      // Considers RFC 6265 section 5.2:
	      // ...
	      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
	      //     character:
	      // Consume the characters of the unparsed-attributes up to,
	      // not including, the first %x3B (";") character.
	      // ...
	      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
	    }
	    return document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes;
	  }
	  function get(name) {
	    if (typeof document === 'undefined' || arguments.length && !name) {
	      return;
	    }

	    // To prevent the for loop in the first place assign an empty array
	    // in case there are no cookies at all.
	    var cookies = document.cookie ? document.cookie.split('; ') : [];
	    var jar = {};
	    for (var i = 0; i < cookies.length; i++) {
	      var parts = cookies[i].split('=');
	      var value = parts.slice(1).join('=');
	      try {
	        var found = decodeURIComponent(parts[0]);
	        jar[found] = converter.read(value, found);
	        if (name === found) {
	          break;
	        }
	      } catch (e) {}
	    }
	    return name ? jar[name] : jar;
	  }
	  return Object.create({
	    set: set,
	    get: get,
	    remove: function remove(name, attributes) {
	      set(name, '', assign({}, attributes, {
	        expires: -1
	      }));
	    },
	    withAttributes: function withAttributes(attributes) {
	      return init$1(this.converter, assign({}, this.attributes, attributes));
	    },
	    withConverter: function withConverter(converter) {
	      return init$1(assign({}, this.converter, converter), this.attributes);
	    }
	  }, {
	    attributes: {
	      value: Object.freeze(defaultAttributes)
	    },
	    converter: {
	      value: Object.freeze(converter)
	    }
	  });
	}
	var api = init$1(defaultConverter, {
	  path: '/'
	});

	var lzString = {exports: {}};

	lzString.exports;

	(function (module) {
		// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
		// This work is free. You can redistribute it and/or modify it
		// under the terms of the WTFPL, Version 2
		// For more information see LICENSE.txt or http://www.wtfpl.net/
		//
		// For more information, the home page:
		// http://pieroxy.net/blog/pages/lz-string/testing.html
		//
		// LZ-based compression algorithm, version 1.4.5
		var LZString = (function() {

		// private property
		var f = String.fromCharCode;
		var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
		var baseReverseDic = {};

		function getBaseValue(alphabet, character) {
		  if (!baseReverseDic[alphabet]) {
		    baseReverseDic[alphabet] = {};
		    for (var i=0 ; i<alphabet.length ; i++) {
		      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
		    }
		  }
		  return baseReverseDic[alphabet][character];
		}

		var LZString = {
		  compressToBase64 : function (input) {
		    if (input == null) return "";
		    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
		    switch (res.length % 4) { // To produce valid Base64
		    default: // When could this happen ?
		    case 0 : return res;
		    case 1 : return res+"===";
		    case 2 : return res+"==";
		    case 3 : return res+"=";
		    }
		  },

		  decompressFromBase64 : function (input) {
		    if (input == null) return "";
		    if (input == "") return null;
		    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
		  },

		  compressToUTF16 : function (input) {
		    if (input == null) return "";
		    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
		  },

		  decompressFromUTF16: function (compressed) {
		    if (compressed == null) return "";
		    if (compressed == "") return null;
		    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
		  },

		  //compress into uint8array (UCS-2 big endian format)
		  compressToUint8Array: function (uncompressed) {
		    var compressed = LZString.compress(uncompressed);
		    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

		    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
		      var current_value = compressed.charCodeAt(i);
		      buf[i*2] = current_value >>> 8;
		      buf[i*2+1] = current_value % 256;
		    }
		    return buf;
		  },

		  //decompress from uint8array (UCS-2 big endian format)
		  decompressFromUint8Array:function (compressed) {
		    if (compressed===null || compressed===undefined){
		        return LZString.decompress(compressed);
		    } else {
		        var buf=new Array(compressed.length/2); // 2 bytes per character
		        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
		          buf[i]=compressed[i*2]*256+compressed[i*2+1];
		        }

		        var result = [];
		        buf.forEach(function (c) {
		          result.push(f(c));
		        });
		        return LZString.decompress(result.join(''));

		    }

		  },


		  //compress into a string that is already URI encoded
		  compressToEncodedURIComponent: function (input) {
		    if (input == null) return "";
		    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
		  },

		  //decompress from an output of compressToEncodedURIComponent
		  decompressFromEncodedURIComponent:function (input) {
		    if (input == null) return "";
		    if (input == "") return null;
		    input = input.replace(/ /g, "+");
		    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
		  },

		  compress: function (uncompressed) {
		    return LZString._compress(uncompressed, 16, function(a){return f(a);});
		  },
		  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
		    if (uncompressed == null) return "";
		    var i, value,
		        context_dictionary= {},
		        context_dictionaryToCreate= {},
		        context_c="",
		        context_wc="",
		        context_w="",
		        context_enlargeIn= 2, // Compensate for the first entry which should not count
		        context_dictSize= 3,
		        context_numBits= 2,
		        context_data=[],
		        context_data_val=0,
		        context_data_position=0,
		        ii;

		    for (ii = 0; ii < uncompressed.length; ii += 1) {
		      context_c = uncompressed.charAt(ii);
		      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
		        context_dictionary[context_c] = context_dictSize++;
		        context_dictionaryToCreate[context_c] = true;
		      }

		      context_wc = context_w + context_c;
		      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
		        context_w = context_wc;
		      } else {
		        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
		          if (context_w.charCodeAt(0)<256) {
		            for (i=0 ; i<context_numBits ; i++) {
		              context_data_val = (context_data_val << 1);
		              if (context_data_position == bitsPerChar-1) {
		                context_data_position = 0;
		                context_data.push(getCharFromInt(context_data_val));
		                context_data_val = 0;
		              } else {
		                context_data_position++;
		              }
		            }
		            value = context_w.charCodeAt(0);
		            for (i=0 ; i<8 ; i++) {
		              context_data_val = (context_data_val << 1) | (value&1);
		              if (context_data_position == bitsPerChar-1) {
		                context_data_position = 0;
		                context_data.push(getCharFromInt(context_data_val));
		                context_data_val = 0;
		              } else {
		                context_data_position++;
		              }
		              value = value >> 1;
		            }
		          } else {
		            value = 1;
		            for (i=0 ; i<context_numBits ; i++) {
		              context_data_val = (context_data_val << 1) | value;
		              if (context_data_position ==bitsPerChar-1) {
		                context_data_position = 0;
		                context_data.push(getCharFromInt(context_data_val));
		                context_data_val = 0;
		              } else {
		                context_data_position++;
		              }
		              value = 0;
		            }
		            value = context_w.charCodeAt(0);
		            for (i=0 ; i<16 ; i++) {
		              context_data_val = (context_data_val << 1) | (value&1);
		              if (context_data_position == bitsPerChar-1) {
		                context_data_position = 0;
		                context_data.push(getCharFromInt(context_data_val));
		                context_data_val = 0;
		              } else {
		                context_data_position++;
		              }
		              value = value >> 1;
		            }
		          }
		          context_enlargeIn--;
		          if (context_enlargeIn == 0) {
		            context_enlargeIn = Math.pow(2, context_numBits);
		            context_numBits++;
		          }
		          delete context_dictionaryToCreate[context_w];
		        } else {
		          value = context_dictionary[context_w];
		          for (i=0 ; i<context_numBits ; i++) {
		            context_data_val = (context_data_val << 1) | (value&1);
		            if (context_data_position == bitsPerChar-1) {
		              context_data_position = 0;
		              context_data.push(getCharFromInt(context_data_val));
		              context_data_val = 0;
		            } else {
		              context_data_position++;
		            }
		            value = value >> 1;
		          }


		        }
		        context_enlargeIn--;
		        if (context_enlargeIn == 0) {
		          context_enlargeIn = Math.pow(2, context_numBits);
		          context_numBits++;
		        }
		        // Add wc to the dictionary.
		        context_dictionary[context_wc] = context_dictSize++;
		        context_w = String(context_c);
		      }
		    }

		    // Output the code for w.
		    if (context_w !== "") {
		      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
		        if (context_w.charCodeAt(0)<256) {
		          for (i=0 ; i<context_numBits ; i++) {
		            context_data_val = (context_data_val << 1);
		            if (context_data_position == bitsPerChar-1) {
		              context_data_position = 0;
		              context_data.push(getCharFromInt(context_data_val));
		              context_data_val = 0;
		            } else {
		              context_data_position++;
		            }
		          }
		          value = context_w.charCodeAt(0);
		          for (i=0 ; i<8 ; i++) {
		            context_data_val = (context_data_val << 1) | (value&1);
		            if (context_data_position == bitsPerChar-1) {
		              context_data_position = 0;
		              context_data.push(getCharFromInt(context_data_val));
		              context_data_val = 0;
		            } else {
		              context_data_position++;
		            }
		            value = value >> 1;
		          }
		        } else {
		          value = 1;
		          for (i=0 ; i<context_numBits ; i++) {
		            context_data_val = (context_data_val << 1) | value;
		            if (context_data_position == bitsPerChar-1) {
		              context_data_position = 0;
		              context_data.push(getCharFromInt(context_data_val));
		              context_data_val = 0;
		            } else {
		              context_data_position++;
		            }
		            value = 0;
		          }
		          value = context_w.charCodeAt(0);
		          for (i=0 ; i<16 ; i++) {
		            context_data_val = (context_data_val << 1) | (value&1);
		            if (context_data_position == bitsPerChar-1) {
		              context_data_position = 0;
		              context_data.push(getCharFromInt(context_data_val));
		              context_data_val = 0;
		            } else {
		              context_data_position++;
		            }
		            value = value >> 1;
		          }
		        }
		        context_enlargeIn--;
		        if (context_enlargeIn == 0) {
		          context_enlargeIn = Math.pow(2, context_numBits);
		          context_numBits++;
		        }
		        delete context_dictionaryToCreate[context_w];
		      } else {
		        value = context_dictionary[context_w];
		        for (i=0 ; i<context_numBits ; i++) {
		          context_data_val = (context_data_val << 1) | (value&1);
		          if (context_data_position == bitsPerChar-1) {
		            context_data_position = 0;
		            context_data.push(getCharFromInt(context_data_val));
		            context_data_val = 0;
		          } else {
		            context_data_position++;
		          }
		          value = value >> 1;
		        }


		      }
		      context_enlargeIn--;
		      if (context_enlargeIn == 0) {
		        context_enlargeIn = Math.pow(2, context_numBits);
		        context_numBits++;
		      }
		    }

		    // Mark the end of the stream
		    value = 2;
		    for (i=0 ; i<context_numBits ; i++) {
		      context_data_val = (context_data_val << 1) | (value&1);
		      if (context_data_position == bitsPerChar-1) {
		        context_data_position = 0;
		        context_data.push(getCharFromInt(context_data_val));
		        context_data_val = 0;
		      } else {
		        context_data_position++;
		      }
		      value = value >> 1;
		    }

		    // Flush the last char
		    while (true) {
		      context_data_val = (context_data_val << 1);
		      if (context_data_position == bitsPerChar-1) {
		        context_data.push(getCharFromInt(context_data_val));
		        break;
		      }
		      else context_data_position++;
		    }
		    return context_data.join('');
		  },

		  decompress: function (compressed) {
		    if (compressed == null) return "";
		    if (compressed == "") return null;
		    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
		  },

		  _decompress: function (length, resetValue, getNextValue) {
		    var dictionary = [],
		        enlargeIn = 4,
		        dictSize = 4,
		        numBits = 3,
		        entry = "",
		        result = [],
		        i,
		        w,
		        bits, resb, maxpower, power,
		        c,
		        data = {val:getNextValue(0), position:resetValue, index:1};

		    for (i = 0; i < 3; i += 1) {
		      dictionary[i] = i;
		    }

		    bits = 0;
		    maxpower = Math.pow(2,2);
		    power=1;
		    while (power!=maxpower) {
		      resb = data.val & data.position;
		      data.position >>= 1;
		      if (data.position == 0) {
		        data.position = resetValue;
		        data.val = getNextValue(data.index++);
		      }
		      bits |= (resb>0 ? 1 : 0) * power;
		      power <<= 1;
		    }

		    switch (bits) {
		      case 0:
		          bits = 0;
		          maxpower = Math.pow(2,8);
		          power=1;
		          while (power!=maxpower) {
		            resb = data.val & data.position;
		            data.position >>= 1;
		            if (data.position == 0) {
		              data.position = resetValue;
		              data.val = getNextValue(data.index++);
		            }
		            bits |= (resb>0 ? 1 : 0) * power;
		            power <<= 1;
		          }
		        c = f(bits);
		        break;
		      case 1:
		          bits = 0;
		          maxpower = Math.pow(2,16);
		          power=1;
		          while (power!=maxpower) {
		            resb = data.val & data.position;
		            data.position >>= 1;
		            if (data.position == 0) {
		              data.position = resetValue;
		              data.val = getNextValue(data.index++);
		            }
		            bits |= (resb>0 ? 1 : 0) * power;
		            power <<= 1;
		          }
		        c = f(bits);
		        break;
		      case 2:
		        return "";
		    }
		    dictionary[3] = c;
		    w = c;
		    result.push(c);
		    while (true) {
		      if (data.index > length) {
		        return "";
		      }

		      bits = 0;
		      maxpower = Math.pow(2,numBits);
		      power=1;
		      while (power!=maxpower) {
		        resb = data.val & data.position;
		        data.position >>= 1;
		        if (data.position == 0) {
		          data.position = resetValue;
		          data.val = getNextValue(data.index++);
		        }
		        bits |= (resb>0 ? 1 : 0) * power;
		        power <<= 1;
		      }

		      switch (c = bits) {
		        case 0:
		          bits = 0;
		          maxpower = Math.pow(2,8);
		          power=1;
		          while (power!=maxpower) {
		            resb = data.val & data.position;
		            data.position >>= 1;
		            if (data.position == 0) {
		              data.position = resetValue;
		              data.val = getNextValue(data.index++);
		            }
		            bits |= (resb>0 ? 1 : 0) * power;
		            power <<= 1;
		          }

		          dictionary[dictSize++] = f(bits);
		          c = dictSize-1;
		          enlargeIn--;
		          break;
		        case 1:
		          bits = 0;
		          maxpower = Math.pow(2,16);
		          power=1;
		          while (power!=maxpower) {
		            resb = data.val & data.position;
		            data.position >>= 1;
		            if (data.position == 0) {
		              data.position = resetValue;
		              data.val = getNextValue(data.index++);
		            }
		            bits |= (resb>0 ? 1 : 0) * power;
		            power <<= 1;
		          }
		          dictionary[dictSize++] = f(bits);
		          c = dictSize-1;
		          enlargeIn--;
		          break;
		        case 2:
		          return result.join('');
		      }

		      if (enlargeIn == 0) {
		        enlargeIn = Math.pow(2, numBits);
		        numBits++;
		      }

		      if (dictionary[c]) {
		        entry = dictionary[c];
		      } else {
		        if (c === dictSize) {
		          entry = w + w.charAt(0);
		        } else {
		          return null;
		        }
		      }
		      result.push(entry);

		      // Add w+entry[0] to the dictionary.
		      dictionary[dictSize++] = w + entry.charAt(0);
		      enlargeIn--;

		      w = entry;

		      if (enlargeIn == 0) {
		        enlargeIn = Math.pow(2, numBits);
		        numBits++;
		      }

		    }
		  }
		};
		  return LZString;
		})();

		if( module != null ) {
		  module.exports = LZString;
		} else if( typeof angular !== 'undefined' && angular != null ) {
		  angular.module('LZString', [])
		  .factory('LZString', function () {
		    return LZString;
		  });
		} 
	} (lzString));

	var lzStringExports = lzString.exports;
	var LZString = /*@__PURE__*/getDefaultExportFromCjs(lzStringExports);

	var _httpsBTime1MeV, _httpsCTime1MeV, _httpsCTime1MeV2, _httpsCTime1MeV3, _httpsCTime1MeV4, _httpsCTime1MeV5;
	var cookieKeys = {
	  consent: 'consent',
	  event_consent_id: 'event_consent_id',
	  subid: 'subid',
	  cashback: 'cashback'
	};
	var CONSTANTS = {
	  sdk_name: '__ISDK',
	  sdk_script_id: '__ISDK_ASSETS',
	  cookie_max_size: 3900,
	  current_storage_version: 'v2',
	  previous_storage_version: null,
	  // no version sufix defined for storage on V1
	  cookieKeys: cookieKeys,
	  consent: {
	    name: cookieKeys.consent,
	    ttl: 390,
	    // 13 mois
	    status: {
	      unknown: 'unknown',
	      optin: 'optin',
	      optout: 'optout'
	    },
	    compress: false
	  },
	  event_consent_id: {
	    name: cookieKeys.event_consent_id,
	    ttl: 390,
	    compress: false
	  },
	  subid: {
	    name: cookieKeys.subid,
	    payloadType: 'consent',
	    queryname: 'toSubid',
	    ttl: 40,
	    compress: true,
	    type: 'Object'
	  },
	  cashback: {
	    name: cookieKeys.cashback,
	    payloadType: 'cashback',
	    queryname: 'toCashback',
	    ttl: 30,
	    compress: true,
	    type: 'Object'
	  },
	  events: {
	    visit_promethee: 'visit_promethee'
	  },
	  stats: {
	    type: {
	      visit: 'visit',
	      conversion: 'conversion',
	      hit: 'hit'
	    }
	  },
	  default_storage_prefix: 'to',
	  default_ttl: 390,
	  urls: {
	    conversion: ((_httpsBTime1MeV = "https://b.time1.me/v1/b") === null || _httpsBTime1MeV === void 0 ? void 0 : _httpsBTime1MeV.split(',')) || [],
	    stats: ((_httpsCTime1MeV = "https://c.time1.me/v3/log/consent") === null || _httpsCTime1MeV === void 0 ? void 0 : _httpsCTime1MeV.split(',')) || [],
	    proofConsent: ((_httpsCTime1MeV2 = "https://c.time1.me/v1/log/consent/proof") === null || _httpsCTime1MeV2 === void 0 ? void 0 : _httpsCTime1MeV2.split(',')) || [],
	    registerIpFingerprint: ((_httpsCTime1MeV3 = "https://c.time1.me/v1/log/p") === null || _httpsCTime1MeV3 === void 0 ? void 0 : _httpsCTime1MeV3.split(',')) || [],
	    events: ((_httpsCTime1MeV4 = "https://c.time1.me/v1/log/v") === null || _httpsCTime1MeV4 === void 0 ? void 0 : _httpsCTime1MeV4.split(',')) || [],
	    deleteData: ((_httpsCTime1MeV5 = "https://c.time1.me/v1/clean") === null || _httpsCTime1MeV5 === void 0 ? void 0 : _httpsCTime1MeV5.split(',')) || []
	  },
	  errors: {
	    subidCookieType: 'subid_cookie_type'
	  }
	};

	var ISDKCookies = api.withAttributes({
	  path: '/'
	});
	var Storage = {
	  save: function save(_ref) {
	    var id = _ref.id,
	      value = _ref.value;
	    localStorage.setItem(id, value);
	  },
	  find: function find(id) {
	    return localStorage.getItem(id);
	  },
	  delete: function _delete(id) {
	    localStorage.removeItem(id);
	  }
	};
	function setCookieWildCardDomain() {
	  var hostname = window.location.hostname.split('.');
	  hostname.reverse();
	  var wildCarDomain = ".".concat(hostname[1], ".").concat(hostname[0]);
	  ISDKCookies = api.withAttributes({
	    path: '/',
	    domain: wildCarDomain
	  });
	}
	function getPrefixedStorageName(name) {
	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONSTANTS.current_storage_version;
	  if (version) {
	    return "".concat(CONSTANTS.default_storage_prefix, "_").concat(name, "_").concat(version);
	  }
	  return "".concat(CONSTANTS.default_storage_prefix, "_").concat(name);
	}
	function isObject(obj) {
	  return obj === Object(obj);
	}
	function getCurrentTimestamp() {
	  var currentDate = new Date();
	  return currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000;
	}
	function getHitTimestamp() {
	  return Math.round(Date.now() / 1000);
	}
	function getTimestampFromTTL(ttl) {
	  return (ttl || 0) * 1000 * 60 * 60 * 24;
	}
	function isExpired(createAt, ttl) {
	  var currentTimestamp = getCurrentTimestamp();
	  var duration = getTimestampFromTTL(ttl);
	  return currentTimestamp - createAt > duration;
	}
	function setV2Value(value, options) {
	  var storedValue = JSON.stringify({
	    createAt: getCurrentTimestamp(),
	    value: value
	  });
	  return options !== null && options !== void 0 && options.compress ? LZString.compressToBase64(storedValue) : storedValue;
	}
	function getV2Value(storedValue, options) {
	  if (!(options !== null && options !== void 0 && options.compress)) {
	    var parseValue = JSON.parse(storedValue);
	    return isExpired(parseValue === null || parseValue === void 0 ? void 0 : parseValue.createAt, options.ttl) ? null : parseValue === null || parseValue === void 0 ? void 0 : parseValue.value;
	  }
	  var uncompress = LZString.decompressFromBase64(storedValue);
	  try {
	    var _parseValue = JSON.parse(uncompress);
	    return isExpired(_parseValue === null || _parseValue === void 0 ? void 0 : _parseValue.createAt, options.ttl) ? null : _parseValue === null || _parseValue === void 0 ? void 0 : _parseValue.value;
	  } catch (e) {
	    return uncompress;
	  }
	}
	var storedValue = {
	  v2: {
	    setValue: setV2Value,
	    getValue: getV2Value
	  }
	};
	function setValue(value, name) {
	  var _storedValue$CONSTANT;
	  var options = CONSTANTS[name] || {
	    name: name,
	    ttl: CONSTANTS.default_ttl
	  };
	  var setStorageValue = storedValue === null || storedValue === void 0 || (_storedValue$CONSTANT = storedValue[CONSTANTS.current_storage_version]) === null || _storedValue$CONSTANT === void 0 ? void 0 : _storedValue$CONSTANT.setValue;
	  var valueToStore = setStorageValue ? setStorageValue(value, options) : value;
	  var storageName = getPrefixedStorageName(options.name);
	  ISDKCookies.set(storageName, valueToStore, {
	    expires: options.ttl,
	    sameSite: 'strict'
	  });
	  Storage.save({
	    id: storageName,
	    value: valueToStore
	  });
	}
	function getValue(id) {
	  var _storedValue$version;
	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONSTANTS.current_storage_version;
	  var options = CONSTANTS[id] || {
	    name: id
	  };
	  var storageName = getPrefixedStorageName(options.name, version);
	  var cookieValue = ISDKCookies.get(storageName);
	  var storage = Storage.find(storageName);
	  var rawValue = cookieValue || storage || null;
	  var getStorageValue = storedValue === null || storedValue === void 0 || (_storedValue$version = storedValue[version]) === null || _storedValue$version === void 0 ? void 0 : _storedValue$version.getValue;
	  return getStorageValue ? getStorageValue(rawValue, options) : rawValue;
	}
	function removeValue(id) {
	  var _CONSTANTS$id;
	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONSTANTS.current_storage_version;
	  var name = ((_CONSTANTS$id = CONSTANTS[id]) === null || _CONSTANTS$id === void 0 ? void 0 : _CONSTANTS$id.name) || id;
	  ISDKCookies.remove(getPrefixedStorageName(name, version));
	  Storage.delete(getPrefixedStorageName(name, version));
	}
	function urlsIterator() {
	  var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	    var index;
	    return _regeneratorRuntime().wrap(function _callee$(_context) {
	      while (1) switch (_context.prev = _context.next) {
	        case 0:
	          index = 0;
	        case 1:
	          if (!(index <= urls.length)) {
	            _context.next = 7;
	            break;
	          }
	          _context.next = 4;
	          return urls[index];
	        case 4:
	          index += 1;
	          _context.next = 1;
	          break;
	        case 7:
	        case "end":
	          return _context.stop();
	      }
	    }, _callee);
	  })();
	}
	function getApiIterator(urls) {
	  var iterator = urlsIterator(urls);
	  var currentUrl = iterator.next().value;
	  return {
	    next: function next() {
	      currentUrl = iterator.next().value;
	    },
	    get url() {
	      return currentUrl;
	    },
	    urls: urls
	  };
	}
	function getCurrentUrl() {
	  return "".concat(window.location.hostname).concat(window.location.pathname);
	}
	function filterUnActiveSubids(subids, ttl) {
	  var currentTimestamp = getCurrentTimestamp();
	  var duration = getTimestampFromTTL(ttl);
	  return Object.fromEntries(Object.entries(subids).filter(function (_ref2) {
	    var _ref3 = _slicedToArray(_ref2, 2),
	      createAt = _ref3[1];
	    return currentTimestamp - createAt <= duration;
	  }));
	}
	function getMaxSubids(subids) {
	  var _LZString$compressToB;
	  var subidsSize = ((_LZString$compressToB = LZString.compressToBase64(JSON.stringify(subids))) === null || _LZString$compressToB === void 0 ? void 0 : _LZString$compressToB.length) || 0;
	  if (subidsSize > CONSTANTS.cookie_max_size) {
	    var truncateSubids = Object.entries(subids).sort(function (_ref4, _ref5) {
	      var _ref6 = _slicedToArray(_ref4, 2),
	        prevcreateAt = _ref6[1];
	      var _ref7 = _slicedToArray(_ref5, 2),
	        nextcreateAt = _ref7[1];
	      return nextcreateAt - prevcreateAt;
	    }).slice(0, -1);
	    return getMaxSubids(Object.fromEntries(truncateSubids));
	  }
	  return subids;
	}

	var _excluded = ["consent", "toSubids"];
	var _progids = /*#__PURE__*/new WeakMap();
	var _conversionUrlIterator = /*#__PURE__*/new WeakMap();
	var _statsUrlIterator = /*#__PURE__*/new WeakMap();
	var _proofConsentUrlIterator = /*#__PURE__*/new WeakMap();
	var _registerIpFingerprintUrlIterator = /*#__PURE__*/new WeakMap();
	var _logEventUrlIterator = /*#__PURE__*/new WeakMap();
	var _deleteDataUrlIterator = /*#__PURE__*/new WeakMap();
	var _errors = /*#__PURE__*/new WeakMap();
	var _name = /*#__PURE__*/new WeakMap();
	var _hit = /*#__PURE__*/new WeakMap();
	var _runRetrocompatibility = /*#__PURE__*/new WeakSet();
	var _convertSubidFromPreviousToNextFormat = /*#__PURE__*/new WeakSet();
	var _formatSubidEntry = /*#__PURE__*/new WeakSet();
	var _getActiveSubids = /*#__PURE__*/new WeakSet();
	var _getActiveSubidsValues = /*#__PURE__*/new WeakSet();
	var _getToSubids = /*#__PURE__*/new WeakSet();
	var _getToSubidsWithType = /*#__PURE__*/new WeakSet();
	var _setProgids = /*#__PURE__*/new WeakSet();
	var _shouldUseWildcardDomain = /*#__PURE__*/new WeakSet();
	var _setCookieDomain = /*#__PURE__*/new WeakSet();
	var _configureProgramData = /*#__PURE__*/new WeakSet();
	var _callApi = /*#__PURE__*/new WeakSet();
	var _logEvent = /*#__PURE__*/new WeakSet();
	var _logHit = /*#__PURE__*/new WeakSet();
	var _logStats = /*#__PURE__*/new WeakSet();
	var _setPOC = /*#__PURE__*/new WeakSet();
	var _hasSubids = /*#__PURE__*/new WeakSet();
	var _registerIpFingerprint = /*#__PURE__*/new WeakSet();
	var _setConsent = /*#__PURE__*/new WeakSet();
	var _handleNoConsent = /*#__PURE__*/new WeakSet();
	var _canConvert = /*#__PURE__*/new WeakSet();
	var _setError = /*#__PURE__*/new WeakSet();
	var _getErrors = /*#__PURE__*/new WeakSet();
	var _setConversion = /*#__PURE__*/new WeakSet();
	var Sdk = /*#__PURE__*/function () {
	  function Sdk() {
	    _classCallCheck(this, Sdk);
	    _classPrivateMethodInitSpec(this, _setConversion);
	    _classPrivateMethodInitSpec(this, _getErrors);
	    _classPrivateMethodInitSpec(this, _setError);
	    _classPrivateMethodInitSpec(this, _canConvert);
	    _classPrivateMethodInitSpec(this, _handleNoConsent);
	    _classPrivateMethodInitSpec(this, _setConsent);
	    _classPrivateMethodInitSpec(this, _registerIpFingerprint);
	    _classPrivateMethodInitSpec(this, _hasSubids);
	    _classPrivateMethodInitSpec(this, _setPOC);
	    _classPrivateMethodInitSpec(this, _logStats);
	    _classPrivateMethodInitSpec(this, _logHit);
	    _classPrivateMethodInitSpec(this, _logEvent);
	    _classPrivateMethodInitSpec(this, _callApi);
	    _classPrivateMethodInitSpec(this, _configureProgramData);
	    _classPrivateMethodInitSpec(this, _setCookieDomain);
	    _classPrivateMethodInitSpec(this, _shouldUseWildcardDomain);
	    _classPrivateMethodInitSpec(this, _setProgids);
	    _classPrivateMethodInitSpec(this, _getToSubidsWithType);
	    _classPrivateMethodInitSpec(this, _getToSubids);
	    _classPrivateMethodInitSpec(this, _getActiveSubidsValues);
	    _classPrivateMethodInitSpec(this, _getActiveSubids);
	    _classPrivateMethodInitSpec(this, _formatSubidEntry);
	    _classPrivateMethodInitSpec(this, _convertSubidFromPreviousToNextFormat);
	    _classPrivateMethodInitSpec(this, _runRetrocompatibility);
	    _classPrivateFieldInitSpec(this, _progids, {
	      writable: true,
	      value: []
	    });
	    _classPrivateFieldInitSpec(this, _conversionUrlIterator, {
	      writable: true,
	      value: getApiIterator(CONSTANTS.urls.conversion)
	    });
	    _classPrivateFieldInitSpec(this, _statsUrlIterator, {
	      writable: true,
	      value: getApiIterator(CONSTANTS.urls.stats)
	    });
	    _classPrivateFieldInitSpec(this, _proofConsentUrlIterator, {
	      writable: true,
	      value: getApiIterator(CONSTANTS.urls.proofConsent)
	    });
	    _classPrivateFieldInitSpec(this, _registerIpFingerprintUrlIterator, {
	      writable: true,
	      value: getApiIterator(CONSTANTS.urls.registerIpFingerprint)
	    });
	    _classPrivateFieldInitSpec(this, _logEventUrlIterator, {
	      writable: true,
	      value: getApiIterator(CONSTANTS.urls.events)
	    });
	    _classPrivateFieldInitSpec(this, _deleteDataUrlIterator, {
	      writable: true,
	      value: getApiIterator(CONSTANTS.urls.deleteData)
	    });
	    _classPrivateFieldInitSpec(this, _errors, {
	      writable: true,
	      value: []
	    });
	    _classPrivateFieldInitSpec(this, _name, {
	      writable: true,
	      value: CONSTANTS.sdk_name
	    });
	    _classPrivateFieldInitSpec(this, _hit, {
	      writable: true,
	      value: null
	    });
	    this.env = "production";
	    this.version = "2.6.3";
	    _classPrivateMethodGet(this, _setProgids, _setProgids2).call(this);
	    _classPrivateMethodGet(this, _setCookieDomain, _setCookieDomain2).call(this);
	    _classPrivateMethodGet(this, _configureProgramData, _configureProgramData2).call(this, CONSTANTS.cashback);

	    // Need to wait progids to be set
	    _classPrivateMethodGet(this, _logHit, _logHit2).call(this, {
	      consent: this.consent
	    });
	    _classPrivateMethodGet(this, _logEvent, _logEvent2).call(this, {
	      type: CONSTANTS.events.visit_promethee
	    });
	    if (!this.consent) {
	      _classPrivateMethodGet(this, _setConsent, _setConsent2).call(this, CONSTANTS.consent.status.unknown);
	    }
	    if (this.consent === CONSTANTS.consent.status.optin) {
	      _classPrivateMethodGet(this, _configureProgramData, _configureProgramData2).call(this, CONSTANTS.subid);
	    } else {
	      _classPrivateMethodGet(this, _handleNoConsent, _handleNoConsent2).call(this);
	    }
	  }
	  _createClass(Sdk, [{
	    key: "consentSubids",
	    get: function get() {
	      return _classPrivateMethodGet(this, _getActiveSubids, _getActiveSubids2).call(this, CONSTANTS.subid);
	    }
	  }, {
	    key: "cashbackSubids",
	    get: function get() {
	      return _classPrivateMethodGet(this, _getActiveSubids, _getActiveSubids2).call(this, CONSTANTS.cashback);
	    }
	  }, {
	    key: "consent",
	    get: function get() {
	      return getValue(CONSTANTS.consent.name);
	    }
	  }, {
	    key: "eventConsentId",
	    get: function get() {
	      return getValue(CONSTANTS.event_consent_id.name);
	    }
	  }, {
	    key: "getName",
	    value: function getName() {
	      return _classPrivateFieldGet(this, _name);
	    }
	  }, {
	    key: "_setOptin",
	    value: function _setOptin() {
	      _classPrivateMethodGet(this, _setConsent, _setConsent2).call(this, CONSTANTS.consent.status.optin);
	      _classPrivateMethodGet(this, _configureProgramData, _configureProgramData2).call(this, CONSTANTS.subid);
	      _classPrivateMethodGet(this, _registerIpFingerprint, _registerIpFingerprint2).call(this);
	    }
	  }, {
	    key: "_setOptout",
	    value: function _setOptout() {
	      _classPrivateMethodGet(this, _setConsent, _setConsent2).call(this, CONSTANTS.consent.status.optout);
	      _classPrivateMethodGet(this, _handleNoConsent, _handleNoConsent2).call(this);
	      _classPrivateMethodGet(this, _registerIpFingerprint, _registerIpFingerprint2).call(this);
	    }
	  }, {
	    key: "_setUnknown",
	    value: function _setUnknown() {
	      _classPrivateMethodGet(this, _setConsent, _setConsent2).call(this, CONSTANTS.consent.status.unknown);
	      _classPrivateMethodGet(this, _handleNoConsent, _handleNoConsent2).call(this);
	      _classPrivateMethodGet(this, _registerIpFingerprint, _registerIpFingerprint2).call(this);
	    }
	  }, {
	    key: "_setSale",
	    value: function () {
	      var _setSale2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              _context.prev = 0;
	              _context.next = 3;
	              return _classPrivateMethodGet(this, _setConversion, _setConversion2).call(this, {
	                data: data,
	                caller: '_setSale'
	              });
	            case 3:
	              _context.next = 8;
	              break;
	            case 5:
	              _context.prev = 5;
	              _context.t0 = _context["catch"](0);
	              _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	                error: _context.t0,
	                caller: '_setSale',
	                extra: data
	              });
	            case 8:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this, [[0, 5]]);
	      }));
	      function _setSale(_x) {
	        return _setSale2.apply(this, arguments);
	      }
	      return _setSale;
	    }()
	  }, {
	    key: "_setLead",
	    value: function () {
	      var _setLead2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              _context2.prev = 0;
	              _context2.next = 3;
	              return _classPrivateMethodGet(this, _setConversion, _setConversion2).call(this, {
	                data: data,
	                caller: '_setLead'
	              });
	            case 3:
	              _context2.next = 8;
	              break;
	            case 5:
	              _context2.prev = 5;
	              _context2.t0 = _context2["catch"](0);
	              _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	                error: _context2.t0,
	                caller: '_setLead',
	                extra: data
	              });
	            case 8:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2, this, [[0, 5]]);
	      }));
	      function _setLead(_x2) {
	        return _setLead2.apply(this, arguments);
	      }
	      return _setLead;
	    }()
	  }, {
	    key: "_setDbClick",
	    value: function () {
	      var _setDbClick2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
	        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
	          while (1) switch (_context3.prev = _context3.next) {
	            case 0:
	              _context3.prev = 0;
	              _context3.next = 3;
	              return _classPrivateMethodGet(this, _setConversion, _setConversion2).call(this, {
	                data: data,
	                caller: '_setDbClick'
	              });
	            case 3:
	              _context3.next = 8;
	              break;
	            case 5:
	              _context3.prev = 5;
	              _context3.t0 = _context3["catch"](0);
	              _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	                error: _context3.t0,
	                caller: '_setDbClick',
	                extra: data
	              });
	            case 8:
	            case "end":
	              return _context3.stop();
	          }
	        }, _callee3, this, [[0, 5]]);
	      }));
	      function _setDbClick(_x3) {
	        return _setDbClick2.apply(this, arguments);
	      }
	      return _setDbClick;
	    }()
	  }, {
	    key: "_setClick",
	    value: function () {
	      var _setClick2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
	        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
	          while (1) switch (_context4.prev = _context4.next) {
	            case 0:
	              _context4.prev = 0;
	              _context4.next = 3;
	              return _classPrivateMethodGet(this, _setConversion, _setConversion2).call(this, {
	                data: data,
	                caller: '_setClick'
	              });
	            case 3:
	              _context4.next = 8;
	              break;
	            case 5:
	              _context4.prev = 5;
	              _context4.t0 = _context4["catch"](0);
	              _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	                error: _context4.t0,
	                caller: '_setClick',
	                extra: data
	              });
	            case 8:
	            case "end":
	              return _context4.stop();
	          }
	        }, _callee4, this, [[0, 5]]);
	      }));
	      function _setClick(_x4) {
	        return _setClick2.apply(this, arguments);
	      }
	      return _setClick;
	    }()
	  }, {
	    key: "addConversion",
	    value: function addConversion(progid) {
	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        comid = _ref.comid;
	      if (!progid) {
	        throw new Error("Missing progid. This data is mandatory to add a conversion");
	      }
	      _classPrivateMethodGet(this, _logStats, _logStats2).call(this, {
	        type: CONSTANTS.stats.type.conversion,
	        progid: progid,
	        comid: comid,
	        consent: this.consent
	      });
	    }
	  }, {
	    key: "push",
	    value: function push(args) {
	      var _ref2 = args || [],
	        _ref3 = _toArray(_ref2),
	        functionName = _ref3[0],
	        functionArgs = _ref3.slice(1);
	      try {
	        if (typeof this[functionName] !== 'function') {
	          throw new Error("Undefined function ".concat(functionName));
	        }
	        this[functionName].apply(this, _toConsumableArray(functionArgs));
	      } catch (error) {
	        _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	          error: error,
	          method: functionName
	        });
	      }
	    }
	  }, {
	    key: "getTrace",
	    value: function getTrace() {
	      return {
	        env: this.env,
	        progids: _classPrivateFieldGet(this, _progids),
	        consent: this.consent,
	        consentSubids: this.consentSubids,
	        event_consent_id: this.eventConsentId,
	        cashbackSubids: this.cashbackSubids,
	        errors: _classPrivateMethodGet(this, _getErrors, _getErrors2).call(this),
	        conversionUrls: CONSTANTS.urls.conversion,
	        useWildcardCookieDomain: _classPrivateMethodGet(this, _shouldUseWildcardDomain, _shouldUseWildcardDomain2).call(this)
	      };
	    }
	  }], [{
	    key: "getProgramDataFromQueryParams",
	    value: function getProgramDataFromQueryParams(name) {
	      var queryParams = new URLSearchParams(window.location.search);
	      return queryParams.get(name);
	    }
	  }]);
	  return Sdk;
	}();
	function _formatSubidEntry2(subid) {
	  if (!subid) {
	    return {};
	  }
	  return _defineProperty({}, subid, getCurrentTimestamp());
	}
	function _getActiveSubids2() {
	  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    name = _ref5.name,
	    queryname = _ref5.queryname,
	    ttl = _ref5.ttl;
	  var subidQueryParam = this.constructor.getProgramDataFromQueryParams(queryname);
	  var storedSubids = getValue(name);
	  var subidQueryParamEntry = _classPrivateMethodGet(this, _formatSubidEntry, _formatSubidEntry2).call(this, subidQueryParam);
	  if (!storedSubids) {
	    return subidQueryParamEntry;
	  }
	  try {
	    var subids = storedSubids;
	    if (isObject(subids) && Object.keys(subids).length > 0) {
	      var activeStoredSubids = filterUnActiveSubids(subids, ttl);
	      var activeSubids = _objectSpread2(_objectSpread2({}, activeStoredSubids), subidQueryParamEntry);
	      var maxSubids = getMaxSubids(activeSubids);
	      return maxSubids;
	    }
	    return subidQueryParamEntry;
	  } catch (error) {
	    _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	      error: error,
	      caller: '#getActiveSubids',
	      extra: {
	        name: name,
	        storedSubids: storedSubids
	      }
	    });
	    return subidQueryParamEntry;
	  }
	}
	function _getActiveSubidsValues2() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return Object.keys(_classPrivateMethodGet(this, _getActiveSubids, _getActiveSubids2).call(this, options));
	}
	function _getToSubids2() {
	  var consentSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.subid);
	  var cashbackSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.cashback);
	  return [].concat(_toConsumableArray(consentSubids), _toConsumableArray(cashbackSubids)).filter(Boolean);
	}
	function _getToSubidsWithType2() {
	  var consentSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.subid);
	  var cashbackSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.cashback);
	  var toSubids = consentSubids.map(function (subid) {
	    return {
	      type: CONSTANTS.subid.payloadType,
	      value: subid
	    };
	  });
	  var toCashbackSubids = cashbackSubids.map(function (cashbackSubid) {
	    return {
	      type: CONSTANTS.cashback.payloadType,
	      value: cashbackSubid
	    };
	  });
	  return [].concat(_toConsumableArray(toSubids), _toConsumableArray(toCashbackSubids)).filter(function (_ref6) {
	    var value = _ref6.value;
	    return !!value;
	  });
	}
	function _setProgids2() {
	  try {
	    var _document$getElementB;
	    var progids = (_document$getElementB = document.getElementById(CONSTANTS.sdk_script_id)) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.getAttribute('data-progids');
	    if (progids) {
	      _classPrivateFieldSet(this, _progids, JSON.parse(progids));
	    }
	    if (!progids && window.__ISDK_progid) {
	      _classPrivateFieldSet(this, _progids, Array.isArray(window.__ISDK_progid) ? window.__ISDK_progid : [window.__ISDK_progid]);
	    }
	  } catch (error) {
	    _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	      error: error,
	      caller: 'setProgids'
	    });
	  }
	}
	function _shouldUseWildcardDomain2() {
	  var _document$getElementB2;
	  var wildCardDomainFromAttribut = (_document$getElementB2 = document.getElementById(CONSTANTS.sdk_script_id)) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.getAttribute('data-wildcard-domain');
	  return wildCardDomainFromAttribut === 'true' || window.__ISDK_wildcard_domain === 'true' || window.__ISDK_wildcard_domain === true;
	}
	function _setCookieDomain2() {
	  try {
	    if (_classPrivateMethodGet(this, _shouldUseWildcardDomain, _shouldUseWildcardDomain2).call(this)) {
	      // First we clean all data in storage
	      Object.values(CONSTANTS.cookieKeys).forEach(function (name) {
	        removeValue(name);
	      });

	      // Then we define the wildcard domain for cookie
	      setCookieWildCardDomain();
	    }
	  } catch (error) {
	    _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	      error: error,
	      caller: 'setCookieDomain'
	    });
	  }
	}
	function _configureProgramData2(options) {
	  var _Object$keys;
	  var subids = _classPrivateMethodGet(this, _getActiveSubids, _getActiveSubids2).call(this, options);
	  if (subids && ((_Object$keys = Object.keys(subids)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) > 0) {
	    setValue(subids, options.name);
	  }
	}
	function _callApi2(_x5) {
	  return _callApi3.apply(this, arguments);
	}
	function _callApi3() {
	  _callApi3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref7) {
	    var _ref7$method, method, urlIterator, _ref7$body, body, caller, response, error;
	    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
	      while (1) switch (_context5.prev = _context5.next) {
	        case 0:
	          _ref7$method = _ref7.method, method = _ref7$method === void 0 ? 'POST' : _ref7$method, urlIterator = _ref7.urlIterator, _ref7$body = _ref7.body, body = _ref7$body === void 0 ? {} : _ref7$body, caller = _ref7.caller;
	          if (urlIterator !== null && urlIterator !== void 0 && urlIterator.url) {
	            _context5.next = 4;
	            break;
	          }
	          _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	            error: {
	              message: "Failed to contact server on ".concat(urlIterator === null || urlIterator === void 0 ? void 0 : urlIterator.urls)
	            },
	            caller: caller
	          });
	          return _context5.abrupt("return");
	        case 4:
	          _context5.prev = 4;
	          _context5.next = 7;
	          return fetch(urlIterator === null || urlIterator === void 0 ? void 0 : urlIterator.url, {
	            method: method,
	            headers: {
	              accept: 'application/json',
	              'Content-Type': 'application/json'
	            },
	            body: JSON.stringify(body)
	          });
	        case 7:
	          response = _context5.sent;
	          if (response.ok) {
	            _context5.next = 13;
	            break;
	          }
	          _context5.next = 11;
	          return response.json();
	        case 11:
	          error = _context5.sent;
	          _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	            error: {
	              message: "code ".concat(response === null || response === void 0 ? void 0 : response.status, " - ").concat(error === null || error === void 0 ? void 0 : error.message)
	            },
	            caller: caller,
	            extra: {
	              body: body,
	              url: _classPrivateFieldGet(this, _conversionUrlIterator).url
	            }
	          });
	        case 13:
	          _context5.next = 19;
	          break;
	        case 15:
	          _context5.prev = 15;
	          _context5.t0 = _context5["catch"](4);
	          urlIterator.next();
	          _classPrivateMethodGet(this, _callApi, _callApi2).call(this, {
	            urlIterator: urlIterator,
	            body: body,
	            caller: caller
	          });
	        case 19:
	        case "end":
	          return _context5.stop();
	      }
	    }, _callee5, this, [[4, 15]]);
	  }));
	  return _callApi3.apply(this, arguments);
	}
	function _logEvent2(_ref8) {
	  var _this = this;
	  var type = _ref8.type;
	  try {
	    var toSubids = [CONSTANTS.subid, CONSTANTS.cashback].map(function (_ref9) {
	      var queryname = _ref9.queryname,
	        payloadType = _ref9.payloadType;
	      var value = _this.constructor.getProgramDataFromQueryParams(queryname);
	      if (value) {
	        return {
	          type: payloadType,
	          value: value
	        };
	      }
	      return null;
	    }).filter(Boolean);
	    if (toSubids.length > 0) {
	      _classPrivateMethodGet(this, _callApi, _callApi2).call(this, {
	        urlIterator: _classPrivateFieldGet(this, _logEventUrlIterator),
	        body: {
	          type: type,
	          toSubids: toSubids
	        },
	        caller: '#logEvent'
	      });
	    }
	  } catch (error) {
	    _classPrivateMethodGet(this, _setError, _setError2).call(this, {
	      error: error,
	      caller: 'logEvent',
	      extra: {
	        type: type
	      }
	    });
	  }
	}
	function _logHit2(_ref10) {
	  var _classPrivateFieldGet2,
	    _this2 = this;
	  var consent = _ref10.consent;
	  var shouldNotLog = !consent || ((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _hit)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.consent) === consent;
	  if (shouldNotLog) {
	    return;
	  }
	  var eventTimestamp = getHitTimestamp();
	  var toSubids = [CONSTANTS.subid, CONSTANTS.cashback].map(function (_ref11) {
	    var queryname = _ref11.queryname;
	    return _this2.constructor.getProgramDataFromQueryParams(queryname);
	  }).filter(Boolean);
	  var hit = {
	    type: CONSTANTS.stats.type.hit,
	    consent: consent,
	    url: getCurrentUrl(),
	    event_timestamp: eventTimestamp,
	    count: '1',
	    toSubids: toSubids
	  };
	  _classPrivateFieldGet(this, _progids).forEach(function (progid) {
	    if (_classPrivateFieldGet(_this2, _hit)) {
	      _classPrivateMethodGet(_this2, _logStats, _logStats2).call(_this2, _objectSpread2(_objectSpread2({
	        progid: progid
	      }, _classPrivateFieldGet(_this2, _hit)), {}, {
	        count: '-1'
	      }));
	    }
	    _classPrivateMethodGet(_this2, _logStats, _logStats2).call(_this2, _objectSpread2({
	      progid: progid
	    }, hit));
	  });
	  _classPrivateFieldSet(this, _hit, hit);
	}
	function _logStats2(_ref12) {
	  var consent = _ref12.consent,
	    toSubids = _ref12.toSubids,
	    data = _objectWithoutProperties(_ref12, _excluded);
	  var allToSubids = _classPrivateMethodGet(this, _getToSubids, _getToSubids2).call(this);
	  _classPrivateMethodGet(this, _callApi, _callApi2).call(this, {
	    urlIterator: _classPrivateFieldGet(this, _statsUrlIterator),
	    body: _objectSpread2(_objectSpread2({}, data), {}, {
	      url: getCurrentUrl(),
	      status: consent,
	      toSubids: toSubids || allToSubids
	    }),
	    caller: '#logStats'
	  });
	}
	function _setPOC2() {
	  var eventConsentId = v4();
	  setValue(eventConsentId, CONSTANTS.event_consent_id.name);
	  var body = {
	    event_consent_id: eventConsentId,
	    url: getCurrentUrl()
	  };
	  _classPrivateMethodGet(this, _callApi, _callApi2).call(this, {
	    urlIterator: _classPrivateFieldGet(this, _proofConsentUrlIterator),
	    body: body,
	    caller: '#setPOC'
	  });
	}
	function _hasSubids2(options) {
	  var subids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, options);
	  return (subids === null || subids === void 0 ? void 0 : subids.length) > 0;
	}
	function _registerIpFingerprint2() {
	  var _this3 = this;
	  var shouldRegisterIpAndFingerprintForSubid = this.consent === CONSTANTS.consent.status.optin && this.eventConsentId && _classPrivateMethodGet(this, _hasSubids, _hasSubids2).call(this, CONSTANTS.subid);
	  var shouldRegisterIpAndFingerprintForCashback = _classPrivateMethodGet(this, _hasSubids, _hasSubids2).call(this, CONSTANTS.cashback);
	  var allowSubidTypes = Object.entries(_defineProperty(_defineProperty({}, CONSTANTS.subid.payloadType, shouldRegisterIpAndFingerprintForSubid), CONSTANTS.cashback.payloadType, shouldRegisterIpAndFingerprintForCashback)).filter(function (_ref13) {
	    var _ref14 = _slicedToArray(_ref13, 2),
	      value = _ref14[1];
	    return value;
	  }).map(function (_ref15) {
	    var _ref16 = _slicedToArray(_ref15, 1),
	      key = _ref16[0];
	    return key;
	  });
	  var allToSubids = _classPrivateMethodGet(this, _getToSubidsWithType, _getToSubidsWithType2).call(this);
	  var toSubids = allToSubids.filter(function (_ref17) {
	    var type = _ref17.type;
	    return allowSubidTypes.includes(type);
	  });
	  if (toSubids.length === 0) {
	    return;
	  }
	  _classPrivateFieldGet(this, _progids).forEach(function (progid) {
	    var body = {
	      progid: progid,
	      event_consent_id: _this3.eventConsentId,
	      toSubids: toSubids
	    };
	    _classPrivateMethodGet(_this3, _callApi, _callApi2).call(_this3, {
	      urlIterator: _classPrivateFieldGet(_this3, _registerIpFingerprintUrlIterator),
	      body: body,
	      caller: '#registerIpFingerprint'
	    });
	  });
	}
	function _setConsent2(consent) {
	  var _this4 = this;
	  _classPrivateMethodGet(this, _logHit, _logHit2).call(this, {
	    consent: consent
	  });
	  var shouldSetConsent = consent !== this.consent;
	  if (shouldSetConsent) {
	    setValue(consent, CONSTANTS.consent.name);
	    _classPrivateFieldGet(this, _progids).forEach(function (progid) {
	      _classPrivateMethodGet(_this4, _logStats, _logStats2).call(_this4, {
	        type: CONSTANTS.stats.type.visit,
	        progid: progid,
	        consent: consent
	      });
	    });
	  }
	  var shouldSetupPOC = consent === CONSTANTS.consent.status.optin && !this.eventConsentId && _classPrivateMethodGet(this, _hasSubids, _hasSubids2).call(this, CONSTANTS.subid);
	  if (shouldSetupPOC) {
	    _classPrivateMethodGet(this, _setPOC, _setPOC2).call(this);
	  }
	}
	function _handleNoConsent2() {
	  var _this5 = this;
	  removeValue(CONSTANTS.subid.name);
	  removeValue(CONSTANTS.event_consent_id.name);
	  _classPrivateFieldGet(this, _progids).forEach(function (progid) {
	    _classPrivateMethodGet(_this5, _callApi, _callApi2).call(_this5, {
	      urlIterator: _classPrivateFieldGet(_this5, _deleteDataUrlIterator),
	      method: 'DELETE',
	      body: {
	        progid: progid
	      },
	      caller: '#handleNoConsent'
	    });
	  });
	}
	function _canConvert2() {
	  return this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname) || _classPrivateMethodGet(this, _hasSubids, _hasSubids2).call(this, CONSTANTS.cashback) || this.consent === CONSTANTS.consent.status.optin;
	}
	function _setError2(data) {
	  _classPrivateFieldGet(this, _errors).push(data);
	}
	function _getErrors2() {
	  return _classPrivateFieldGet(this, _errors).map(function (_ref18) {
	    var error = _ref18.error,
	      caller = _ref18.caller,
	      extra = _ref18.extra;
	    return {
	      message: "While calling the method \"".concat(caller, "\": ").concat(error.message),
	      extra: extra
	    };
	  });
	}
	function _setConversion2(_x6) {
	  return _setConversion3.apply(this, arguments);
	}
	function _setConversion3() {
	  _setConversion3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref19) {
	    var _classPrivateFieldGet3;
	    var _ref19$data, data, _ref19$caller, caller, progid, comid, iu, _classPrivateFieldGet4, payload, body;
	    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
	      while (1) switch (_context6.prev = _context6.next) {
	        case 0:
	          _ref19$data = _ref19.data, data = _ref19$data === void 0 ? {} : _ref19$data, _ref19$caller = _ref19.caller, caller = _ref19$caller === void 0 ? 'setConversion' : _ref19$caller;
	          if (_classPrivateMethodGet(this, _canConvert, _canConvert2).call(this)) {
	            _context6.next = 3;
	            break;
	          }
	          throw new Error("Make a conversion is not allowed. Check consent or ".concat(CONSTANTS.subid.queryname));
	        case 3:
	          progid = data.progid, comid = data.comid, iu = data.iu;
	          if (!(!progid || !comid || !iu)) {
	            _context6.next = 6;
	            break;
	          }
	          throw new Error("Missing progid or comid or iu. Those data are mandatory to make a conversion");
	        case 6:
	          if ((_classPrivateFieldGet3 = _classPrivateFieldGet(this, _conversionUrlIterator)) !== null && _classPrivateFieldGet3 !== void 0 && _classPrivateFieldGet3.url) {
	            _context6.next = 8;
	            break;
	          }
	          throw new Error("Failed to contact server on ".concat(JSON.stringify((_classPrivateFieldGet4 = _classPrivateFieldGet(this, _conversionUrlIterator)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.urls)));
	        case 8:
	          payload = _objectSpread2(_objectSpread2({}, data), {}, {
	            event_consent_id: this.eventConsentId,
	            toSubids: _classPrivateMethodGet(this, _getToSubidsWithType, _getToSubidsWithType2).call(this)
	          });
	          body = Object.fromEntries(Object.entries(payload).filter(function (_ref20) {
	            var _ref21 = _slicedToArray(_ref20, 2),
	              value = _ref21[1];
	            return !!value;
	          }));
	          _context6.next = 12;
	          return _classPrivateMethodGet(this, _callApi, _callApi2).call(this, {
	            urlIterator: _classPrivateFieldGet(this, _conversionUrlIterator),
	            body: body,
	            caller: caller
	          });
	        case 12:
	        case "end":
	          return _context6.stop();
	      }
	    }, _callee6, this);
	  }));
	  return _setConversion3.apply(this, arguments);
	}

	var sdkName = CONSTANTS.sdk_name;
	function init() {
	  var Sdk$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Sdk;
	  try {
	    var _window$sdkName, _window$sdkName$getNa;
	    if (typeof window[sdkName] === 'undefined') {
	      window[sdkName] = new Sdk$1();
	    } else if (_typeof(window[sdkName]) === 'object' && Array.isArray(window[sdkName])) {
	      var sdkTmp = new Sdk$1();
	      window[sdkName].forEach(function (args) {
	        return sdkTmp.push(args);
	      });
	      window[sdkName] = sdkTmp;
	    } else if (_typeof(window[sdkName]) === 'object' && ((_window$sdkName = window[sdkName]) === null || _window$sdkName === void 0 || (_window$sdkName$getNa = _window$sdkName.getName) === null || _window$sdkName$getNa === void 0 ? void 0 : _window$sdkName$getNa.call(_window$sdkName)) === sdkName) {
	      // Nothing
	    } else {
	      throw new Error("".concat(sdkName, " error: Unknown type"));
	    }
	  } catch (e) {
	    // eslint-disable-next-line no-console
	    console.error(e.message);
	  }
	}

	init(Sdk);

})();
