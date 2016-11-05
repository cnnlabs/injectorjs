var webpage = require('webpage').create();
webpage
  .open('http://localhost:8080/tests/smoke/smoke001-injector-loads-js.html') // loads a page
  .then(function(){ // executed after loading
    // store a screenshot of the page
    webpage.viewportSize =
        { width:650, height:320 };
    webpage.render('pics/smoke001.png',
                   {onlyViewport:true});
    // then open a second page
    return webpage.open('http://localhost:8080/tests/smoke/smoke002-listens-for-complete-event.html');
  })
  .then(function(){
    // store a screenshot of the page
    webpage.viewportSize =
        { width:650, height:320 };
    webpage.render('pics/smoke002.png',
                   {onlyViewport:true});

      // then open a third page
      return webpage.open('http://localhost:8080/tests/smoke/smoke003-loads-standalone.html');
    })
    .then(function(){
       // store a screenshot of the page
      webpage.viewportSize ={ width:650, height:320 };
      webpage.render('pics/smoke003.png',{onlyViewport:true});

        slimer.exit()
    });
