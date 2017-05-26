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

    getDeferredFeature = function (feature) {
        features = features || {};
        return features[feature];
    };

    /**
     * Updates the deferred object when the library has been loaded but not executed.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureExecuteSuccess = function (deferredFeature) {
        deferredFeature.progress({isLoaded: true, exists:true});
    };

    /**
     * Updates the deferred object when the library has could not load.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureExecuteFail = function (deferredFeature) {
        deferredFeature.reject({isLoaded: false, exists:true});
    };

    /**
     * Updates the deferred object when the library has loaded.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureLoadSuccess = function (deferredFeature) {
        deferredFeature.resolve({isLoaded: true, exists:true});
    };

    /**
     * Updates the deferred object when the library has could not load.
     * @param {object} deferredFeature - The deferredFeature.
     */

    featureLoadFail = function (deferredFeature) {
        deferredFeature.reject({isLoaded: false, exists:true});
    };

    /**
     * Sets up the handler that searches the DOM for resources to load.
     */

    scanForFeature = function () {
        jQuery('[data-bundle]').each(function (idx, el) {
            var resource = jQuery(el).data().bundle,
                host =  jQuery(el).data().host || '',
                source  =  jQuery(el).data().source || '';
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

    loadUrl = function (url) {
        var urlDeferred = jQuery.Deferred();
        jQuery.ajax({dataType: 'script', cache: true, url: url})
            .done(function () {urlDeferred.resolve();})
            .fail(function () {urlDeferred.reject();});

        return urlDeferred;
    };

    /**
     * Returns the file name of a feature.
     * @param {string} feature - The name of the feature.
     * @return {string} fileName - The feature's file name.
     */

    getBundleNameForFeatureName = function (feature) {
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
        features[feature].resolve({isLoaded: true, exists:true, executed:true});
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
                nsFeatures[feature].resolve({isLoaded: true});
            } else {
                nsFeatures[feature].reject({isLoaded: false});
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
