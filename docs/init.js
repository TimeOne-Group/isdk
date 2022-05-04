
/*! pbd-sdk 1.0.0 https://github.com/https://github.com/TimeOne-Group/pbd-sdk#readme @license GPL-3.0 */
(function () {
  'use strict';

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

  function init(converter, defaultAttributes) {
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
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function withConverter(converter) {
        return init(assign({}, this.converter, converter), this.attributes);
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

  var api = init(defaultConverter, {
    path: '/'
  });

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var check = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$1 = // eslint-disable-next-line es-x/no-global-this -- safe
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

  var Object$5 = global$1.Object;
  var split$1 = functionUncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$5('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split$1(it, '') : Object$5(it);
  } : Object$5;

  var TypeError$d = global$1.TypeError; // `RequireObjectCoercible` abstract operation
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
      defineProperty$2(global$1, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$1[key] = value;
    }

    return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global$1[SHARED] || setGlobal(SHARED, {});
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

  var Object$4 = global$1.Object; // `ToObject` abstract operation
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
    return arguments.length < 2 ? aFunction(global$1[namespace]) : global$1[namespace] && global$1[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global$1.process;
  var Deno = global$1.Deno;
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
  var _Symbol = global$1.Symbol;
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

  var isObject = function isObject(it) {
    return _typeof(it) == 'object' ? it !== null : isCallable(it);
  };

  var String$4 = global$1.String;
  var TypeError$c = global$1.TypeError; // `Assert: Type(argument) is Object`

  var anObject = function anObject(argument) {
    if (isObject(argument)) return argument;
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

  var document$1 = global$1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 = isObject(document$1) && isObject(document$1.createElement);

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

  var Object$3 = global$1.Object;
  var isSymbol = useSymbolAsUid ? function (it) {
    return _typeof(it) == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, Object$3(it));
  };

  var String$3 = global$1.String;

  var tryToString = function tryToString(argument) {
    try {
      return String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var TypeError$b = global$1.TypeError; // `Assert: IsCallable(argument) is true`

  var aCallable = function aCallable(argument) {
    if (isCallable(argument)) return argument;
    throw TypeError$b(tryToString(argument) + ' is not a function');
  };

  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod = function getMethod(V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var TypeError$a = global$1.TypeError; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive = function ordinaryToPrimitive(input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    throw TypeError$a("Can't convert object to primitive value");
  };

  var TypeError$9 = global$1.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive = function toPrimitive(input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;

    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = functionCall(exoticToPrim, input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
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

  var TypeError$8 = global$1.TypeError; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

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

  var WeakMap$1 = global$1.WeakMap;
  var nativeWeakMap = isCallable(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

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
  var TypeError$7 = global$1.TypeError;
  var WeakMap = global$1.WeakMap;
  var set, get, has;

  var enforce = function enforce(it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$7('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap());
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

    if (O === global$1) {
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
      target = global$1;
    } else if (STATIC) {
      target = global$1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$1[TARGET] || {}).prototype;
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
  var Object$2 = global$1.Object;
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

  var String$2 = global$1.String;
  var TypeError$6 = global$1.TypeError;

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
  var Object$1 = global$1.Object; // ES3 wrong here

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

  var Array$2 = global$1.Array;
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
    if (!isObject(it)) return false;
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
      if (!isObject(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

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

  var TypeError$5 = global$1.TypeError;

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

  var TypeError$4 = global$1.TypeError;

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

  var TypeError$3 = global$1.TypeError;

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
    isCallable(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var collection = function collection(CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function fixMethod(KEY) {
      var uncurriedNativeMethod = functionUncurryThis(NativePrototype[KEY]);
      defineBuiltIn(NativePrototype, KEY, KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
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
  var Array$1 = global$1.Array; // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor = function arraySpeciesConstructor(originalArray) {
    var C;

    if (isArray(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (isConstructor(C) && (C === Array$1 || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
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
          if (!isObject(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && hasOwnProperty_1(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject(key)) return false;
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

          if (isObject(key)) {
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
    handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype, COLLECTION_NAME);
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

  var String$1 = global$1.String;

  var toString = function toString(argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$1(argument);
  };

  var TypeError$2 = global$1.TypeError;

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
    if (!descriptors) return global$1[name];
    var descriptor = getOwnPropertyDescriptor(global$1, name);
    return descriptor && descriptor.value;
  };

  var nativeFetch = safeGetBuiltIn('fetch');
  var NativeRequest = safeGetBuiltIn('Request');
  var Headers = safeGetBuiltIn('Headers');
  var RequestPrototype = NativeRequest && NativeRequest.prototype;
  var HeadersPrototype = Headers && Headers.prototype;
  var RegExp = global$1.RegExp;
  var TypeError$1 = global$1.TypeError;
  var decodeURIComponent$1 = global$1.decodeURIComponent;
  var encodeURIComponent$1 = global$1.encodeURIComponent;
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
      if (isObject(init)) this.parseObject(init);else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : toString(init));
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

  if (!nativeUrl && isCallable(Headers)) {
    var headersHas = functionUncurryThis(HeadersPrototype.has);
    var headersSet = functionUncurryThis(HeadersPrototype.set);

    var wrapRequestOptions = function wrapRequestOptions(init) {
      if (isObject(init)) {
        var body = init.body;
        var headers;

        if (classof(body) === URL_SEARCH_PARAMS) {
          headers = init.headers ? new Headers(init.headers) : new Headers();

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

  /* eslint-disable import/no-extraneous-dependencies */

  try {
    window.cleanKlaroCookie = function () {
      // eslint-disable-next-line no-undef
      api.remove('klaro', {
        path: '/',
        domain: window.location.hostname
      });
      setTimeout(function () {
        document.location.reload();
      }, 500);
    };

    var klaroConfig = {
      elementID: 'klaro',
      appElement: '#app',
      cookieName: 'klaro',
      cookieExpiresAfterDays: 365,
      cookieDomain: window.location.hostname,
      stringifyCookie: function stringifyCookie(contents) {
        return JSON.stringify(contents);
      },
      parseCookie: function parseCookie(cookie) {
        return JSON.parse(cookie);
      },
      privacyPolicy: 'https://github.com/TimeOne-Group/pbd-sdk',
      mustConsent: false,
      mustNotice: false,
      logo: false,
      debug: true,
      translations: {
        en: {
          consentModal: {
            description: 'This is an example of how to override an existing translation already used by Orejime'
          },
          partners: {
            description: 'Example of an inline tracking script'
          },
          testcmp: {
            description: 'Example of an external tracking script'
          },
          purposes: {
            analytics: 'Analytics - TO tracker',
            security: 'Security'
          },
          categories: {
            analytics: {
              description: 'A long form description of the category.'
            }
          }
        }
      },
      services: [{
        name: 'testcmp',
        title: 'Consent for sdk',
        purposes: ['analytics'],
        callback: function callback(consent) {
          if (!api.get('klaro')) {
            console.log('CMP setUnknown ');
            window.onUserAction(['setUnknown']);
          } else if (consent) {
            console.log('CMP setOptin');
            window.onUserAction(['setOptin']);
          } else {
            console.log('CMP setOptout');
            window.onUserAction(['setOptout']);
          }
        },
        required: false,
        default: true,
        optOut: false,
        onlyOnce: true
      }, {
        name: 'partners',
        title: 'Partners',
        purposes: ['advertising'],
        required: false,
        optOut: false,
        default: true,
        onlyOnce: true
      }],
      categories: [{
        name: 'analytics',
        title: 'Analytics',
        apps: ['test-cmp', 'partners', 'external-tracker']
      }]
    };

    window.onload = function () {
      try {
        window.klaro.setup(klaroConfig);
        window.klaro.show();
      } catch (e) {
        alert(e.message);
      }
    };
  } catch (e) {
    alert(e.message);
  }

})();
