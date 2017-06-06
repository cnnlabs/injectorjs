/* Create a class for the element */
class cnnGallery extends HTMLElement {
    static get observedAttributes() {
        return [
            'open'
        ];
    }

    constructor(options) {
        /* Always call super first in constructor */
        super();

        /* Create a shadow root */
        this.shadow = this.attachShadow({mode: 'open'});

        /* Add the link to the shadow root. */
        this.shadow.innerHTML = `
            <div>Images galore!</div>            
        `;

        console.log('Constructed with the following options', options);
    }

    connectedCallback() {
        console.log('gallery component added to DOM');

        this.init();
    }

    disconnectedCallback() {
        console.log('gallery component removed from DOM');
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        console.log('gallery component attribute changed...');
        console.log('old value', oldVal);
        console.log('new value', newVal);
    }

    /* custom methods */
    init() {
        console.log('Initializing gallery...');
    }

    update(html) {
        console.log('updating gallery...');
        this.shadow.innerHTML = html;
    }
}

// Define the new element
customElements.define('cnn-gallery', cnnGallery);