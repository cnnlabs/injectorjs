var renderer = {};
renderer.english = function (template) {
  var text = 'Hello World! Loaded Via The INJECTOR - WEBPACK BUNDLE!',
      result = template.replace("{hello}", text);
  return result;
}

renderer.spanish = function (template) {
  var text = 'Hola Mundo! Loaded Via The INJECTOR - WEBPACK BUNDLE!',
      result = template.replace("{hello}", text);
  return result;
}

module.exports.english    = renderer.english;
module.exports.spanish    = renderer.spanish;
