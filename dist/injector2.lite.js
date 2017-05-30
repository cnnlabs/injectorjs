/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);
__webpack_require__(7);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(4);

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Prepare namespace */
window.FAI = window.FAI || {};
window.FAI.bundleHost = window.FAI.bundleHost || '/';

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery */

/*
 * Service Injector - Takes libraries names and memory namespaces and
 * returns are promise for them. This file is included in the header.
 *
 * There are a lot of dependencies in the application.  This function returns
 * a promise for them.  It also loads libraries that have not been loaded.
 *
 * @todo Can es6 takeover for jQuery?
 */

(function (NS) {
    'use strict';

    var assets = NS.WebpackAssets || [],
        features = {},
        nsFeatures = {},
        getDeferredFeature,
        featureLoadFail,
        featureExecuteFail,
        featureExecuteSuccess,
        featureLoadSuccess,
        scanForFeature,
        loadUrl,
        evt,
        getBundleNameForFeatureName;

    /**
     * Returns a deferred object for a given feature name.
     * @param {string} feature - The name of the feature.
     * @return {object} featurs[feature] - A deferred object.
     */

    getDeferredFeature = function getDeferredFeature(feature) {
        features = features || {};
        return features[feature];
    };

    /**
     * Updates the deferred object when the library has been loaded but not executed.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureExecuteSuccess = function featureExecuteSuccess(deferredFeature) {
        deferredFeature.progress({ isLoaded: true, exists: true });
    };

    /**
     * Updates the deferred object when the library has could not load.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureExecuteFail = function featureExecuteFail(deferredFeature) {
        deferredFeature.reject({ isLoaded: false, exists: true });
    };

    /**
     * Updates the deferred object when the library has loaded.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureLoadSuccess = function featureLoadSuccess(deferredFeature) {
        deferredFeature.resolve({ isLoaded: true, exists: true });
    };

    /**
     * Updates the deferred object when the library has could not load.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureLoadFail = function featureLoadFail(deferredFeature) {
        deferredFeature.reject({ isLoaded: false, exists: true });
    };

    /**
     * Sets up the handler that searches the DOM for resources to load.
     */

    scanForFeature = function scanForFeature() {
        jQuery('[data-bundle]').each(function (idx, el) {
            var resource = jQuery(el).data().bundle,
                host = jQuery(el).data().host || '',
                source = jQuery(el).data().source || '';
            if (source) {
                NS.INJECTOR.loadFeatureForSource(resource, source);
            } else if (host) {
                NS.INJECTOR.loadFeatureForHost(resource, host);
            } else {
                NS.INJECTOR.loadFeature(resource);
            }
        });
    };

    /**
     * Loads a bundle from a URL.
     * @param {string} url - The location of the bundle.
     * @return {object} urlDeferred - A deferred object.
     */

    loadUrl = function loadUrl(url) {
        var urlDeferred = jQuery.Deferred();
        jQuery.ajax({ dataType: 'script', cache: true, url: url }).done(function () {
            urlDeferred.resolve();
        }).fail(function () {
            urlDeferred.reject();
        });

        return urlDeferred;
    };

    /**
     * Returns the file name of a feature.
     * @param {string} feature - The name of the feature.
     * @return {string} fileName - The feature's file name.
     */

    getBundleNameForFeatureName = function getBundleNameForFeatureName(feature) {
        var fileName = '',
            i = 0,
            j = 0,
            chunkNames,
            features;
        for (i = 0; i < assets.length; i++) {
            features = assets[i];
            chunkNames = features.chunkNames;
            for (j = 0; j < chunkNames.length; j++) {
                if (chunkNames[j] === feature) {
                    fileName = features.name;
                }
            }
        }
        return fileName;
    };

    NS.INJECTOR = NS.INJECTOR || {};
    NS.INJECTOR.readyState = 'loading';

    /**
     * Creates a deferred object for a given feature name.
     * @param {string} feature - The name of the feature.
     * @return {object} featurs[feature] - A deferred object.
     */

    NS.INJECTOR.createDeferredForFeature = function (feature) {
        features[feature] = jQuery.Deferred();
        return features[feature];
    };

    /**
    * Sets the loadFeature function to an array of evenListeners
    * @param {array} events - Array of event listeners to set
    */

    NS.INJECTOR.registerEvents = function (events) {
        for (var i = 0; i < events.length; i++) {
            if (features.footer) {
                features.footer.done(jQuery(document)[events[i]](scanForFeature));
            } else {
                document.addEventListener(events[i], scanForFeature);
            }
        }
    };

    /**
     * Inspects the webpack chunkNames to determine if there is a registered
     * feature and returns the URL to that feature if there is one.
     * @param {string} feature - The name of the feature.
     * @param {object} options - Options to be passed in.
     * @return {string} url - URL to the feature's bundle
     */
    NS.INJECTOR.getUrlForFeatureName = function (feature, options) {
        var url = '',
            host = NS.bundleHost,
            bundleName = getBundleNameForFeatureName(feature),
            params = '';

        options = options || {};

        if (options.params) {
            params = options.params;
        }
        url = host + bundleName + params;
        return url;
    };

    /**
     * Returns a promise for a resource feature.  Resolves the promise after
     * loading but (sometimes) before the library is executed.
     * @param {string} feature - The name of the feature.
     * @return {object} promise - A promise resolved when the feature is loaded.
     */
    NS.INJECTOR.loadFeature = function (feature) {
        var deferredFeature = getDeferredFeature(feature),
            url = NS.INJECTOR.getUrlForFeatureName(feature, {});

        if (typeof deferredFeature === 'undefined') {
            deferredFeature = NS.INJECTOR.createDeferredForFeature(feature);
            if (deferredFeature.state() !== 'rejected') {
                loadUrl(url).then(jQuery.proxy(featureLoadSuccess, null, deferredFeature), jQuery.proxy(featureLoadFail, null, deferredFeature));
            }
        }
        return deferredFeature.promise();
    };

    /**
     * Returns a promise for a resource feature/host/src combinations.
     * Resolves the promise after loading but (sometimes) before the library
     * is executed.
     * @param {string} feature - The name of the feature.
     * @param {string} source - The name of the src.
     * @return {object} promise - A promise resolved when the feature is loaded.
     */
    NS.INJECTOR.loadFeatureForSource = function (feature, source) {
        var url = source,
            deferredFeature = getDeferredFeature(feature);

        if (typeof deferredFeature === 'undefined') {
            deferredFeature = NS.INJECTOR.createDeferredForFeature(feature);
            if (deferredFeature.state() !== 'rejected') {
                loadUrl(url).then(jQuery.proxy(featureLoadSuccess, null, deferredFeature), jQuery.proxy(featureLoadFail, null, deferredFeature));
            }
        }
        return deferredFeature.promise();
    };

    /**
     * Returns a promise for a resource feature/host combinations.
     * Resolves the promise after loading but (sometimes) before the library
     * is executed.
     * @param {string} feature - The name of the feature.
     * @param {string} host - The name of the host.
     * @return {object} promise - A promise resolved when the feature is loaded.
     */
    NS.INJECTOR.loadFeatureForHost = function (feature, host) {
        var url = host + getBundleNameForFeatureName(feature),
            deferredFeature = getDeferredFeature(feature);

        if (typeof deferredFeature === 'undefined') {
            deferredFeature = NS.INJECTOR.createDeferredForFeature(feature);
            if (deferredFeature.state() !== 'rejected') {
                loadUrl(url).then(jQuery.proxy(featureLoadSuccess, null, deferredFeature), jQuery.proxy(featureLoadFail, null, deferredFeature));
            }
        }
        return deferredFeature.promise();
    };

    /**
     * Returns a promise for a resource feature.  Will not resolve the promise.
     * @param {string} feature - The name of the feature.
     * @param {object} options - Optional parameters.
     * @return {object} promise - A promise progress when the feature is loaded.
     */

    NS.INJECTOR.executeFeature = function (feature, options) {
        var deferredFeature = getDeferredFeature(feature),
            url = NS.INJECTOR.getUrlForFeatureName(feature, options);

        if (typeof deferredFeature === 'undefined') {
            deferredFeature = NS.INJECTOR.createDeferredForFeature(feature, options);
            if (deferredFeature.state() !== 'rejected') {
                loadUrl(url).then(jQuery.proxy(featureExecuteSuccess, null, deferredFeature), jQuery.proxy(featureExecuteFail, null, deferredFeature));
            }
        }
        return deferredFeature.promise();
    };

    /**
     * Sets a feature to resolved.  Typically used in conjuction with execute.
     * @param {string} feature - The name of the feature.
     */
    NS.INJECTOR.scriptComplete = function (feature) {
        features[feature].resolve({ isLoaded: true, exists: true, executed: true });
    };

    /**
     * Creates a new deferred object for a namespace (ie NS.VideoPlayer.addVideo) feature.
     * @param {string} feature - The name of the feature.
     */
    NS.INJECTOR.resetNameSpaceFeature = function (feature) {
        nsFeatures[feature] = jQuery.Deferred();
    };

    /**
     * Returns a promise for a namespace (ie NS.VideoPlayer.addVideo) feature.
     * @param {string} feature - The name of the feature.
     * @return {object} promise - A promise resolved when the feature is loaded.
     */
    NS.INJECTOR.getNameSpaceFeature = function (feature) {
        var featureList = feature.split('.'),
            obj = window,
            definedObj = true,
            promise,
            i;

        if (nsFeatures[feature]) {
            promise = nsFeatures[feature].promise();
        } else {
            nsFeatures[feature] = jQuery.Deferred();
            promise = nsFeatures[feature].promise();
            for (i = 0; i < featureList.length; i++) {
                obj = obj[featureList[i]];
                if (typeof obj === 'undefined') {
                    definedObj = false;
                }
            }
            if (definedObj) {
                nsFeatures[feature].resolve({ isLoaded: true });
            } else {
                nsFeatures[feature].reject({ isLoaded: false });
            }
        }
        return promise;
    };

    NS.INJECTOR.readyState = 'ready';
    /* Not supposed to need to do this for IE11, but apparently we do... */
    if (document.createEvent) {
        evt = document.createEvent('Event');
        evt.initEvent('injectorReady', false, true);
    } else {
        evt = new Event('injectorReady');
    }
    document.dispatchEvent(evt);
})(window.FAI);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (NS) {
    'use strict';

    NS.DOM = {
        /**
         * Get all elements from DOM, return proper array instead of NodeList.
         * Browser suuport : https://caniuse.com/#feat=queryselector
         */
        getElements: function getElements(selector) {
            var elemMatches = document.querySelectorAll(selector) || [];
            var elems = [];

            for (var i = 0; i < elemMatches.length; i++) {
                elems.push(elemMatches[i]);
            }

            return elems;
        }
    };
})(window.FAI);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global HTMLImports */

