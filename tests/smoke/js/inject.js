var WebpackAssets = [{"name":"injector2.js","size":53267,"chunks":[0],"chunkNames":["injector2"],"emitted":true},{"name":"injector.js","size":281956,"chunks":[1],"chunkNames":["injector"],"emitted":true,"isOverSizeLimit":true}],
    src = '../../../' + WebpackAssets[0].name;

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

loadScript(src, function () {});
