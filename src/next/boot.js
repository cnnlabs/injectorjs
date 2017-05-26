import Promise from 'promise-polyfill';

/**
 * Fetch polyfill to jQuery caveats: https://www.npmjs.com/package/whatwg-fetch#caveats
 */
import 'whatwg-fetch';

/* Prepare namespace */
window.FAI = window.FAI || {};
window.FAI.bundleHost = window.FAI.bundleHost || '/';

/* Setup polyfills */
if (!window.Promise) {
    window.Promise = Promise;
}
