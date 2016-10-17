# Future Aligned Injector (FAI)

A browser library that injects bundles created with [webpack](https://webpack.github.io/) into the DOM.

[ ![Codeship Status for cnnlabs/injectorjs](https://codeship.com/projects/d63dde00-72e7-0134-351c-1ae66e72c451/status?branch=master)](https://codeship.com/projects/178762)

## Why?

Interactions with web content is constantly evolving. This modules abstracts out
a mechanism to be able to dynamically deliver assets to a browser client on demand.

### Injector Lite

The smallest version of the injector and is located in `dist/`.

#### Hosted

`registry.api.cnn.com/bundles/injector/injector.lite.<release.version>.min.js`

#### Bower

```
$ bower install fa-injector
```

#### Requirements

- jquery 1.12.3
- node v6.6.0
- the client must define `window.FAI.bundleHost`
- the client should define a `window.FAI.WebpackAssets` if they are not hosting a manifest.json on a CDN.
- if you are adding a footer deferred object to activate the event listeners, then you must resolve the deferred object

### Injector Bundle

A bundled version of the injector that has jquery bundled. This is the largest
version of this library. The release manifest has the bundle version to use.

#### Hosted

`registry.api.cnn.com/bundles/injector/manifest.<release.version>.json`

### Download

Download the [latest](https://github.com/cnnlabs/injectorjs/archive/master.zip)

### Example

1. Run your favorite static server
2. Load /example/index.html
