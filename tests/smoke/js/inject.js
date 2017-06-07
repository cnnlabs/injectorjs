var WebpackAssets = [{"name":"injector2.js","size":5698,"chunks":[0],"chunkNames":["injector2"],"emitted":true},{"name":"injector.js","size":90352,"chunks":[1],"chunkNames":["injector"],"emitted":true},{"name":"webcomponents_lite.js","size":83935,"chunks":[2],"chunkNames":["webcomponents_lite"],"emitted":true},{"name":"share_bar.js","size":1582,"chunks":[3],"chunkNames":["share_bar"],"emitted":true},{"name":"lazy_images.js","size":2799,"chunks":[4],"chunkNames":["lazy_images"],"emitted":true},{"name":"gallery.js","size":2343,"chunks":[5],"chunkNames":["gallery"],"emitted":true},{"name":"webcomponents_sd_ce.js","size":63599,"chunks":[6],"chunkNames":["webcomponents_sd_ce"],"emitted":true},{"name":"webcomponents_hi_sd_ce.js","size":71523,"chunks":[7],"chunkNames":["webcomponents_hi_sd_ce"],"emitted":true},{"name":"webcomponents_hi.js","size":8800,"chunks":[8],"chunkNames":["webcomponents_hi"],"emitted":true},{"name":"webcomponents_hi_ce.js","size":22595,"chunks":[9],"chunkNames":["webcomponents_hi_ce"],"emitted":true}],
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
