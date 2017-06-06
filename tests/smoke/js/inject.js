var WebpackAssets = [{"name":"injector2.091e60d60d.js","size":4457,"chunks":[0],"chunkNames":["injector2"],"emitted":true},{"name":"injector.7e8c513031.js","size":90350,"chunks":[1],"chunkNames":["injector"],"emitted":true},{"name":"webcomponents_lite.30813710e6.js","size":83932,"chunks":[2],"chunkNames":["webcomponents_lite"],"emitted":true},{"name":"webcomponents_sd_ce.be416d64fb.js","size":63597,"chunks":[3],"chunkNames":["webcomponents_sd_ce"],"emitted":true},{"name":"webcomponents_hi_sd_ce.927f5ee64e.js","size":71523,"chunks":[4],"chunkNames":["webcomponents_hi_sd_ce"],"emitted":true},{"name":"webcomponents_hi.08adf19652.js","size":8800,"chunks":[5],"chunkNames":["webcomponents_hi"],"emitted":true},{"name":"webcomponents_hi_ce.706b906509.js","size":22595,"chunks":[6],"chunkNames":["webcomponents_hi_ce"],"emitted":true}],
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
