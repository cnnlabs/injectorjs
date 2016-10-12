FA-Injector Example 012

This example demonstrates using the injector to manage dependencies.  Each block
is coded to depend on the block below it.  When you click a block it automatically
loads the block it's dependent on and it will not complete until the dependency
is fulfilled.  The executeFeature function was used because in FF the load promise
is fulfilled after the file is retrieved but before the code in the file is loaded.
