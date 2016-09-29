require('../src/css/hello.css');
var renderer = require('../src/js/renderer.js');
var template = require('../src/html/hello_template.html');
var html = renderer.english(template) + renderer.spanish(template);
$("#output").html(html);
