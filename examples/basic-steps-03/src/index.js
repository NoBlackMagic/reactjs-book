
// import the styles for our app
require('./index.css');

// require an image as it was just another module
// it will incorporate the image as a base64 string
var img = new Image();
img.src = require('./react.jpg');
document.body.appendChild(img);

// require an audio resource and play it at loading time
var sound = new Audio(require('./blip.ogg'));
sound.play();

// play audio when clicking on the image
img.addEventListener('click', function() {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
});

// add hints to the page
var p = document.createElement('p');
p.innerHTML = '<i>(click on the image to play the sound)</i>';
document.body.appendChild(p);

// load a json configuration file
var jsonCfg = require('./config.json');
console.log('JSON Config', jsonCfg);

// load an XML configuration file as json
var xmlCfg = require('./config.xml');
console.log('XML Config', xmlCfg);