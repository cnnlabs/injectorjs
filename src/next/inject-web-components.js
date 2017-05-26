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
        importHref: function (href, onload, onerror, optAsync) {
            let link = document.head.querySelector('link[href="' + href + '"][import-href]');

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

            let cleanup = function () {
                link.removeEventListener('load', loadListener);
                link.removeEventListener('error', errorListener);
            };

            let loadListener = function (event) {
                cleanup();

                /* In case of a successful load, cache the load event on the link so that it can be used to short-circuit this method in the future when it is called with the same href param. */
                link.__dynamicImportLoaded = true;

                if (onload) {
                    whenImportsReady(() => {
                        onload(event);
                    });
                }
            };

            let errorListener = function (event) {
                cleanup();

                /* In case of an error, remove the link from the document so that it will be automatically created again the next time `importHref` is called. */
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }

                if (onerror) {
                    whenImportsReady(() => {
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
