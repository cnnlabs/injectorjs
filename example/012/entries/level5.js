
writeStatus("Level 5 Loaded");
$('.level5').css("background-color", "#CCCCFF");
writeStatus("Level 5 Checking Dependencies");

FAI.INJECTOR.executeFeature('level4').then(
  function () {
    writeStatus("Level 5 Executed");
    $('.level5').css("background-color", "#FF2222");
    writeStatus("Level 5 Completed");
    FAI.INJECTOR.scriptComplete('level5');
  }
)
