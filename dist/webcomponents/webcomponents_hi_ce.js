!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}({7:function(t,e){(function(){"use strict";!function(){function t(t,e){var n=Element.prototype;n.before=function(n){for(var o=[],r=0;r<arguments.length;++r)o[r-0]=arguments[r];r=o.filter(function(t){return t instanceof Node&&c(t)}),e.I.apply(this,o);for(var i=0;i<r.length;i++)t.a(r[i]);if(c(this))for(r=0;r<o.length;r++)(i=o[r])instanceof Element&&t.b(i)},n.after=function(n){for(var o=[],r=0;r<arguments.length;++r)o[r-0]=arguments[r];r=o.filter(function(t){return t instanceof Node&&c(t)}),e.H.apply(this,o);for(var i=0;i<r.length;i++)t.a(r[i]);if(c(this))for(r=0;r<o.length;r++)(i=o[r])instanceof Element&&t.b(i)},n.replaceWith=function(n){for(var o=[],r=0;r<arguments.length;++r)o[r-0]=arguments[r];var r=o.filter(function(t){return t instanceof Node&&c(t)}),i=c(this);e.K.apply(this,o);for(var a=0;a<r.length;a++)t.a(r[a]);if(i)for(t.a(this),r=0;r<o.length;r++)(i=o[r])instanceof Element&&t.b(i)},n.remove=function(){var n=c(this);e.remove.call(this),n&&t.a(this)}}function e(t,e,n){e.prepend=function(e){for(var o=[],r=0;r<arguments.length;++r)o[r-0]=arguments[r];r=o.filter(function(t){return t instanceof Node&&c(t)}),n.C.apply(this,o);for(var i=0;i<r.length;i++)t.a(r[i]);if(c(this))for(r=0;r<o.length;r++)(i=o[r])instanceof Element&&t.b(i)},e.append=function(e){for(var o=[],r=0;r<arguments.length;++r)o[r-0]=arguments[r];r=o.filter(function(t){return t instanceof Node&&c(t)}),n.append.apply(this,o);for(var i=0;i<r.length;i++)t.a(r[i]);if(c(this))for(r=0;r<o.length;r++)(i=o[r])instanceof Element&&t.b(i)}}function n(t){this.f=!1,this.a=t,this.i=new Map,this.g=function(t){return t()},this.b=!1,this.c=[],this.j=new r(t,document)}function o(){var t=this;this.b=this.a=void 0,this.f=new Promise(function(e){t.b=e,t.a&&e(t.a)})}function r(t,e){this.c=t,this.a=e,this.b=void 0,this.c.c(this.a),"loading"===this.a.readyState&&(this.b=new MutationObserver(this.g.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function i(){this.o=new Map,this.m=new Map,this.j=[],this.i=!1}function a(t){var e=d.has(t);return t=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(t),!e&&t}function c(t){var e=t.isConnected;if(void 0!==e)return e;for(;t&&!(t.__CE_isImportDocument||t instanceof Document);)t=t.parentNode||(window.ShadowRoot&&t instanceof ShadowRoot?t.host:void 0);return!(!t||!(t.__CE_isImportDocument||t instanceof Document))}function l(t,e){for(;e&&e!==t&&!e.nextSibling;)e=e.parentNode;return e&&e!==t?e.nextSibling:null}function s(t,e,n){n=n||new Set;for(var o=t;o;){if(o.nodeType===Node.ELEMENT_NODE){var r=o;e(r);var i=r.localName;if("link"===i&&"import"===r.getAttribute("rel")){if((o=r.import)instanceof Node&&!n.has(o))for(n.add(o),o=o.firstChild;o;o=o.nextSibling)s(o,e,n);o=l(t,r);continue}if("template"===i){o=l(t,r);continue}if(r=r.__CE_shadowRoot)for(r=r.firstChild;r;r=r.nextSibling)s(r,e,n)}o=o.firstChild?o.firstChild:l(t,o)}}function u(t,e,n){t[e]=n}!function(t){function e(t,e){if("function"==typeof window.CustomEvent)return new CustomEvent(t,e);var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!!e.bubbles,!!e.cancelable,e.detail),n}function n(t){if(s)return t.ownerDocument!==document?t.ownerDocument:null;var e=t.__importDoc;if(!e&&t.parentNode){if(e=t.parentNode,"function"==typeof e.closest)e=e.closest("link[rel=import]");else for(;!c(e)&&(e=e.parentNode););t.__importDoc=e}return e}function o(t){var e=document.querySelectorAll("link[rel=import]:not(import-dependency)"),n=e.length;if(n)for(var o,r=0,i=e.length;r<i&&(o=e[r]);r++)a(o,function(){--n||t()});else t()}function r(t){function e(){"loading"!==document.readyState&&document.body&&(document.removeEventListener("readystatechange",e),t())}document.addEventListener("readystatechange",e),e()}function i(t){r(function(){return o(function(){return t&&t()})})}function a(t,e){if(t.__loaded)e&&e();else if("script"!==t.localName||t.src){var n=function(o){t.removeEventListener(o.type,n),t.__loaded=!0,e&&e()};t.addEventListener("load",n),b&&"style"===t.localName||t.addEventListener("error",n)}else t.__loaded=!0,e&&e()}function c(t){return t.nodeType===Node.ELEMENT_NODE&&"link"===t.localName&&"import"===t.rel}function l(){var t=this;this.a={},this.b=0,this.f=new MutationObserver(function(e){return t.m(e)}),this.f.observe(document.head,{childList:!0,subtree:!0}),this.c(document)}var s="import"in document.createElement("link"),u=null;!1=="currentScript"in document&&Object.defineProperty(document,"currentScript",{get:function(){return u||("complete"!==document.readyState?document.scripts[document.scripts.length-1]:null)},configurable:!0});var d=/(^\/)|(^#)|(^[\w-\d]*:)/,p=/(url\()([^)]*)(\))/g,f=/(@import[\s]+(?!url\())([^;]*)(;)/g,h=/(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,m={J:function(t,e){if(t.href&&t.setAttribute("href",m.w(t.getAttribute("href"),e)),t.src&&t.setAttribute("src",m.w(t.getAttribute("src"),e)),"style"===t.localName){var n=m.D(t.textContent,e,p);t.textContent=m.D(n,e,f)}},D:function(t,e,n){return t.replace(n,function(t,n,o,r){return t=o.replace(/["']/g,""),e&&(t=m.F(t,e)),n+"'"+t+"'"+r})},w:function(t,e){return t&&d.test(t)?t:m.F(t,e)},F:function(t,e){if(void 0===m.v){m.v=!1;try{var n=new URL("b","http://a");n.pathname="c%20d",m.v="http://a/c%20d"===n.href}catch(t){}}return m.v?new URL(t,e).href:(n=m.G,n||(n=document.implementation.createHTMLDocument("temp"),m.G=n,n.B=n.createElement("base"),n.head.appendChild(n.B),n.A=n.createElement("a")),n.B.href=e,n.A.href=t,n.A.href||t)}},y={async:!0,load:function(t,e,n){if(t)if(t.match(/^data:/)){t=t.split(",");var o=t[1],o=-1<t[0].indexOf(";base64")?atob(o):decodeURIComponent(o);e(o)}else{var r=new XMLHttpRequest;r.open("GET",t,y.async),r.onload=function(){var t=r.getResponseHeader("Location");t&&!t.indexOf("/")&&(t=(location.origin||location.protocol+"//"+location.host)+t);var o=r.response||r.responseText;304===r.status||!r.status||200<=r.status&&300>r.status?e(o,t):n(o)},r.send()}else n("error: href must be specified")}},b=/Trident/.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent);if(l.prototype.c=function(t){t=t.querySelectorAll("link[rel=import]");for(var e=0,n=t.length;e<n;e++)this.i(t[e])},l.prototype.i=function(t){var e=this,n=t.href;if(void 0!==this.a[n]){var o=this.a[n];o&&o.__loaded&&(t.import=o,this.g(t))}else this.b++,this.a[n]="pending",y.load(n,function(t,o){t=e.o(t,o||n),e.a[n]=t,e.b--,e.c(t),e.j()},function(){e.a[n]=null,e.b--,e.j()})},l.prototype.o=function(t,e){if(!t)return document.createDocumentFragment();b&&(t=t.replace(h,function(t,e,n){return-1===t.indexOf("type=")?e+" type=import-disable "+n:t}));var n=document.createElement("template");if(n.innerHTML=t,n.content)t=n.content;else for(t=document.createDocumentFragment();n.firstChild;)t.appendChild(n.firstChild);(n=t.querySelector("base"))&&(e=m.w(n.getAttribute("href"),e),n.removeAttribute("href"));for(var o,n=t.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\n    script:not([type]), script[type="application/javascript"],\n    script[type="text/javascript"]'),r=0,i=0,c=n.length;i<c&&(o=n[i]);i++)a(o),m.J(o,e),o.setAttribute("import-dependency",""),"script"===o.localName&&!o.src&&o.textContent&&(o.setAttribute("src","data:text/javascript;charset=utf-8,"+encodeURIComponent(o.textContent+"\n//# sourceURL="+e+(r?"-"+r:"")+".js\n")),o.textContent="",r++);return t},l.prototype.j=function(){var t=this;if(!this.b){this.f.disconnect(),this.flatten(document);var e=!1,n=!1,o=function(){n&&e&&(t.c(document),t.b||(t.f.observe(document.head,{childList:!0,subtree:!0}),t.l()))};this.u(function(){n=!0,o()}),this.s(function(){e=!0,o()})}},l.prototype.flatten=function(t){t=t.querySelectorAll("link[rel=import]");for(var e,n=0,o=t.length;n<o&&(e=t[n]);n++){var r=this.a[e.href];(e.import=r)&&r.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(this.a[e.href]=e,e.readyState="loading",e.import=e,this.flatten(r),e.appendChild(r))}},l.prototype.s=function(t){function e(r){if(r<o){var i=n[r],c=document.createElement("script");i.removeAttribute("import-dependency");for(var l=0,s=i.attributes.length;l<s;l++)c.setAttribute(i.attributes[l].name,i.attributes[l].value);u=c,i.parentNode.replaceChild(c,i),a(c,function(){u=null,e(r+1)})}else t()}var n=document.querySelectorAll("script[import-dependency]"),o=n.length;e(0)},l.prototype.u=function(t){var e=document.querySelectorAll("style[import-dependency],\n    link[rel=stylesheet][import-dependency]"),o=e.length;if(o){for(var r=b&&!!document.querySelector("link[rel=stylesheet][href][type=import-disable]"),i={},c=0,l=e.length;c<l&&(i.h=e[c]);i={h:i.h},c++)if(a(i.h,function(e){return function(){e.h.removeAttribute("import-dependency"),--o||t()}}(i)),r&&i.h.parentNode!==document.head){var s=document.createElement(i.h.localName);for(s.__appliedElement=i.h,s.setAttribute("type","import-placeholder"),i.h.parentNode.insertBefore(s,i.h.nextSibling),s=n(i.h);s&&n(s);)s=n(s);s.parentNode!==document.head&&(s=null),document.head.insertBefore(i.h,s),i.h.removeAttribute("type")}}else t()},l.prototype.l=function(){for(var t,e=document.querySelectorAll("link[rel=import]"),n=e.length-1;0<=n&&(t=e[n]);n--)this.g(t)},l.prototype.g=function(t){t.__loaded||(t.__loaded=!0,t.import&&(t.import.readyState="complete"),t.dispatchEvent(e(t.import?"load":"error",{bubbles:!1,cancelable:!1,detail:void 0})))},l.prototype.m=function(t){for(var e=0;e<t.length;e++){var n=t[e];if(n.addedNodes)for(var o=0;o<n.addedNodes.length;o++){var r=n.addedNodes[o];r&&r.nodeType===Node.ELEMENT_NODE&&(c(r)?this.i(r):this.c(r))}}},s){for(var v,w=document.querySelectorAll("link[rel=import]"),g=0,E=w.length;g<E&&(v=w[g]);g++)v.import&&"loading"===v.import.readyState||(v.__loaded=!0);w=function(t){t=t.target,c(t)&&(t.__loaded=!0)},document.addEventListener("load",w,!0),document.addEventListener("error",w,!0)}else{var _=Object.getOwnPropertyDescriptor(Node.prototype,"baseURI");Object.defineProperty((!_||_.configurable?Node:Element).prototype,"baseURI",{get:function(){var t=c(this)?this:n(this);return t?t.href:_&&_.get?_.get.call(this):(document.querySelector("base")||window.location).href},configurable:!0,enumerable:!0}),r(function(){return new l})}i(function(){return document.dispatchEvent(e("HTMLImportsLoaded",{cancelable:!0,bubbles:!0,detail:void 0}))}),t.useNative=s,t.whenReady=i,t.importForElement=n}(window.HTMLImports=window.HTMLImports||{});var d=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));i.prototype.M=function(t,e){this.o.set(t,e),this.m.set(e.constructor,e)},i.prototype.f=function(t){return this.o.get(t)},i.prototype.L=function(t){return this.m.get(t)},i.prototype.s=function(t){this.i=!0,this.j.push(t)},i.prototype.l=function(t){var e=this;this.i&&s(t,function(t){return e.g(t)})},i.prototype.g=function(t){if(this.i&&!t.__CE_patched){t.__CE_patched=!0;for(var e=0;e<this.j.length;e++)this.j[e](t)}},i.prototype.b=function(t){var e=[];for(s(t,function(t){return e.push(t)}),t=0;t<e.length;t++){var n=e[t];1===n.__CE_state?this.connectedCallback(n):this.u(n)}},i.prototype.a=function(t){var e=[];for(s(t,function(t){return e.push(t)}),t=0;t<e.length;t++){var n=e[t];1===n.__CE_state&&this.disconnectedCallback(n)}},i.prototype.c=function(t,e){e=e||new Set;var n=this,o=[];if(s(t,function(t){if("link"===t.localName&&"import"===t.getAttribute("rel")){var r=t.import;r instanceof Node&&"complete"===r.readyState?(r.__CE_isImportDocument=!0,r.__CE_hasRegistry=!0):t.addEventListener("load",function(){var o=t.import;o.__CE_documentLoadHandled||(o.__CE_documentLoadHandled=!0,o.__CE_isImportDocument=!0,o.__CE_hasRegistry=!0,e.delete(o),n.c(o,e))})}else o.push(t)},e),this.i)for(t=0;t<o.length;t++)this.g(o[t]);for(t=0;t<o.length;t++)this.u(o[t])},i.prototype.u=function(t){if(void 0===t.__CE_state){var e=this.f(t.localName);if(e){e.constructionStack.push(t);var n=e.constructor;try{try{if(new n!==t)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{e.constructionStack.pop()}}catch(e){throw t.__CE_state=2,e}if(t.__CE_state=1,t.__CE_definition=e,e.attributeChangedCallback)for(e=e.observedAttributes,n=0;n<e.length;n++){var o=e[n],r=t.getAttribute(o);null!==r&&this.attributeChangedCallback(t,o,null,r,null)}c(t)&&this.connectedCallback(t)}}},i.prototype.connectedCallback=function(t){var e=t.__CE_definition;e.connectedCallback&&e.connectedCallback.call(t)},i.prototype.disconnectedCallback=function(t){var e=t.__CE_definition;e.disconnectedCallback&&e.disconnectedCallback.call(t)},i.prototype.attributeChangedCallback=function(t,e,n,o,r){var i=t.__CE_definition;i.attributeChangedCallback&&-1<i.observedAttributes.indexOf(e)&&i.attributeChangedCallback.call(t,e,n,o,r)},r.prototype.f=function(){this.b&&this.b.disconnect()},r.prototype.g=function(t){var e=this.a.readyState;for("interactive"!==e&&"complete"!==e||this.f(),e=0;e<t.length;e++)for(var n=t[e].addedNodes,o=0;o<n.length;o++)this.c.c(n[o])},o.prototype.c=function(){if(this.a)throw Error("Already resolved.");this.a=void 0,this.b&&this.b(void 0)},n.prototype.define=function(t,e){var n=this;if(!(e instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!a(t))throw new SyntaxError("The element name '"+t+"' is not valid.");if(this.a.f(t))throw Error("A custom element with name '"+t+"' has already been defined.");if(this.f)throw Error("A custom element is already being defined.");this.f=!0;var o,r,i,c,l;try{var s=function(t){var e=u[t];if(void 0!==e&&!(e instanceof Function))throw Error("The '"+t+"' callback must be a function.");return e},u=e.prototype;if(!(u instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");o=s("connectedCallback"),r=s("disconnectedCallback"),i=s("adoptedCallback"),c=s("attributeChangedCallback"),l=e.observedAttributes||[]}catch(t){return}finally{this.f=!1}this.a.M(t,{localName:t,constructor:e,connectedCallback:o,disconnectedCallback:r,adoptedCallback:i,attributeChangedCallback:c,observedAttributes:l,constructionStack:[]}),this.c.push(t),this.b||(this.b=!0,this.g(function(){return n.l()}))},n.prototype.l=function(){if(!1!==this.b)for(this.b=!1,this.a.c(document);0<this.c.length;){var t=this.c.shift();(t=this.i.get(t))&&t.c()}},n.prototype.get=function(t){if(t=this.a.f(t))return t.constructor},n.prototype.whenDefined=function(t){if(!a(t))return Promise.reject(new SyntaxError("'"+t+"' is not a valid custom element name."));var e=this.i.get(t);return e?e.f:(e=new o,this.i.set(t,e),this.a.f(t)&&-1===this.c.indexOf(t)&&e.c(),e.f)},n.prototype.m=function(t){this.j.f();var e=this.g;this.g=function(n){return t(function(){return e(n)})}},window.CustomElementRegistry=n,n.prototype.define=n.prototype.define,n.prototype.get=n.prototype.get,n.prototype.whenDefined=n.prototype.whenDefined,n.prototype.polyfillWrapFlushCallback=n.prototype.m;var p=window.Document.prototype.createElement,f=window.Document.prototype.createElementNS,h=window.Document.prototype.importNode,m=window.Document.prototype.prepend,y=window.Document.prototype.append,b=window.Node.prototype.cloneNode,v=window.Node.prototype.appendChild,w=window.Node.prototype.insertBefore,g=window.Node.prototype.removeChild,E=window.Node.prototype.replaceChild,_=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),C=window.Element.prototype.attachShadow,N=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),A=window.Element.prototype.getAttribute,k=window.Element.prototype.setAttribute,S=window.Element.prototype.removeAttribute,D=window.Element.prototype.getAttributeNS,L=window.Element.prototype.setAttributeNS,T=window.Element.prototype.removeAttributeNS,j=window.Element.prototype.insertAdjacentElement,O=window.Element.prototype.prepend,x=window.Element.prototype.append,M=window.Element.prototype.before,R=window.Element.prototype.after,H=window.Element.prototype.replaceWith,F=window.Element.prototype.remove,P=window.HTMLElement,q=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),I=window.HTMLElement.prototype.insertAdjacentElement,W=new function(){},B=window.customElements;B&&!B.forcePolyfill&&"function"==typeof B.define&&"function"==typeof B.get||(B=new i,function(t){window.HTMLElement=function(){function e(){var e=this.constructor,n=t.L(e);if(!n)throw Error("The custom element being constructed was not registered with `customElements`.");var o=n.constructionStack;if(!o.length)return o=p.call(document,n.localName),Object.setPrototypeOf(o,e.prototype),o.__CE_state=1,o.__CE_definition=n,t.g(o),o;var n=o.length-1,r=o[n];if(r===W)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");return o[n]=W,Object.setPrototypeOf(r,e.prototype),t.g(r),r}return e.prototype=P.prototype,e}()}(B),function(t){u(Document.prototype,"createElement",function(e){if(this.__CE_hasRegistry){var n=t.f(e);if(n)return new n.constructor}return e=p.call(this,e),t.g(e),e}),u(Document.prototype,"importNode",function(e,n){return e=h.call(this,e,n),this.__CE_hasRegistry?t.c(e):t.l(e),e}),u(Document.prototype,"createElementNS",function(e,n){if(this.__CE_hasRegistry&&(null===e||"http://www.w3.org/1999/xhtml"===e)){var o=t.f(n);if(o)return new o.constructor}return e=f.call(this,e,n),t.g(e),e}),e(t,Document.prototype,{C:m,append:y})}(B),function(t){function e(e,n){Object.defineProperty(e,"textContent",{enumerable:n.enumerable,configurable:!0,get:n.get,set:function(e){if(this.nodeType===Node.TEXT_NODE)n.set.call(this,e);else{var o=void 0;if(this.firstChild){var r=this.childNodes,i=r.length;if(0<i&&c(this))for(var o=Array(i),a=0;a<i;a++)o[a]=r[a]}if(n.set.call(this,e),o)for(e=0;e<o.length;e++)t.a(o[e])}}})}u(Node.prototype,"insertBefore",function(e,n){if(e instanceof DocumentFragment){var o=Array.prototype.slice.apply(e.childNodes);if(e=w.call(this,e,n),c(this))for(n=0;n<o.length;n++)t.b(o[n]);return e}return o=c(e),n=w.call(this,e,n),o&&t.a(e),c(this)&&t.b(e),n}),u(Node.prototype,"appendChild",function(e){if(e instanceof DocumentFragment){var n=Array.prototype.slice.apply(e.childNodes);if(e=v.call(this,e),c(this))for(var o=0;o<n.length;o++)t.b(n[o]);return e}return n=c(e),o=v.call(this,e),n&&t.a(e),c(this)&&t.b(e),o}),u(Node.prototype,"cloneNode",function(e){return e=b.call(this,e),this.ownerDocument.__CE_hasRegistry?t.c(e):t.l(e),e}),u(Node.prototype,"removeChild",function(e){var n=c(e),o=g.call(this,e);return n&&t.a(e),o}),u(Node.prototype,"replaceChild",function(e,n){if(e instanceof DocumentFragment){var o=Array.prototype.slice.apply(e.childNodes);if(e=E.call(this,e,n),c(this))for(t.a(n),n=0;n<o.length;n++)t.b(o[n]);return e}var o=c(e),r=E.call(this,e,n),i=c(this);return i&&t.a(n),o&&t.a(e),i&&t.b(e),r}),_&&_.get?e(Node.prototype,_):t.s(function(t){e(t,{enumerable:!0,configurable:!0,get:function(){for(var t=[],e=0;e<this.childNodes.length;e++)t.push(this.childNodes[e].textContent);return t.join("")},set:function(t){for(;this.firstChild;)g.call(this,this.firstChild);v.call(this,document.createTextNode(t))}})})}(B),function(n){function o(t,e){Object.defineProperty(t,"innerHTML",{enumerable:e.enumerable,configurable:!0,get:e.get,set:function(t){var o=this,r=void 0;if(c(this)&&(r=[],s(this,function(t){t!==o&&r.push(t)})),e.set.call(this,t),r)for(var i=0;i<r.length;i++){var a=r[i];1===a.__CE_state&&n.disconnectedCallback(a)}return this.ownerDocument.__CE_hasRegistry?n.c(this):n.l(this),t}})}function r(t,e){u(t,"insertAdjacentElement",function(t,o){var r=c(o);return t=e.call(this,t,o),r&&n.a(o),c(t)&&n.b(o),t})}if(C?u(Element.prototype,"attachShadow",function(t){return this.__CE_shadowRoot=t=C.call(this,t)}):console.warn("Custom Elements: `Element#attachShadow` was not patched."),N&&N.get)o(Element.prototype,N);else if(q&&q.get)o(HTMLElement.prototype,q);else{var i=p.call(document,"div");n.s(function(t){o(t,{enumerable:!0,configurable:!0,get:function(){return b.call(this,!0).innerHTML},set:function(t){var e="template"===this.localName?this.content:this;for(i.innerHTML=t;0<e.childNodes.length;)g.call(e,e.childNodes[0]);for(;0<i.childNodes.length;)v.call(e,i.childNodes[0])}})})}u(Element.prototype,"setAttribute",function(t,e){if(1!==this.__CE_state)return k.call(this,t,e);var o=A.call(this,t);k.call(this,t,e),e=A.call(this,t),n.attributeChangedCallback(this,t,o,e,null)}),u(Element.prototype,"setAttributeNS",function(t,e,o){if(1!==this.__CE_state)return L.call(this,t,e,o);var r=D.call(this,t,e);L.call(this,t,e,o),o=D.call(this,t,e),n.attributeChangedCallback(this,e,r,o,t)}),u(Element.prototype,"removeAttribute",function(t){if(1!==this.__CE_state)return S.call(this,t);var e=A.call(this,t);S.call(this,t),null!==e&&n.attributeChangedCallback(this,t,e,null,null)}),u(Element.prototype,"removeAttributeNS",function(t,e){if(1!==this.__CE_state)return T.call(this,t,e);var o=D.call(this,t,e);T.call(this,t,e);var r=D.call(this,t,e);o!==r&&n.attributeChangedCallback(this,e,o,r,t)}),I?r(HTMLElement.prototype,I):j?r(Element.prototype,j):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched."),e(n,Element.prototype,{C:O,append:x}),t(n,{I:M,H:R,K:H,remove:F})}(B),document.__CE_hasRegistry=!0,B=new n(B),Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:B})),function(){var t=window.customElements,e=window.HTMLImports;if(window.WebComponents=window.WebComponents||{},t&&t.polyfillWrapFlushCallback){var n,o=function(){if(n){var t=n;return n=null,t(),!0}},r=e.whenReady;t.polyfillWrapFlushCallback(function(t){n=t,r(o)}),e.whenReady=function(t){r(function(){o()?e.whenReady(t):t()})}}e.whenReady(function(){requestAnimationFrame(function(){window.WebComponents.ready=!0,document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})})}(),function(){var t=document.createElement("style");t.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var e=document.querySelector("head");e.insertBefore(t,e.firstChild)}()}()}).call(self)}});