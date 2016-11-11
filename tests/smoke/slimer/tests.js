var webpage = require('webpage').create();





function logSuccess (msg) {
    console.log('\x1b[32m');
    console.log(" _____ _____ _____ _____ ");
    console.log("|  _  |  _  |   __|   __|");
    console.log("|   __|     |__   |__   |");
    console.log("|__|  |__|__|_____|_____|");
    console.log('\x1b[0m');
    console.log(msg);
    slimer.wait(2000);
}

function logError (msg) {
    console.log('\x1b[31m');
    console.log(" _____ _____ _____ __    ");
    console.log("|   __|  _  |     |  |   ");
    console.log("|   __|     |-   -|  |__ ");
    console.log("|__|  |__|__|_____|_____|");
    console.log('\x1b[0m');
    console.log('\x1b[31m' + msg + '\x1b[0m');
    slimer.wait(200000);
}


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

    //slimer.wait(2000);

    if (mainText === 'Resource 01 Was Loaded And Executed Successfully') {
      logSuccess('Expected Text Found In smoke001-injector-loads-js.html.');
    } else {
      logError('Expected Text NOT Found In smoke001.');
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
      logSuccess('Expected Text Found In smoke002-listens-for-complete-event.html.');
    } else {
      logError('Expected Text NOT Found In smoke002.');
    }

    // then open a third page
    return webpage.open('http://localhost:8080/tests/smoke/smoke003-loads-standalone.html');

    })
   .then(function(){
       // store a screenshot of the page
      webpage.viewportSize ={ width:650, height:320 };
      webpage.render('pics/smoke003-loads-standalone.png',{onlyViewport:true});

      var mainText = webpage.evaluate(function () {
           return document.querySelector("#injector-success").textContent;
      });

      if (mainText === "Injector Ready Captured And Processed") {
        logSuccess('Expected Text Found In smoke003-loads-standalone.html.');
      } else {
        logError('Expected Text NOT Found In smoke003-loads-standalone.html.');
      }

      // then open a fourth page
      return webpage.open('http://localhost:8080/tests/smoke/smoke003-uses-readystates.html');
    })
    .then(function(){
       // store a screenshot of the page
      webpage.viewportSize ={ width:650, height:320 };
      webpage.render('pics/smoke003-uses-ready-states.png',{onlyViewport:true});

      var mainText = webpage.evaluate(function () {
           return document.querySelector("#injector-success").textContent;
      });

      if (mainText === "Injector ReadyState And Document ReadyState Used") {
        logSuccess('Expected Text Found In smoke003-uses-readystates.html.');
      } else {
        logError('Expected Text NOT Found In smoke003-uses-readystates.html.');
      }

      return webpage.open('http://localhost:8080/tests/smoke/smoke004-uses-events.html');
    })
    .then(function(){
       // store a screenshot of the page
      webpage.viewportSize ={ width:650, height:320 };
      webpage.render('pics/smoke004-uses-events.png',{onlyViewport:true});

      var mainText = webpage.evaluate(function () {
           return document.querySelector("#injector-success").textContent;
      });

      if (mainText === "Injector Loaded Event And Document Loaded Event Used") {
        logSuccess('Expected Text Found In smoke004-uses-events.html.');
      } else {
        logError('Expected Text NOT Found In smoke004-uses-events.html.');
      }

      slimer.exit();
    });
