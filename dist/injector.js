/* jshint browser: true, node: false */
/* global jQuery */

/*
 * Service Injector - Takes libraries names and memory namespaces and
 * returns are promise for them. This file is included in the header.
 *
 * There are a lot of dependencies in the application.  This function returns
 * a promise for them.  It also loads libraries that have not been loaded.
 *
 *
 */
window.NS = window.NS || {};
window.NS.bundleHost = window.NS.bundleHost || '/';

(function (NS, jQuery) {
    'use strict';
    var chunks = NS.WebpackAssets,
        features = {},
        nsFeatures = {},
        getDeferredFeature,
        featureLoadFail,
        featureExecuteFail,
        featureExecuteSuccess,
        featureLoadSuccess,
        loadFeature;

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
    
    loadFeature = function () {
        jQuery('[data-cnn-resource]').each(function (idx, el) {
            var resource = jQuery(el).data().cnnResource;
            NS.INJECTOR.loadFeature(resource);
        });
    };
    
    NS.INJECTOR = NS.INJECTOR || {};
    
    /**
     * Creates a deferred object for a given feature name.
     * @param {string} feature - The name of the feature.
     * @param {boolean} video - Indicate that the URL needs decorated.
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
        for(var i = 0; i < events.length; i++ ) {
            features.footer.done(jQuery(document)[events[i]](loadFeature));
        }    
    }

    /**
     * Inspects the webpack chunkNames to determine if there is a registered
     * feature and returns the URL to that feature if there is one.
     * @param {string} feature - The name of the feature.
     * @param {boolean} video - Indicate that the URL needs decorated.
     * @return {string} url - URL to the feature's bundle
     */
    NS.INJECTOR.getUrlForFeatureName = function (feature, video) {
        var url = '',
            i = 0,
            j = 0,
            chunkNames,
            features;
        for (i = 0; i < chunks.length; i++) {
            features = chunks[i];
            chunkNames = features.chunkNames;
            for (j = 0; j < chunkNames.length; j++) {
                if (chunkNames[j] === feature) {
                    url = NS.bundleHost + features.name;
                    if (video) {
                        url = url + '?version=latest&client=expansion';
                    }
                }
            }
        }
        return url;
    };

    /**
     * Returns a promise for a resource feature.  Resolves the promise after
     * loading but (sometimes) before the library is executed.
     * @param {string} feature - The name of the feature.
     * @return {object} promise - A promise resolved when the feature is loaded.
     * note: videos always need to the library executed.
     */
    NS.INJECTOR.loadFeature = function (feature) {
        var video = false,
            deferredFeature = getDeferredFeature(feature),
            url = NS.INJECTOR.getUrlForFeatureName(feature, video);

        if (typeof deferredFeature === 'undefined') {
            deferredFeature = NS.INJECTOR.createDeferredForFeature(feature, video);
            if (deferredFeature.state() !== 'rejected') {
                jQuery.ajax({dataType: 'script', cache: true, url: url})
                .done(jQuery.proxy(featureLoadSuccess, null, deferredFeature))
                .fail(jQuery.proxy(featureLoadFail, null, deferredFeature));
            }
        }
        return deferredFeature.promise();
    };

    /**
     * Returns a promise for a resource feature.  Will not resolve the promise.
     * @param {string} feature - The name of the feature.
     * @param {boolean} video - Indicate that the URL needs decorated.
     * @return {object} promise - A promise progress when the feature is loaded.
     */

    NS.INJECTOR.executeFeature = function (feature, video) {
        var deferredFeature = getDeferredFeature(feature),
            url = NS.INJECTOR.getUrlForFeatureName(feature, video);

        if (typeof deferredFeature === 'undefined') {
            deferredFeature = NS.INJECTOR.createDeferredForFeature(feature, video);
            if (deferredFeature.state() !== 'rejected') {
                jQuery
                .ajax({dataType: 'script', cache: true, url: url})
                .done(jQuery.proxy(featureExecuteSuccess, null, deferredFeature))
                .fail(jQuery.proxy(featureExecuteFail, null, deferredFeature));
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
     * Creates a new deferred object for a namespace (ie CNN.VideoPlayer.addVideo) feature.
     * @param {string} feature - The name of the feature.
     */
    NS.INJECTOR.resetNameSpaceFeature = function (feature) {
        nsFeatures[feature] = jQuery.Deferred();
    };

    /**
     * Returns a promise for a namespace (ie CNN.VideoPlayer.addVideo) feature.
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
})(window.NS, jQuery);