(function (NS) {
    'use strict';

    /**
     * Run a callback when HTMLImports are ready or immediately if this api is not available.
     *
     * @todo Investigate Polymer's HTMLImports object
     */

    function whenImportsReady(cb) {
        if (window.HTMLImports) {
            HTMLImports.whenReady(cb);
        } else {
            cb();
        }
    }

    NS.WC = {
        /**
         * Convenience method for importing an HTML document imperatively.
         *
         * Adpated from - https://github.com/Polymer/polymer/blob/master/lib/utils/import-href.html
         *
         * This method creates a new `<link rel="import">` element with
         * the provided URL and appends it to the document to start loading.
         * In the `onload` callback, the `import` property of the `link`
         * element will contain the imported document contents.
         *
         * @param {string} href URL to document to load.
         * @param {Function=} onload Callback to notify when an import successfully
         *   loaded.
         * @param {Function=} onerror Callback to notify when an import
         *   unsuccessfully loaded.
         * @param {boolean=} optAsync True if the import should be loaded `async`.
         *   Defaults to `false`.
         */
        importHref: function importHref(href, onload, onerror, optAsync) {
            var link = document.head.querySelector('link[href="' + href + '"][import-href]');

            if (!link) {
                link = document.createElement('link');
                link.rel = 'import';
                link.href = href;
                link.setAttribute('import-href', '');
            }

            /* always ensure link has `async` attribute if user specified one, even if it was previously not async. This is considered less confusing. */
            if (optAsync) {
                link.setAttribute('async', '');
            }

            var cleanup = function cleanup() {
                link.removeEventListener('load', loadListener);
                link.removeEventListener('error', errorListener);
            };

            var loadListener = function loadListener(event) {
                cleanup();

                /* In case of a successful load, cache the load event on the link so that it can be used to short-circuit this method in the future when it is called with the same href param. */
                link.__dynamicImportLoaded = true;

                if (onload) {
                    whenImportsReady(function () {
                        onload(event);
                    });
                }
            };

            var errorListener = function errorListener(event) {
                cleanup();

                /* In case of an error, remove the link from the document so that it will be automatically created again the next time `importHref` is called. */
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }

                if (onerror) {
                    whenImportsReady(function () {
                        onerror(event);
                    });
                }
            };

            link.addEventListener('load', loadListener);
            link.addEventListener('error', errorListener);

            if (link.parentNode == null) {
                document.head.appendChild(link);
                /* if the link already loaded, dispatch a fake load event so that listeners are called and get a proper event argument. */
            } else if (link.__dynamicImportLoaded) {
                link.dispatchEvent(new Event('load'));
            }

            return link;
        }
    };
})(window.FAI);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (NS) {
    'use strict';

    NS.Utils = {};
})(window.FAI);

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);