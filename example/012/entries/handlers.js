function controller (event) {
  var target = jQuery(event.target).data('level');
  writeStatus("Start Loading " + target);
  FAI.INJECTOR.loadFeature(target);
};

jQuery('.level').click(function (event) {controller(event);});
