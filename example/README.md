# Examples

To run these examples start a server (any port) with this as the root directory.

## Example 1

This is a very simple example that uses the fa-injector to load a simple JS
library.  In the example the library is loaded by calling the loadFeature in
the injector directly.

## Example 2

This is a very simple example that uses the fa-injector to load a simple JS
library.  In the example the library is loaded by calling the loadFeature with
a data tag.

## Example 3

This is a very simple example that uses the fa-injector to load a webpack
bundle.  In the example the bundle is loaded by calling the loadFeature with
a data tag.

## Example 4

This is a very simple example that uses the fa-injector to load a webpack
bundle.  The bundle combines multiple JS files.  In the example the bundle
is loaded by calling the loadFeature with a data tag.

## Example 5

This is a very simple example that uses the fa-injector to load a webpack
bundle.  In this example the webpack bundle contains HTML, CSS, and JS.
The bundle combines multiple JS files.  In the example the bundle is loaded
by calling the loadFeature with a data tag.

## Example 6

This example loads a phone bundle and a phone sized image; or it loads a desktop
bundle and a desktop image.  Many websites pull down the phone and the desktop
assets - then it hides the assets appropriately.  In this example in phone mode
the desktop assets are never loaded and vice versa.

## Example 7

This example loads the phone bundle when the client width is less than 600 pixels
and the desktip bundle when the client width is greater than 600 pixels.

## Example 8

This example doesn't load any tab bundles until a tab is clicked.  The bundles
contain the HTML, CSS, and JS for the specific tab.  The bundle is only loaded
when the tab is click.  So in this example a user might log into update their
user data.  The user can click on the user tab.  The the user HTML, JS, and CSS
are loaded.  The Account and Location assets are never loaded.

## Example 9

This example loads a reactJS JSX file that was bundled with webpack.

## Example 10

This example loads a remote reactJS JSX file that was bundled with webpack.

## Example 11

This example loads a resource directly from the bundle registry.

## Example 12

This example demonstrates using the injector to manage dependencies.  Each block
is coded to depend on the block below it.  When you click a block it automatically
loads the block it's dependent on and it will not complete until the dependency
is fulfilled.  The executeFeature function was used because in FF the load promise
is fulfilled after the file is retrieved but before the code in the file is loaded.
