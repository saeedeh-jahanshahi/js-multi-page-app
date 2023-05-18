/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page_content_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-content.js */ \"./src/page-content.js\");\n// import '../style/style.css'\n\n\nconst mainConentContainer = document.querySelector('.page-container');\n\nconst pathNames = ['step1', 'step2', 'step3', 'step4', 'step5'];\n\nlet currentPathIndex = 0;\n\nconst route = function () {\n  const nextPath = pathNames[currentPathIndex + 1];\n  const prevPath = pathNames;\n};\n\ndocument.addEventListener('DOMContentLoaded', (e) => {\n  e.preventDefault();\n  history.pushState(null, null, '/step1');\n});\n\n\n//# sourceURL=webpack://my-webpack-project/./src/main.js?");

/***/ }),

/***/ "./src/page-content.js":
/*!*****************************!*\
  !*** ./src/page-content.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"headers\": () => (/* binding */ headers),\n/* harmony export */   \"info\": () => (/* binding */ info)\n/* harmony export */ });\nconst headers = {\n  step1: {\n    title: 'Personal info',\n    subtitle: 'Please provide your name, email address, and phone number.'\n  },\n  step2: {\n    title: 'Select your plan',\n    subtitle: 'You have the option of monthly or yearly billing.'\n  },\n  step3: {\n    title: 'Pick add-ons',\n    subtitle: 'Add-ons help enhance your gaming experience.'\n  },\n  step4: {\n    title: 'Finishing up',\n    subtitle: 'Double-check everything looks OK before confirming.'\n  },\n};\n\nconst info = {\n  step2: {\n    mo: {\n      arcade: 9,\n      advanced: 12,\n      pro: 15\n    },\n    yr: {\n      arcade: 90,\n      advanced: 120,\n      pro: 150\n    }\n  },\n  step3:{\n    mo: {\n      'Online service': 1,\n      'Larger storage': 2,\n      'Customizable profile': 2\n    },\n    yr:{\n      'Online service': 10,\n      'Larger storage': 20,\n      'Customizable profile': 20\n    }\n  }\n};\n\n//# sourceURL=webpack://my-webpack-project/./src/page-content.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;