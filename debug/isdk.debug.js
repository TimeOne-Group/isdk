
/*! isdk 2.3.0 https://github.com/TimeOne-Group/isdk#readme @license GPL-3.0 */
(function () {
  'use strict';

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
      Object.defineProperty(target, descriptor.key, descriptor);
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
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

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var check = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$2 = // eslint-disable-next-line es-x/no-global-this -- safe
  check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check((typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self) || check(_typeof(commonjsGlobal) == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var fails = function fails(exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var functionBindNative = !fails(function () {
    // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
    var test = function () {
      /* empty */
    }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var FunctionPrototype$1 = Function.prototype;
  var bind$1 = FunctionPrototype$1.bind;
  var call$1 = FunctionPrototype$1.call;
  var uncurryThis = functionBindNative && bind$1.bind(call$1, call$1);
  var functionUncurryThis = functionBindNative ? function (fn) {
    return fn && uncurryThis(fn);
  } : function (fn) {
    return fn && function () {
      return call$1.apply(fn, arguments);
    };
  };

  var toString$2 = functionUncurryThis({}.toString);
  var stringSlice$1 = functionUncurryThis(''.slice);

  var classofRaw = function classofRaw(it) {
    return stringSlice$1(toString$2(it), 8, -1);
  };

  var Object$5 = global$2.Object;
  var split$1 = functionUncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$5('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split$1(it, '') : Object$5(it);
  } : Object$5;

  var TypeError$d = global$2.TypeError; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible = function requireObjectCoercible(it) {
    if (it == undefined) throw TypeError$d("Can't call method on " + it);
    return it;
  };

  var toIndexedObject = function toIndexedObject(it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isPure = false;

  var defineProperty$2 = Object.defineProperty;

  var setGlobal = function setGlobal(key, value) {
    try {
      defineProperty$2(global$2, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$2[key] = value;
    }

    return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global$2[SHARED] || setGlobal(SHARED, {});
  var sharedStore = store$1;

  var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.22.4',
      mode: 'global',
      copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
      license: 'https://github.com/zloirock/core-js/blob/v3.22.4/LICENSE',
      source: 'https://github.com/zloirock/core-js'
    });
  });

  var Object$4 = global$2.Object; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject = function toObject(argument) {
    return Object$4(requireObjectCoercible(argument));
  };

  var hasOwnProperty = functionUncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es-x/no-object-hasown -- safe

  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

  var id$1 = 0;
  var postfix = Math.random();
  var toString$1 = functionUncurryThis(1.0.toString);

  var uid = function uid(key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id$1 + postfix, 36);
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable = function isCallable(argument) {
    return typeof argument == 'function';
  };

  var aFunction = function aFunction(argument) {
    return isCallable(argument) ? argument : undefined;
  };

  var getBuiltIn = function getBuiltIn(namespace, method) {
    return arguments.length < 2 ? aFunction(global$2[namespace]) : global$2[namespace] && global$2[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global$2.process;
  var Deno = global$2.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us

    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  } // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0


  if (!version && engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es-x/no-symbol -- required for testing */

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && engineV8Version && engineV8Version < 41;
  });

  var useSymbolAsUid = nativeSymbol && !Symbol.sham && _typeof(Symbol.iterator) == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var _Symbol = global$2.Symbol;
  var symbolFor = _Symbol && _Symbol['for'];
  var createWellKnownSymbol = useSymbolAsUid ? _Symbol : _Symbol && _Symbol.withoutSetter || uid;

  var wellKnownSymbol = function wellKnownSymbol(name) {
    if (!hasOwnProperty_1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;

      if (nativeSymbol && hasOwnProperty_1(_Symbol, name)) {
        WellKnownSymbolsStore[name] = _Symbol[name];
      } else if (useSymbolAsUid && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    }

    return WellKnownSymbolsStore[name];
  };

  var isObject$1 = function isObject(it) {
    return _typeof(it) == 'object' ? it !== null : isCallable(it);
  };

  var String$4 = global$2.String;
  var TypeError$c = global$2.TypeError; // `Assert: Type(argument) is Object`

  var anObject = function anObject(argument) {
    if (isObject$1(argument)) return argument;
    throw TypeError$c(String$4(argument) + ' is not an object');
  };

  var descriptors = !fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function get() {
        return 7;
      }
    })[1] != 7;
  });

  // https://bugs.chromium.org/p/v8/issues/detail?id=3334

  var v8PrototypeDefineBug = descriptors && fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () {
      /* empty */
    }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var document$1 = global$2.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 = isObject$1(document$1) && isObject$1(document$1.createElement);

  var documentCreateElement = function documentCreateElement(it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  var call = Function.prototype.call;
  var functionCall = functionBindNative ? call.bind(call) : function () {
    return call.apply(call, arguments);
  };

  var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

  var Object$3 = global$2.Object;
  var isSymbol = useSymbolAsUid ? function (it) {
    return _typeof(it) == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, Object$3(it));
  };

  var String$3 = global$2.String;

  var tryToString = function tryToString(argument) {
    try {
      return String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var TypeError$b = global$2.TypeError; // `Assert: IsCallable(argument) is true`

  var aCallable = function aCallable(argument) {
    if (isCallable(argument)) return argument;
    throw TypeError$b(tryToString(argument) + ' is not a function');
  };

  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod = function getMethod(V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var TypeError$a = global$2.TypeError; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive = function ordinaryToPrimitive(input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject$1(val = functionCall(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject$1(val = functionCall(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject$1(val = functionCall(fn, input))) return val;
    throw TypeError$a("Can't convert object to primitive value");
  };

  var TypeError$9 = global$2.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive = function toPrimitive(input, pref) {
    if (!isObject$1(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;

    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = functionCall(exoticToPrim, input, pref);
      if (!isObject$1(result) || isSymbol(result)) return result;
      throw TypeError$9("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey = function toPropertyKey(argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var TypeError$8 = global$2.TypeError; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

  var $defineProperty = Object.defineProperty; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable'; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  var f$6 = descriptors ? v8PrototypeDefineBug ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);

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
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$8('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var objectDefineProperty = {
    f: f$6
  };

  var ceil = Math.ceil;
  var floor$1 = Math.floor; // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity

  var toIntegerOrInfinity = function toIntegerOrInfinity(argument) {
    var number = +argument; // eslint-disable-next-line no-self-compare -- safe

    return number !== number || number === 0 ? 0 : (number > 0 ? floor$1 : ceil)(number);
  };

  var max$1 = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
  };

  var min = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength = function toLength(argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // https://tc39.es/ecma262/#sec-lengthofarraylike

  var lengthOfArrayLike = function lengthOfArrayLike(obj) {
    return toLength(obj.length);
  };

  var createMethod$1 = function createMethod(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = lengthOfArrayLike(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
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

  var hiddenKeys$1 = {};

  var indexOf = arrayIncludes.indexOf;
  var push$2 = functionUncurryThis([].push);

  var objectKeysInternal = function objectKeysInternal(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !hasOwnProperty_1(hiddenKeys$1, key) && hasOwnProperty_1(O, key) && push$2(result, key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (hasOwnProperty_1(O, key = names[i++])) {
        ~indexOf(result, key) || push$2(result, key);
      }
    }

    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es-x/no-object-keys -- safe

  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es-x/no-object-defineproperties -- safe

  var f$5 = descriptors && !v8PrototypeDefineBug ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) {
      objectDefineProperty.f(O, key = keys[index++], props[key]);
    }

    return O;
  };
  var objectDefineProperties = {
    f: f$5
  };

  var html = getBuiltIn('document', 'documentElement');

  var keys = shared('keys');

  var sharedKey = function sharedKey(key) {
    return keys[key] || (keys[key] = uid(key));
  };

  /* global ActiveXObject -- old IE, WSH */
  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var EmptyConstructor = function EmptyConstructor() {
    /* empty */
  };

  var scriptTag = function scriptTag(content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug


  var activeXDocument;

  var _NullProtoObject = function NullProtoObject() {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

    var length = enumBugKeys.length;

    while (length--) {
      delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    }

    return _NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es-x/no-object-create -- safe

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = _NullProtoObject();

    return Properties === undefined ? result : objectDefineProperties.f(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype$1 = Array.prototype; // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  } // add a key to Array.prototype[@@unscopables]


  var addToUnscopables = function addToUnscopables(key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var functionToString = functionUncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (!isCallable(sharedStore.inspectSource)) {
    sharedStore.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$2 = global$2.WeakMap;
  var nativeWeakMap = isCallable(WeakMap$2) && /native code/.test(inspectSource(WeakMap$2));

  var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$7 = global$2.TypeError;
  var WeakMap$1 = global$2.WeakMap;
  var set, get, has;

  var enforce = function enforce(it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$7('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap$1());
    var wmget = functionUncurryThis(store.get);
    var wmhas = functionUncurryThis(store.has);
    var wmset = functionUncurryThis(store.set);

    set = function set(it, metadata) {
      if (wmhas(store, it)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };

    get = function get(it) {
      return wmget(store, it) || {};
    };

    has = function has(it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$1[STATE] = true;

    set = function set(it, metadata) {
      if (hasOwnProperty_1(it, STATE)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };

    get = function get(it) {
      return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
    };

    has = function has(it) {
      return hasOwnProperty_1(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

  var f$4 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;
  var objectPropertyIsEnumerable = {
    f: f$4
  };

  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  var f$3 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
  };
  var objectGetOwnPropertyDescriptor = {
    f: f$3
  };

  var FunctionPrototype = Function.prototype; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

  var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwnProperty_1(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

  var PROPER = EXISTS && function something() {
    /* empty */
  }.name === 'something';

  var CONFIGURABLE = EXISTS && (!descriptors || descriptors && getDescriptor(FunctionPrototype, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var makeBuiltIn_1 = createCommonjsModule(function (module) {
    var defineProperty = objectDefineProperty.f;
    var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
    var enforceInternalState = internalState.enforce;
    var getInternalState = internalState.get;
    var CONFIGURABLE_LENGTH = !fails(function () {
      return defineProperty(function () {
        /* empty */
      }, 'length', {
        value: 8
      }).length !== 8;
    });
    var TEMPLATE = String(String).split('String');

    var makeBuiltIn = module.exports = function (value, name, options) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }

      if (options && options.getter) name = 'get ' + name;
      if (options && options.setter) name = 'set ' + name;

      if (!hasOwnProperty_1(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        defineProperty(value, 'name', {
          value: name,
          configurable: true
        });
      }

      if (CONFIGURABLE_LENGTH && options && hasOwnProperty_1(options, 'arity') && value.length !== options.arity) {
        defineProperty(value, 'length', {
          value: options.arity
        });
      }

      var state = enforceInternalState(value);

      if (!hasOwnProperty_1(state, 'source')) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }

      return value;
    }; // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    // eslint-disable-next-line no-extend-native -- required


    Function.prototype.toString = makeBuiltIn(function toString() {
      return isCallable(this) && getInternalState(this).source || inspectSource(this);
    }, 'toString');
  });

  var defineBuiltIn = function defineBuiltIn(O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn_1(value, name, options);

    if (O === global$2) {
      if (simple) O[key] = value;else setGlobal(key, value);
      return O;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value);
    return O;
  };

  var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es-x/no-object-getownpropertynames -- safe

  var f$2 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

  var objectGetOwnPropertyNames = {
    f: f$2
  };

  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
  var f$1 = Object.getOwnPropertySymbols;
  var objectGetOwnPropertySymbols = {
    f: f$1
  };

  var concat = functionUncurryThis([].concat); // all object keys, includes non-enumerable and symbols

  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function copyConstructorProperties(target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (!hasOwnProperty_1(target, key) && !(exceptions && hasOwnProperty_1(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function isForced(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';
  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */

  var _export = function _export(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global$2;
    } else if (STATIC) {
      target = global$2[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$2[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (_typeof(sourceProperty) == _typeof(targetProperty)) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }

      defineBuiltIn(target, key, sourceProperty, options);
    }
  };

  var correctPrototypeGetter = !fails(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null; // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing

    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var Object$2 = global$2.Object;
  var ObjectPrototype = Object$2.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof

  var objectGetPrototypeOf = correctPrototypeGetter ? Object$2.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwnProperty_1(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;

    if (isCallable(constructor) && object instanceof constructor) {
      return constructor.prototype;
    }

    return object instanceof Object$2 ? ObjectPrototype : null;
  };

  var ITERATOR$7 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false; // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object

  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
  /* eslint-disable es-x/no-array-prototype-keys -- safe */

  if ([].keys) {
    arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
    var test = {}; // FF44- legacy iterators case

    return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

  if (!isCallable(IteratorPrototype$2[ITERATOR$7])) {
    defineBuiltIn(IteratorPrototype$2, ITERATOR$7, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$1 = objectDefineProperty.f;
  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

  var setToStringTag = function setToStringTag(target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;

    if (target && !hasOwnProperty_1(target, TO_STRING_TAG$3)) {
      defineProperty$1(target, TO_STRING_TAG$3, {
        configurable: true,
        value: TAG
      });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

  var returnThis$1 = function returnThis() {
    return this;
  };

  var createIteratorConstructor = function createIteratorConstructor(IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
      next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var String$2 = global$2.String;
  var TypeError$6 = global$2.TypeError;

  var aPossiblePrototype = function aPossiblePrototype(argument) {
    if (_typeof(argument) == 'object' || isCallable(argument)) return argument;
    throw TypeError$6("Can't set " + String$2(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es-x/no-object-setprototypeof -- safe

  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;

    try {
      // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
      setter = functionUncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$6 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function returnThis() {
    return this;
  };

  var defineIterator = function defineIterator(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function getIterationMethod(KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

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
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$6])) {
            defineBuiltIn(CurrentIteratorPrototype, ITERATOR$6, returnThis);
          }
        } // Set @@toStringTag to native iterators


        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;

        defaultIterator = function values() {
          return functionCall(nativeIterator, this);
        };
      }
    } // export additional methods


    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    } // define iterator


    if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
      defineBuiltIn(IterablePrototype, ITERATOR$6, defaultIterator, {
        name: DEFAULT
      });
    }

    iterators[NAME] = defaultIterator;
    return methods;
  };

  var defineProperty = objectDefineProperty.f;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$2 = internalState.set;
  var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
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
      target: toIndexedObject(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind

    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;

    if (!target || index >= target.length) {
      state.target = undefined;
      return {
        value: undefined,
        done: true
      };
    }

    if (kind == 'keys') return {
      value: index,
      done: false
    };
    if (kind == 'values') return {
      value: target[index],
      done: false
    };
    return {
      value: [index, target[index]],
      done: false
    };
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject

  var values = iterators.Arguments = iterators.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries'); // V8 ~ Chrome 45- bug

  if (descriptors && values.name !== 'values') try {
    defineProperty(values, 'name', {
      value: 'values'
    });
  } catch (error) {
    /* empty */
  }

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  var test = {};
  test[TO_STRING_TAG$2] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var Object$1 = global$2.Object; // ES3 wrong here

  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function tryGet(it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`


  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  };

  // https://tc39.es/ecma262/#sec-object.prototype.tostring


  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  if (!toStringTagSupport) {
    defineBuiltIn(Object.prototype, 'toString', objectToString, {
      unsafe: true
    });
  }

  var createProperty = function createProperty(object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
  };

  var Array$2 = global$2.Array;
  var max = Math.max;

  var arraySliceSimple = function arraySliceSimple(O, start, end) {
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = Array$2(max(fin - k, 0));

    for (var n = 0; k < fin; k++, n++) {
      createProperty(result, n, O[k]);
    }

    result.length = n;
    return result;
  };

  var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function getWindowNames(it) {
    try {
      return $getOwnPropertyNames(it);
    } catch (error) {
      return arraySliceSimple(windowNames);
    }
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


  var f = function getOwnPropertyNames(it) {
    return windowNames && classofRaw(it) == 'Window' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
    f: f
  };

  var arrayBufferNonExtensible = fails(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8); // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-defineproperty -- safe

      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', {
        value: 8
      });
    }
  });

  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES = fails(function () {
    $isExtensible(1);
  }); // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible

  var objectIsExtensible = FAILS_ON_PRIMITIVES || arrayBufferNonExtensible ? function isExtensible(it) {
    if (!isObject$1(it)) return false;
    if (arrayBufferNonExtensible && classofRaw(it) == 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var freezing = !fails(function () {
    // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule(function (module) {
    var defineProperty = objectDefineProperty.f;
    var REQUIRED = false;
    var METADATA = uid('meta');
    var id = 0;

    var setMetadata = function setMetadata(it) {
      defineProperty(it, METADATA, {
        value: {
          objectID: 'O' + id++,
          // object ID
          weakData: {} // weak collections IDs

        }
      });
    };

    var fastKey = function fastKey(it, create) {
      // return a primitive with prefix
      if (!isObject$1(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

      if (!hasOwnProperty_1(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!objectIsExtensible(it)) return 'F'; // not necessary to add metadata

        if (!create) return 'E'; // add missing metadata

        setMetadata(it); // return object ID
      }

      return it[METADATA].objectID;
    };

    var getWeakData = function getWeakData(it, create) {
      if (!hasOwnProperty_1(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!objectIsExtensible(it)) return true; // not necessary to add metadata

        if (!create) return false; // add missing metadata

        setMetadata(it); // return the store of weak collections IDs
      }

      return it[METADATA].weakData;
    }; // add metadata on freeze-family methods calling


    var onFreeze = function onFreeze(it) {
      if (freezing && REQUIRED && objectIsExtensible(it) && !hasOwnProperty_1(it, METADATA)) setMetadata(it);
      return it;
    };

    var enable = function enable() {
      meta.enable = function () {
        /* empty */
      };

      REQUIRED = true;
      var getOwnPropertyNames = objectGetOwnPropertyNames.f;
      var splice = functionUncurryThis([].splice);
      var test = {};
      test[METADATA] = 1; // prevent exposing of metadata key

      if (getOwnPropertyNames(test).length) {
        objectGetOwnPropertyNames.f = function (it) {
          var result = getOwnPropertyNames(it);

          for (var i = 0, length = result.length; i < length; i++) {
            if (result[i] === METADATA) {
              splice(result, i, 1);
              break;
            }
          }

          return result;
        };

        _export({
          target: 'Object',
          stat: true,
          forced: true
        }, {
          getOwnPropertyNames: objectGetOwnPropertyNamesExternal.f
        });
      }
    };

    var meta = module.exports = {
      enable: enable,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    };
    hiddenKeys$1[METADATA] = true;
  });

  var bind = functionUncurryThis(functionUncurryThis.bind); // optional / simple context binding

  var functionBindContext = function functionBindContext(fn, that) {
    aCallable(fn);
    return that === undefined ? fn : functionBindNative ? bind(fn, that) : function
      /* ...args */
    () {
      return fn.apply(that, arguments);
    };
  };

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod = function isArrayIteratorMethod(it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$5] === it);
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');

  var getIteratorMethod = function getIteratorMethod(it) {
    if (it != undefined) return getMethod(it, ITERATOR$4) || getMethod(it, '@@iterator') || iterators[classof(it)];
  };

  var TypeError$5 = global$2.TypeError;

  var getIterator = function getIterator(argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
    throw TypeError$5(tryToString(argument) + ' is not iterable');
  };

  var iteratorClose = function iteratorClose(iterator, kind, value) {
    var innerResult, innerError;
    anObject(iterator);

    try {
      innerResult = getMethod(iterator, 'return');

      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }

      innerResult = functionCall(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }

    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject(innerResult);
    return value;
  };

  var TypeError$4 = global$2.TypeError;

  var Result = function Result(stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate = function iterate(iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function stop(condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function callFn(value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      }

      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw TypeError$4(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && objectIsPrototypeOf(ResultPrototype, result)) return result;
        }

        return new Result(false);
      }

      iterator = getIterator(iterable, iterFn);
    }

    next = iterator.next;

    while (!(step = functionCall(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }

      if (_typeof(result) == 'object' && result && objectIsPrototypeOf(ResultPrototype, result)) return result;
    }

    return new Result(false);
  };

  var TypeError$3 = global$2.TypeError;

  var anInstance = function anInstance(it, Prototype) {
    if (objectIsPrototypeOf(Prototype, it)) return it;
    throw TypeError$3('Incorrect invocation');
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');
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
    }; // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing


    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration = function checkCorrectnessOfIteration(exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
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
    } catch (error) {
      /* empty */
    }

    return ITERATION_SUPPORT;
  };

  var inheritIfRequired = function inheritIfRequired($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if ( // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$1(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var collection = function collection(CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$2[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function fixMethod(KEY) {
      var uncurriedNativeMethod = functionUncurryThis(NativePrototype[KEY]);
      defineBuiltIn(NativePrototype, KEY, KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject$1(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject$1(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject$1(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      });
    };

    var REPLACE = isForced_1(CONSTRUCTOR_NAME, !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    })));

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.enable();
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor(); // early implementations not supports chaining

      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

      var THROWS_ON_PRIMITIVES = fails(function () {
        instance.has(1);
      }); // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing

      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
        new NativeConstructor(iterable);
      }); // for early implementations -0 and +0 not the same

      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;

        while (index--) {
          $instance[ADDER](index, index);
        }

        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, NativePrototype);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate(iterable, that[ADDER], {
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

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export({
      global: true,
      forced: Constructor != NativeConstructor
    }, exported);
    setToStringTag(Constructor, CONSTRUCTOR_NAME);
    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
    return Constructor;
  };

  var defineBuiltIns = function defineBuiltIns(target, src, options) {
    for (var key in src) {
      defineBuiltIn(target, key, src[key], options);
    }

    return target;
  };

  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es-x/no-array-isarray -- safe

  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

  var noop = function noop() {
    /* empty */
  };

  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = functionUncurryThis(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;

    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;

    switch (classof(argument)) {
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

  isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor

  var isConstructor = !construct || fails(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var SPECIES = wellKnownSymbol('species');
  var Array$1 = global$2.Array; // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor = function arraySpeciesConstructor(originalArray) {
    var C;

    if (isArray(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (isConstructor(C) && (C === Array$1 || isArray(C.prototype))) C = undefined;else if (isObject$1(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array$1 : C;
  };

  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate = function arraySpeciesCreate(originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var push$1 = functionUncurryThis([].push); // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

  var createMethod = function createMethod(TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that);
      var length = lengthOfArrayLike(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;

      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
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

  var getWeakData = internalMetadata.getWeakData;
  var setInternalState$1 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;
  var find$1 = arrayIteration.find;
  var findIndex = arrayIteration.findIndex;
  var splice$1 = functionUncurryThis([].splice);
  var id = 0; // fallback for uncaught frozen keys

  var uncaughtFrozenStore = function uncaughtFrozenStore(store) {
    return store.frozen || (store.frozen = new UncaughtFrozenStore());
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
  var collectionWeak = {
    getConstructor: function getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState$1(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: undefined
        });
        if (iterable != undefined) iterate(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP
        });
      });
      var Prototype = Constructor.prototype;
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function define(that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);else data[state.id] = value;
        return that;
      };

      defineBuiltIns(Prototype, {
        // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
        // https://tc39.es/ecma262/#sec-weakset.prototype.delete
        'delete': function _delete(key) {
          var state = getInternalState(this);
          if (!isObject$1(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && hasOwnProperty_1(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject$1(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && hasOwnProperty_1(data, state.id);
        }
      });
      defineBuiltIns(Prototype, IS_MAP ? {
        // `WeakMap.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.get
        get: function get(key) {
          var state = getInternalState(this);

          if (isObject$1(key)) {
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

  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  var handlePrototype = function handlePrototype(CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$2] = ArrayValues;
      }

      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }

      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME in domIterables) {
    handlePrototype(global$2[COLLECTION_NAME] && global$2[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }

  handlePrototype(domTokenListPrototype, 'DOMTokenList');

  var ITERATOR$1 = wellKnownSymbol('iterator');
  var nativeUrl = !fails(function () {
    // eslint-disable-next-line unicorn/relative-url-style -- required for testing
    var url = new URL('b?a=1&b=2&c=3', 'http://a');
    var searchParams = url.searchParams;
    var result = '';
    url.pathname = 'c%20d';
    searchParams.forEach(function (value, key) {
      searchParams['delete']('b');
      result += key + value;
    });
    return isPure && !url.toJSON || !searchParams.sort || url.href !== 'http://a/c%20d?a=1&c=3' || searchParams.get('c') !== '3' || String(new URLSearchParams('?a=1')) !== 'a=1' || !searchParams[ITERATOR$1] // throws in Edge
    || new URL('https://a@b').username !== 'a' || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc' // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1' // fails in Chrome 66-
    || result !== 'a1c3' // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
  });

  var String$1 = global$2.String;

  var toString = function toString(argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$1(argument);
  };

  var TypeError$2 = global$2.TypeError;

  var validateArgumentsLength = function validateArgumentsLength(passed, required) {
    if (passed < required) throw TypeError$2('Not enough arguments');
    return passed;
  };

  var floor = Math.floor;

  var mergeSort = function mergeSort(array, comparefn) {
    var length = array.length;
    var middle = floor(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(array, mergeSort(arraySliceSimple(array, 0, middle), comparefn), mergeSort(arraySliceSimple(array, middle), comparefn), comparefn);
  };

  var insertionSort = function insertionSort(array, comparefn) {
    var length = array.length;
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

    return array;
  };

  var merge = function merge(array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
    }

    return array;
  };

  var arraySort = mergeSort;

  var ITERATOR = wellKnownSymbol('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState = internalState.set;
  var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR); // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Avoid NodeJS experimental warning

  var safeGetBuiltIn = function safeGetBuiltIn(name) {
    if (!descriptors) return global$2[name];
    var descriptor = getOwnPropertyDescriptor(global$2, name);
    return descriptor && descriptor.value;
  };

  var nativeFetch = safeGetBuiltIn('fetch');
  var NativeRequest = safeGetBuiltIn('Request');
  var Headers$1 = safeGetBuiltIn('Headers');
  var RequestPrototype = NativeRequest && NativeRequest.prototype;
  var HeadersPrototype = Headers$1 && Headers$1.prototype;
  var RegExp = global$2.RegExp;
  var TypeError$1 = global$2.TypeError;
  var decodeURIComponent$1 = global$2.decodeURIComponent;
  var encodeURIComponent$1 = global$2.encodeURIComponent;
  var charAt = functionUncurryThis(''.charAt);
  var join = functionUncurryThis([].join);
  var push = functionUncurryThis([].push);
  var replace = functionUncurryThis(''.replace);
  var shift = functionUncurryThis([].shift);
  var splice = functionUncurryThis([].splice);
  var split = functionUncurryThis(''.split);
  var stringSlice = functionUncurryThis(''.slice);
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
      iterator: getIterator(getInternalParamsState(params).entries),
      kind: kind
    });
  }, 'Iterator', function next() {
    var state = getInternalIteratorState(this);
    var kind = state.kind;
    var step = state.iterator.next();
    var entry = step.value;

    if (!step.done) {
      step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
    }

    return step;
  }, true);

  var URLSearchParamsState = function URLSearchParamsState(init) {
    this.entries = [];
    this.url = null;

    if (init !== undefined) {
      if (isObject$1(init)) this.parseObject(init);else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : toString(init));
    }
  };

  URLSearchParamsState.prototype = {
    type: URL_SEARCH_PARAMS,
    bindURL: function bindURL(url) {
      this.url = url;
      this.update();
    },
    parseObject: function parseObject(object) {
      var iteratorMethod = getIteratorMethod(object);
      var iterator, next, step, entryIterator, entryNext, first, second;

      if (iteratorMethod) {
        iterator = getIterator(object, iteratorMethod);
        next = iterator.next;

        while (!(step = functionCall(next, iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if ((first = functionCall(entryNext, entryIterator)).done || (second = functionCall(entryNext, entryIterator)).done || !functionCall(entryNext, entryIterator).done) throw TypeError$1('Expected sequence with length 2');
          push(this.entries, {
            key: toString(first.value),
            value: toString(second.value)
          });
        }
      } else for (var key in object) {
        if (hasOwnProperty_1(object, key)) {
          push(this.entries, {
            key: key,
            value: toString(object[key])
          });
        }
      }
    },
    parseQuery: function parseQuery(query) {
      if (query) {
        var attributes = split(query, '&');
        var index = 0;
        var attribute, entry;

        while (index < attributes.length) {
          attribute = attributes[index++];

          if (attribute.length) {
            entry = split(attribute, '=');
            push(this.entries, {
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
  }; // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams

  var URLSearchParamsConstructor = function
    /* init */
  URLSearchParams() {
    anInstance(this, URLSearchParamsPrototype);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    setInternalState(this, new URLSearchParamsState(init));
  };

  var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
  defineBuiltIns(URLSearchParamsPrototype, {
    // `URLSearchParams.prototype.append` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
      validateArgumentsLength(arguments.length, 2);
      var state = getInternalParamsState(this);
      push(state.entries, {
        key: toString(name),
        value: toString(value)
      });
      state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    'delete': function _delete(name) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var key = toString(name);
      var index = 0;

      while (index < entries.length) {
        if (entries[index].key === key) splice(entries, index, 1);else index++;
      }

      state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = toString(name);
      var index = 0;

      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }

      return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = toString(name);
      var result = [];
      var index = 0;

      for (; index < entries.length; index++) {
        if (entries[index].key === key) push(result, entries[index].value);
      }

      return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = toString(name);
      var index = 0;

      while (index < entries.length) {
        if (entries[index++].key === key) return true;
      }

      return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set(name, value) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var found = false;
      var key = toString(name);
      var val = toString(value);
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
    forEach: function forEach(callback
    /* , thisArg */
    ) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = functionBindContext(callback, arguments.length > 1 ? arguments[1] : undefined);
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
  }); // `URLSearchParams.prototype[@@iterator]` method

  defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, {
    name: 'entries'
  }); // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

  defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
    return getInternalParamsState(this).serialize();
  }, {
    enumerable: true
  });
  setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  _export({
    global: true,
    forced: !nativeUrl
  }, {
    URLSearchParams: URLSearchParamsConstructor
  }); // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`

  if (!nativeUrl && isCallable(Headers$1)) {
    var headersHas = functionUncurryThis(HeadersPrototype.has);
    var headersSet = functionUncurryThis(HeadersPrototype.set);

    var wrapRequestOptions = function wrapRequestOptions(init) {
      if (isObject$1(init)) {
        var body = init.body;
        var headers;

        if (classof(body) === URL_SEARCH_PARAMS) {
          headers = init.headers ? new Headers$1(init.headers) : new Headers$1();

          if (!headersHas(headers, 'content-type')) {
            headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }

          return objectCreate(init, {
            body: createPropertyDescriptor(0, toString(body)),
            headers: createPropertyDescriptor(0, headers)
          });
        }
      }

      return init;
    };

    if (isCallable(nativeFetch)) {
      _export({
        global: true,
        enumerable: true,
        noTargetGet: true,
        forced: true
      }, {
        fetch: function fetch(input
        /* , init */
        ) {
          return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
        }
      });
    }

    if (isCallable(NativeRequest)) {
      var RequestConstructor = function Request(input
      /* , init */
      ) {
        anInstance(this, RequestPrototype);
        return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      };

      RequestPrototype.constructor = RequestConstructor;
      RequestConstructor.prototype = RequestPrototype;
      _export({
        global: true,
        forced: true,
        noTargetGet: true
      }, {
        Request: RequestConstructor
      });
    }
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  createCommonjsModule(function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
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
      generator._invoke = makeInvokeMethod(innerFn, self, context);

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
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
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
      this._invoke = enqueue;
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

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
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
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
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

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
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

    exports.keys = function(object) {
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
      if (iterable) {
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

      // Return an iterator with no values.
      return { next: doneResult };
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
  });

  var global$1 =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global$1 !== 'undefined' && global$1);

  var support = {
    searchParams: 'URLSearchParams' in global$1,
    iterable: 'Symbol' in global$1 && 'iterator' in Symbol,
    blob:
      'FileReader' in global$1 &&
      'Blob' in global$1 &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in global$1,
    arrayBuffer: 'ArrayBuffer' in global$1
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
    reader.readAsText(blob);
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
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;
      if (!body) {
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

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this);
          if (isConsumed) {
            return isConsumed
          }
          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            )
          } else {
            return Promise.resolve(this._bodyArrayBuffer)
          }
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

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
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

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
    this.signal = options.signal || this.signal;
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
          headers.append(key, value);
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
    var response = new Response(null, {status: 0, statusText: ''});
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

  var DOMException = global$1.DOMException;
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
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
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
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.onabort = function() {
        setTimeout(function() {
          reject(new DOMException('Aborted', 'AbortError'));
        }, 0);
      };

      function fixUrl(url) {
        try {
          return url === '' && global$1.location.href ? global$1.location.href : url
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
          support.arrayBuffer &&
          request.headers.get('Content-Type') &&
          request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
        ) {
          xhr.responseType = 'arraybuffer';
        }
      }

      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
        Object.getOwnPropertyNames(init.headers).forEach(function(name) {
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
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

  if (!global$1.fetch) {
    global$1.fetch = fetch$1;
    global$1.Headers = Headers;
    global$1.Request = Request;
    global$1.Response = Response;
  }

  /*! js-cookie v3.0.1 | MIT */

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
    function set(key, value, attributes) {
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

      key = encodeURIComponent(key).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = '';

      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue;
        } // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...


        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return document.cookie = key + '=' + converter.write(value, key) + stringifiedAttributes;
    }

    function get(key) {
      if (typeof document === 'undefined' || arguments.length && !key) {
        return;
      } // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.


      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};

      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break;
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar;
    }

    return Object.create({
      set: set,
      get: get,
      remove: function remove(key, attributes) {
        set(key, '', assign({}, attributes, {
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

  var lzString = createCommonjsModule(function (module) {
  // Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
  // This work is free. You can redistribute it and/or modify it
  // under the terms of the WTFPL, Version 2
  // For more information see LICENSE.txt or http://www.wtfpl.net/
  //
  // For more information, the home page:
  // http://pieroxy.net/blog/pages/lz-string/testing.html
  //
  // LZ-based compression algorithm, version 1.4.4
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
  }
  });

  var _httpsBTime1MeV, _httpsCTime1MeV, _httpsCTime1MeV2;

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
    stats: {
      type: {
        visit: 'visit',
        conversion: 'conversion'
      }
    },
    default_storage_prefix: 'to',
    default_ttl: 390,
    urls: {
      conversion: ((_httpsBTime1MeV = "https://b.time1.me/v1/b") === null || _httpsBTime1MeV === void 0 ? void 0 : _httpsBTime1MeV.split(',')) || [],
      stats: ((_httpsCTime1MeV = "https://c.time1.me/v2/log/consent") === null || _httpsCTime1MeV === void 0 ? void 0 : _httpsCTime1MeV.split(',')) || [],
      proofConsent: ((_httpsCTime1MeV2 = "https://c.time1.me/v1/log/consent/proof") === null || _httpsCTime1MeV2 === void 0 ? void 0 : _httpsCTime1MeV2.split(',')) || []
    },
    errors: {
      subidCookieType: 'subid_cookie_type'
    }
  };

  var _marked = /*#__PURE__*/regeneratorRuntime.mark(urlsIterator);
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
    return options !== null && options !== void 0 && options.compress ? lzString.compressToBase64(storedValue) : storedValue;
  }

  function getV2Value(storedValue, options) {
    if (!(options !== null && options !== void 0 && options.compress)) {
      var parseValue = JSON.parse(storedValue);
      return isExpired(parseValue === null || parseValue === void 0 ? void 0 : parseValue.createAt, options.ttl) ? null : parseValue === null || parseValue === void 0 ? void 0 : parseValue.value;
    }

    var uncompress = lzString.decompressFromBase64(storedValue);

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
    var setStorageValue = storedValue === null || storedValue === void 0 ? void 0 : (_storedValue$CONSTANT = storedValue[CONSTANTS.current_storage_version]) === null || _storedValue$CONSTANT === void 0 ? void 0 : _storedValue$CONSTANT.setValue;
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
    var getStorageValue = storedValue === null || storedValue === void 0 ? void 0 : (_storedValue$version = storedValue[version]) === null || _storedValue$version === void 0 ? void 0 : _storedValue$version.getValue;
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
    var urls,
        index,
        _args = arguments;
    return regeneratorRuntime.wrap(function urlsIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            urls = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
            index = 0;

          case 2:
            if (!(index <= urls.length)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return urls[index];

          case 5:
            index += 1;
            _context.next = 2;
            break;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
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

    var subidsSize = ((_LZString$compressToB = lzString.compressToBase64(JSON.stringify(subids))) === null || _LZString$compressToB === void 0 ? void 0 : _LZString$compressToB.length) || 0;

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

  var sdkName$1 = CONSTANTS.sdk_name; // const showJwtDebug = (name, id) => {
  //   if (!document.getElementById(id)) {
  //     setTimeout(() => showJwtDebug(name, id), 300);
  //   } else {
  //     // eslint-disable-next-line no-underscore-dangle
  //     const token = window[sdk_name]?.[name];
  //     if (token) {
  //       // eslint-disable-next-line no-underscore-dangle
  //       const jwt = 'jwt'; // window.__jwtDecode(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${token}`);
  //       document.getElementById(id).textContent = JSON.stringify(jwt, null, '\t');
  //     }
  //   }
  // };

  var showTraceDebug = function showTraceDebug() {
    if (!document.getElementById('debug-trace')) {
      setTimeout(function () {
        return showTraceDebug();
      }, 300);
    } else {
      var _window$sdkName, _window$sdkName$getTr;

      var traceState = (_window$sdkName = window[sdkName$1]) === null || _window$sdkName === void 0 ? void 0 : (_window$sdkName$getTr = _window$sdkName.getTrace) === null || _window$sdkName$getTr === void 0 ? void 0 : _window$sdkName$getTr.call(_window$sdkName);
      document.getElementById('debug-trace').textContent = JSON.stringify(traceState, null, '\t');
    }
  };

  var showLocalstorageDebug = function showLocalstorageDebug() {
    if (!document.getElementById('debug-localstorage')) {
      setTimeout(function () {
        return showLocalstorageDebug();
      }, 300);
    } else {
      var storageState = {
        to_consent: Storage.find(getPrefixedStorageName(CONSTANTS.consent.name)),
        to_subid: Storage.find(getPrefixedStorageName(CONSTANTS.subid.name)),
        to_cashback: Storage.find(getPrefixedStorageName(CONSTANTS.cashback.name)),
        to_event_consent_id: Storage.find(getPrefixedStorageName(CONSTANTS.event_consent_id.name))
      };
      var sanitizedStorageState = Object.fromEntries(Object.entries(storageState).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return value === null ? [key, undefined] : [key, value];
      }));
      document.getElementById('debug-localstorage').textContent = JSON.stringify(sanitizedStorageState, null, '\t');
    }
  };

  var showCookieDebug = function showCookieDebug() {
    if (!document.getElementById('debug-cookie')) {
      setTimeout(function () {
        return showCookieDebug();
      }, 300);
    } else {
      var cookieState = {
        cmp_cookie: api.get('klaro'),
        to_consent: api.get(getPrefixedStorageName(CONSTANTS.consent.name)),
        to_subid: api.get(getPrefixedStorageName(CONSTANTS.subid.name)),
        to_cashback: api.get(getPrefixedStorageName(CONSTANTS.cashback.name)),
        to_event_consent_id: api.get(getPrefixedStorageName(CONSTANTS.event_consent_id.name))
      };
      document.getElementById('debug-cookie').textContent = JSON.stringify(cookieState, null, '\t');
    }
  };

  var showDebug = function showDebug(callback) {
    if (!document.getElementById('debug')) {
      setTimeout(function () {
        return showDebug(callback);
      }, 300);
    } else {
      var _window$sdkName2, _window$sdkName3, _window$sdkName4, _window$sdkName5, _window$sdkName6;

      var state = {
        progid: (_window$sdkName2 = window[sdkName$1]) === null || _window$sdkName2 === void 0 ? void 0 : _window$sdkName2.progid,
        consent: (_window$sdkName3 = window[sdkName$1]) === null || _window$sdkName3 === void 0 ? void 0 : _window$sdkName3.consent,
        subid: (_window$sdkName4 = window[sdkName$1]) === null || _window$sdkName4 === void 0 ? void 0 : _window$sdkName4.subid,
        cashback: (_window$sdkName5 = window[sdkName$1]) === null || _window$sdkName5 === void 0 ? void 0 : _window$sdkName5.cashback,
        to_event_consent_id: (_window$sdkName6 = window[sdkName$1]) === null || _window$sdkName6 === void 0 ? void 0 : _window$sdkName6.eventConsentId
      };
      document.getElementById('debug').textContent = JSON.stringify(state, null, '\t');
    }

    callback === null || callback === void 0 ? void 0 : callback();
  };
  var showDebugTestsite = function showDebugTestsite() {
    showDebug(function () {
      showCookieDebug();
      showLocalstorageDebug();
      showTraceDebug(); // showJwtDebug?.('subid', 'debug-subid-jwt');
      // showJwtDebug?.('cashbackSubid', 'debug-cashback-jwt');
    });
  };

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
      // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
      // find the complete implementation of crypto (msCrypto) on IE11.
      getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }

    return getRandomValues(rnds8);
  }

  var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  function validate(uuid) {
    return typeof uuid === 'string' && REGEX.test(uuid);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  var byteToHex = [];

  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).substr(1));
  }

  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields

    if (!validate(uuid)) {
      throw TypeError('Stringified UUID is invalid');
    }

    return uuid;
  }

  function v4(options, buf, offset) {
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

    return stringify(rnds);
  }

  var _progids = /*#__PURE__*/new WeakMap();

  var _conversionUrlIterator = /*#__PURE__*/new WeakMap();

  var _statsUrlIterator = /*#__PURE__*/new WeakMap();

  var _proofConsentUrlIterator = /*#__PURE__*/new WeakMap();

  var _errors = /*#__PURE__*/new WeakMap();

  var _runRetrocompatibility = /*#__PURE__*/new WeakSet();

  var _convertSubidFromPreviousToNextFormat = /*#__PURE__*/new WeakSet();

  var _formatSubidEntry = /*#__PURE__*/new WeakSet();

  var _getActiveSubids = /*#__PURE__*/new WeakSet();

  var _getActiveSubidsValues = /*#__PURE__*/new WeakSet();

  var _setProgids = /*#__PURE__*/new WeakSet();

  var _shouldUseWildcardDomain = /*#__PURE__*/new WeakSet();

  var _setCookieDomain = /*#__PURE__*/new WeakSet();

  var _configureProgramData = /*#__PURE__*/new WeakSet();

  var _callApi = /*#__PURE__*/new WeakSet();

  var _logStats = /*#__PURE__*/new WeakSet();

  var _setPOC = /*#__PURE__*/new WeakSet();

  var _hasSubids = /*#__PURE__*/new WeakSet();

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

      _classPrivateMethodInitSpec(this, _hasSubids);

      _classPrivateMethodInitSpec(this, _setPOC);

      _classPrivateMethodInitSpec(this, _logStats);

      _classPrivateMethodInitSpec(this, _callApi);

      _classPrivateMethodInitSpec(this, _configureProgramData);

      _classPrivateMethodInitSpec(this, _setCookieDomain);

      _classPrivateMethodInitSpec(this, _shouldUseWildcardDomain);

      _classPrivateMethodInitSpec(this, _setProgids);

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

      _classPrivateFieldInitSpec(this, _errors, {
        writable: true,
        value: []
      });

      this.env = "production";
      this.version = "2.3.0";

      _classPrivateMethodGet(this, _setProgids, _setProgids2).call(this);

      _classPrivateMethodGet(this, _setCookieDomain, _setCookieDomain2).call(this);

      _classPrivateMethodGet(this, _configureProgramData, _configureProgramData2).call(this, CONSTANTS.cashback);

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
      key: "_setOptin",
      value: function _setOptin() {
        _classPrivateMethodGet(this, _setConsent, _setConsent2).call(this, CONSTANTS.consent.status.optin);

        _classPrivateMethodGet(this, _configureProgramData, _configureProgramData2).call(this, CONSTANTS.subid);
      }
    }, {
      key: "_setOptout",
      value: function _setOptout() {
        _classPrivateMethodGet(this, _setConsent, _setConsent2).call(this, CONSTANTS.consent.status.optout);

        _classPrivateMethodGet(this, _handleNoConsent, _handleNoConsent2).call(this);
      }
    }, {
      key: "_setUnknown",
      value: function _setUnknown() {
        _classPrivateMethodGet(this, _setConsent, _setConsent2).call(this, CONSTANTS.consent.status.unknown);

        _classPrivateMethodGet(this, _handleNoConsent, _handleNoConsent2).call(this);
      }
    }, {
      key: "_setSale",
      value: function () {
        var _setSale2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
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
        var _setLead2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
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
        var _setDbClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
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
        var _setClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
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
          consent: this.consent,
          progid: progid,
          type: CONSTANTS.stats.type.conversion,
          comid: comid
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
    return wildCardDomainFromAttribut === 'true' || window.__ISDK_wildcard_domain === 'true';
  }

  function _setCookieDomain2() {
    try {
      if (_classPrivateMethodGet(this, _shouldUseWildcardDomain, _shouldUseWildcardDomain2).call(this)) {
        // First we clean all data in storage
        Object.values(CONSTANTS.cookieKeys).forEach(function (name) {
          removeValue(name);
        }); // Then we define the wildcard domain for cookie

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
    var subids = _classPrivateMethodGet(this, _getActiveSubids, _getActiveSubids2).call(this, options);

    if (subids) {
      setValue(subids, options.name);
    }
  }

  function _callApi2(_x5) {
    return _callApi3.apply(this, arguments);
  }

  function _callApi3() {
    _callApi3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref6) {
      var urlIterator, _ref6$body, body, caller, response, error;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              urlIterator = _ref6.urlIterator, _ref6$body = _ref6.body, body = _ref6$body === void 0 ? {} : _ref6$body, caller = _ref6.caller;

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
                method: 'POST',
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
                  message: " code ".concat(response === null || response === void 0 ? void 0 : response.status, " - ").concat(error === null || error === void 0 ? void 0 : error.message)
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
        }
      }, _callee5, this, [[4, 15]]);
    }));
    return _callApi3.apply(this, arguments);
  }

  function _logStats2(_ref7) {
    var consent = _ref7.consent,
        type = _ref7.type,
        progid = _ref7.progid,
        comid = _ref7.comid;

    var consentSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.subid);

    var cashbackSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.cashback);

    var toSubids = [].concat(_toConsumableArray(consentSubids), _toConsumableArray(cashbackSubids)).filter(Boolean);

    _classPrivateMethodGet(this, _callApi, _callApi2).call(this, {
      urlIterator: _classPrivateFieldGet(this, _statsUrlIterator),
      body: _objectSpread2(_objectSpread2({
        type: type,
        progid: progid
      }, comid ? {
        comid: comid
      } : {}), {}, {
        url: getCurrentUrl(),
        status: consent,
        toSubids: toSubids
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

  function _setConsent2(consent) {
    var _this = this;

    var shouldSetConsent = consent !== this.consent;

    var shouldSetupPOC = consent === CONSTANTS.consent.status.optin && !this.eventConsentId && _classPrivateMethodGet(this, _hasSubids, _hasSubids2).call(this, CONSTANTS.subid);

    if (shouldSetConsent) {
      setValue(consent, CONSTANTS.consent.name);

      _classPrivateFieldGet(this, _progids).forEach(function (progid) {
        _classPrivateMethodGet(_this, _logStats, _logStats2).call(_this, {
          consent: consent,
          progid: progid,
          type: CONSTANTS.stats.type.visit
        });
      });
    }

    if (shouldSetupPOC) {
      _classPrivateMethodGet(this, _setPOC, _setPOC2).call(this);
    }
  }

  function _handleNoConsent2() {
    removeValue(CONSTANTS.subid.name);
    removeValue(CONSTANTS.event_consent_id.name);
  }

  function _canConvert2() {
    return this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname) || _classPrivateMethodGet(this, _hasSubids, _hasSubids2).call(this, CONSTANTS.cashback) || _classPrivateMethodGet(this, _hasSubids, _hasSubids2).call(this, CONSTANTS.subid) && this.consent === CONSTANTS.consent.status.optin;
  }

  function _setError2(data) {
    _classPrivateFieldGet(this, _errors).push(data);
  }

  function _getErrors2() {
    return _classPrivateFieldGet(this, _errors).map(function (_ref8) {
      var error = _ref8.error,
          caller = _ref8.caller,
          extra = _ref8.extra;
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
    _setConversion3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref9) {
      var _classPrivateFieldGet2;

      var _ref9$data, data, _ref9$caller, caller, progid, comid, iu, _classPrivateFieldGet3, consentSubids, cashbackSubids, toSubids, toCashbackSubids, payload, body;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref9$data = _ref9.data, data = _ref9$data === void 0 ? {} : _ref9$data, _ref9$caller = _ref9.caller, caller = _ref9$caller === void 0 ? 'setConversion' : _ref9$caller;

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
              if ((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _conversionUrlIterator)) !== null && _classPrivateFieldGet2 !== void 0 && _classPrivateFieldGet2.url) {
                _context6.next = 8;
                break;
              }

              throw new Error("Failed to contact server on ".concat(JSON.stringify((_classPrivateFieldGet3 = _classPrivateFieldGet(this, _conversionUrlIterator)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.urls)));

            case 8:
              consentSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.subid);
              cashbackSubids = _classPrivateMethodGet(this, _getActiveSubidsValues, _getActiveSubidsValues2).call(this, CONSTANTS.cashback);
              toSubids = consentSubids.map(function (subid) {
                return {
                  type: CONSTANTS.subid.payloadType,
                  value: subid
                };
              });
              toCashbackSubids = cashbackSubids.map(function (cashbackSubid) {
                return {
                  type: CONSTANTS.cashback.payloadType,
                  value: cashbackSubid
                };
              });
              payload = _objectSpread2(_objectSpread2({}, data), {}, {
                event_consent_id: this.eventConsentId,
                toSubids: [].concat(_toConsumableArray(toSubids), _toConsumableArray(toCashbackSubids)).filter(function (_ref10) {
                  var value = _ref10.value;
                  return !!value;
                })
              });
              body = Object.fromEntries(Object.entries(payload).filter(function (_ref11) {
                var _ref12 = _slicedToArray(_ref11, 2),
                    value = _ref12[1];

                return !!value;
              }));
              _context6.next = 16;
              return _classPrivateMethodGet(this, _callApi, _callApi2).call(this, {
                urlIterator: _classPrivateFieldGet(this, _conversionUrlIterator),
                body: body,
                caller: caller
              });

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));
    return _setConversion3.apply(this, arguments);
  }

  var sdkName = CONSTANTS.sdk_name;
  function init() {
    var Sdk$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Sdk;

    try {
      if (typeof window[sdkName] === 'undefined') {
        window[sdkName] = new Sdk$1();
      } else if (_typeof(window[sdkName]) === 'object' && Array.isArray(window[sdkName])) {
        var sdkTmp = new Sdk$1();
        window[sdkName].forEach(function (args) {
          return sdkTmp.push(args);
        });
        window[sdkName] = sdkTmp;
      } else if (_typeof(window[sdkName]) === 'object' && window[sdkName] instanceof Sdk$1) {// Nothing
      } else {
        throw new Error("".concat(sdkName, " error: Unknown type"));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  }

  var TogDebugSdk = /*#__PURE__*/function (_Sdk) {
    _inherits(TogDebugSdk, _Sdk);

    var _super = _createSuper(TogDebugSdk);

    function TogDebugSdk() {
      var _this;

      _classCallCheck(this, TogDebugSdk);

      _this = _super.call(this);
      showDebugTestsite();
      return _this;
    }

    _createClass(TogDebugSdk, [{
      key: "push",
      value: function push(args) {
        _get(_getPrototypeOf(TogDebugSdk.prototype), "push", this).call(this, args);

        showDebugTestsite();
      }
    }]);

    return TogDebugSdk;
  }(Sdk);

  console.log("\n******************************\n******************************\n**** ISDK in debug mode ******\n******************************\n******************************\n");
  init(TogDebugSdk);
  showDebugTestsite();

})();
