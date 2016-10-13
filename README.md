# Future Aligned Injector (FAI)

A client library that injects javascript bundles into the DOM.

## Why?

Interactions with web content is constantly evolving. This modules abstracts out
a mechanism to be able to dynamically deliver assets to a browser client on demand.


## Requirements

- jquery 1.12.3

- the client must define `window.FAI.bundleHost`
- the client must define `window.FAI.WebpackAssets`
- if you are adding event listeners, then you must resolve the footer

## Installation

## Hosted

##

### Bower

```
$ bower install fa-injector
```

### Download

Download the [latest](https://github.com/cnnlabs/injectorjs/archive/master.zip)

### Example

1. Run your favorite static server
2. Load /example/index.html
