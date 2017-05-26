(function (NS) {
    NS.utils = {
        /**
         * Get all elements from DOM, return proper array instead of NodeList.
         * Browser suuport : https://caniuse.com/#feat=queryselector
         */
        getDOMElements: function (selector) {
            const elemMatches = document.querySelectorAll(selector) || [];
            let elems = [];

            for (var i = 0; i < elemMatches.length; i++) {
                elems.push(elemMatches[i]);
            }

            return elems;
        },

        getDOMElement: function (selector) {
            return document.querySelector(selector);
        }
    };
})(window.FAI);
