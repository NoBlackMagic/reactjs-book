var myLib = require('./my-lib');

// include the CSS project's entry point
// (or as many CSS are needed)
require('./index.css');

var starWarsCharacters = [
    'Luke Skywalker',
    'Han Solo',
    'Darth Vedar'
];

starWarsCharacters.forEach(function(characterName) {
    var msg = myLib.greet(characterName);
    myLib.append(msg);
});
