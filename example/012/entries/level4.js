
writeStatus("**** Level 4 Loaded");
$('.level4').css("background-color", "#CCCCFF");
FAI.INJECTOR.executeFeature('level3').then(
  function () {
    writeStatus("**** Level 4 Executed");
    $('.level4').css("background-color", "#22FF22");
    writeStatus("**** Level 4 Completed");
    FAI.INJECTOR.scriptComplete('level4');
  }
)
