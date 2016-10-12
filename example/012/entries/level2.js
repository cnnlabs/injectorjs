
writeStatus("************ Level 2 Loaded");
$('.level2').css("background-color", "#CCCCFF");
FAI.INJECTOR.executeFeature('level1').then(
  function () {
    writeStatus("************ Level 2 Executed");
    $('.level2').css("background-color", "#FFFF22");
    writeStatus("************ Level 2 Completed");
    FAI.INJECTOR.scriptComplete('level2');
  }
)
