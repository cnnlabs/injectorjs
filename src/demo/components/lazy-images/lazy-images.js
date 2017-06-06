/* global ShadyCSS */

/* Create a class for the element */
class lazyImage extends HTMLElement {
    static get observedAttributes() {
        return [
            'data-image-state'
        ];
    }

    constructor() {
        /* Always call super first in constructor */
        super();

        /* Create a shadow root */
        this.shadow = this.attachShadow({mode: 'open'});

        /* Add the link to the shadow root. */
        this.shadow.innerHTML = `
            <style>
                .ratio-inner {
                    bottom: 0;
                    left: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 1;
                }

                img {
                    height: 100%;
                }
            </style>
        `;

        this.lazyClick = function lazyImageInitialClick() {
            this.setAttribute('data-image-state', 'active');
        };
    }

    connectedCallback() {
        this.addEventListener('click', this.lazyClick);
    }

    disconnectedCallback() {
        /* clean up event listeners, etc */
        this.removeEventListener('click', this.lazyClick);
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch (attr) {
                case 'data-image-state': {
                    if (newVal === 'active') {
                        console.log('image state set to active');

                        this.shadow.innerHTML += `
                            <div class="ratio-inner"><img src="${this.getAttribute('src')}" srcset="${this.getAttribute('srcset')}" /></div>
                        `;
                    }
                    break;
                }
            }
        }
    }
}

// Define the new element
customElements.define('lazy-image', lazyImage);

if (typeof ShadyCSS !== 'undefined') {
    ShadyCSS.styleDocument(document.querySelector('style.document-style'));
}