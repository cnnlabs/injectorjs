
writeStatus("******** Level 3 Loaded");
$('.level3').css("background-color", "#CCCCFF");
FAI.INJECTOR.executeFeature('level2').then(
  function () {
    writeStatus("******** Level 3 Executed");
    $('.level3').css("background-color", "#22FFFF");
    writeStatus("******** Level 3 Completed");
    FAI.INJECTOR.scriptComplete('level3');
  }
)
