var webpage = require('webpage').create();
webpage
  .open('http://localhost:8080/tests/smoke/smoke001-injector-loads-js.html') // loads a page
  .then(function(){ // executed after loading
    // store a screenshot of the page
    webpage.viewportSize =
        { width:650, height:320 };
    webpage.render('pics/smoke001.png', {onlyViewport:true});

    var mainText = webpage.evaluate(function () {
          return document.querySelector("#injector-success").textContent;
    });

    slimer.wait(2000);

    if (mainText === 'Resource 01 Was Loaded And Executed Successfully') {
      console.log('Expected Text Found In smoke001.');
    }

    // then open a second page
    return webpage.open('http://localhost:8080/tests/smoke/smoke002-listens-for-complete-event.html');
  })
  .then(function(){
    // store a screenshot of the page
    webpage.viewportSize =
        { width:650, height:320 };
    webpage.render('pics/smoke002.png', {onlyViewport:true});

    var mainText = webpage.evaluate(function () {
         return document.querySelector("#injector-success").textContent;
    });

    if (mainText === "Injector Ready Captured And Processed") {
      console.log('Expected Text Found In smoke002.');
    }
    slimer.wait(2000);
    // then open a third page
    return webpage.open('http://localhost:8080/tests/smoke/smoke003-loads-standalone.html');

    })
    .then(function(){
       // store a screenshot of the page
      webpage.viewportSize ={ width:650, height:320 };
      webpage.render('pics/smoke003.png',{onlyViewport:true});

      var mainText = webpage.evaluate(function () {
           return document.querySelector("#injector-success").textContent;
      });

      if (mainText === "Injector Ready Captured And Processed") {
        console.log('Expected Text Found In smoke003.');
      }
      slimer.wait(2000);
      slimer.exit()
    });
