$((function(_this) {
  return function() {
    return console.log('initialized!', new Date);
    
    var $ = require('jquery');
    var Hello = require('./scripts/hello');
    var hello = new Hello();

    console.log(hello.message);
    console.log($(window).width());
  };
})(this));