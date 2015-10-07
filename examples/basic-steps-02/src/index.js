var myLib = require('./my-lib');
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
