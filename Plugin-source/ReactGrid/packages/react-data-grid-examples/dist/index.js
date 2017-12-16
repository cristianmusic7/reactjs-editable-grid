(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataGrid"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDataGrid"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _ExampleList = __webpack_require__(504);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _scripts = __webpack_require__(509);

	var _scripts2 = _interopRequireDefault(_scripts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	window.React = _react2['default'];

	_reactDom2['default'].render(_react2['default'].createElement(_ExampleList2['default'], { links: _scripts2['default'], className: 'nav bs-docs-sidenav' }), document.getElementById('grid-examples-div'));

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExampleList = function (_React$Component) {
	  _inherits(ExampleList, _React$Component);

	  function ExampleList() {
	    _classCallCheck(this, ExampleList);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  ExampleList.prototype.render = function render() {
	    var links = this.props.links.map(function (l) {
	      return _react2['default'].createElement(
	        'li',
	        { key: l.hashLocation },
	        _react2['default'].createElement(
	          'a',
	          { href: 'examples.html#/' + l.hashLocation },
	          l.name
	        )
	      );
	    });
	    return _react2['default'].createElement(
	      'ul',
	      this.props,
	      links
	    );
	  };

	  return ExampleList;
	}(_react2['default'].Component);

	ExampleList.propTypes = {
	  links: _react.PropTypes.array.isRequired
	};

	exports['default'] = ExampleList;

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// Import all example JS scripts.
	var req = __webpack_require__(1506);

	function getFriendlyName(input) {
	  var words = input.split('-').map(function (w) {
	    return w[0].toUpperCase() + w.substring(1);
	  });
	  return words.join(' ') + ' Example';
	}

	var exampleScripts = req.keys().map(function (key) {
	  var module = req(key);

	  // Use the file name to generate hash location and name.
	  var firstDashIndex = key.indexOf('-');
	  var hashLocation = key.substring(firstDashIndex + 1, key.length - 3);
	  var name = getFriendlyName(hashLocation);

	  return {
	    module: module,
	    name: name,
	    hashLocation: hashLocation
	  };
	});

	exports['default'] = exampleScripts;

/***/ }),

/***/ 1506:
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 1506;


/***/ })

/******/ })
});
;