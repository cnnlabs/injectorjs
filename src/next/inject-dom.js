(function (NS) {
    'use strict';

    NS.DOM = {
        /**
         * Get all elements from DOM, return proper array instead of NodeList.
         * Browser suuport : https://caniuse.com/#feat=queryselector
         */
        getElements: function (selector) {
            const elemMatches = document.querySelectorAll(selector) || [];
            let elems = [];

            for (var i = 0; i < elemMatches.length; i++) {
                elems.push(elemMatches[i]);
            }

            return elems;
        },

        getElement: function (selector) {
            return document.querySelector(selector);
        }
    };
})(window.FAI);
