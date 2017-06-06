/* global HTMLImports */

window.WebComponents = window.WebComponents || {};

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
        },

        polyLoader: function (options) {
            options = options || {};
            options.base = options.base || '/webcomponents_';
            options.chunks = options.chunks || false;

            /* For (1) existence means `WebComponentsReady` will file, (2) WebComponents.ready == true means event has fired. */
            // var name = 'webcomponents-loader.js';

            /* Feature detect which polyfill needs to be imported. */
            var polyfills = [],
                fire,
                newScript,
                polySubString,
                url;

            if (!('import' in document.createElement('link'))) {
                polyfills.push('hi');
            }

            if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||
                (window.ShadyDOM && window.ShadyDOM.force)) {
                polyfills.push('sd');
            }

            if (!window.customElements || window.customElements.forcePolyfill) {
                polyfills.push('ce');
            }

            /* NOTE: any browser that does not have template or ES6 features must load the full suite (called `lite` for legacy reasons) of polyfills. */
            /* Edge has broken fragment cloning which means you cannot clone template.content */
            if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
                !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
                polyfills = ['lite'];
            }

            if (polyfills.length) {
                // var script = document.querySelector('script[src*="' + name +'"]');
                newScript = document.createElement('script');

                /* Load it from the right place. */
                // var replacement = 'webcomponents-' + polyfills.join('-') + '.js';
                // var url = script.src.replace(name, replacement);
                polySubString = polyfills.join('_');

                url = (Array.isArray(options.chunks) && typeof options.chunks[polySubString] === 'string') ? options.chunks[polySubString] : options.base + polySubString + '.js';

                newScript.src = url;

                // NOTE: this is required to ensure the polyfills are loaded before
                // *native* html imports load on older Chrome versions. This *is* CSP
                // compliant since CSP rules must have allowed this script to run.
                // In all other cases, this can be async.
                if (document.readyState === 'loading' && ('import' in document.createElement('link'))) {
                    document.write(newScript.outerHTML);
                } else {
                    document.head.appendChild(newScript);
                }
            } else {
                // Ensure `WebComponentsReady` is fired also when there are no polyfills loaded.
                // however, we have to wait for the document to be in 'interactive' state,
                // otherwise a rAF may fire before scripts in <body>
                fire = function webComponentsFire() {
                    requestAnimationFrame(function webComponentsRAF() {
                        window.WebComponents.ready = true;
                        document.dispatchEvent(new CustomEvent('WebComponentsReady', {bubbles: true}));
                    });
                };

                if (document.readyState !== 'loading') {
                    fire();
                } else {
                    document.addEventListener('readystatechange', function wait() {
                        fire();
                        document.removeEventListener('readystatechange', wait);
                    });
                }
            }
        }
    };
})(window.FAI);
