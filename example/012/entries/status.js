var status = jQuery('.status');

window.writeStatus = function (msg) {
  status.prepend(msg + '<br>');
}
