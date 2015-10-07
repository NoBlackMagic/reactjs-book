var greet = require('./greet');
greet('ReactJS');

var $ = require('jquery');
$('h1').fadeOut(function() {
    $('h1').fadeIn();    
});
