/* global ShadyCSS */

let isShady = (typeof ShadyCSS !== 'undefined'),
    template = document.currentScript.ownerDocument.querySelector('#share-bar');

if (isShady) {
    ShadyCSS.prepareTemplate(template, 'share-bar');
}

// Create a class for the element
class shareBar extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        isShady && ShadyCSS.styleElement(this);

        // Create a shadow root
        this.shadow = this.attachShadow({mode: 'open'});

        // Add the link to the shadow root.
        this.shadow.appendChild(document.importNode(template.content, true));
    }
}

// Define the new element
customElements.define('share-bar', shareBar);