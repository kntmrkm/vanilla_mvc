$ =>
  console.log 'initialized!', new Date
  
  $ = require 'jquery'
  
  Hello = require('./scripts/hello');
  hello = new Hello();

  console.log $(window).width()
  console.log hello.message