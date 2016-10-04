/******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var LikeButton = React.createClass({
	  displayName: 'LikeButton',

	  getInitialState: function () {
	    return { liked: false };
	  },
	  handleClick: function (event) {
	    this.setState({ liked: !this.state.liked });
	    this.setState({ count: this.state.count++ });
	  },
	  render: function () {

	    if (!this.state.count && this.state.count != 0) {
	      this.state.count = 0;
	    } else {
	      this.state.count++;
	    }
	    var count = this.state.count;

	    var text = this.state.liked ? 'like' : 'don\'t like';
	    return React.createElement(
	      'p',
	      { onClick: this.handleClick },
	      'You ',
	      text,
	      ' this. Click to toggle - click count ',
	      count,
	      '.'
	    );
	  }
	});

	ReactDOM.render(React.createElement(LikeButton, null), document.getElementById('example'));

/***/ }
/******/ ]);