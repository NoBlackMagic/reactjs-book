
// import the styles for our app
require('./index.css');

// require an image as it was just another module
// it will incorporate the image as a base64 string
var img = new Image();
img.src = require('./react.png');
document.body.appendChild(img);
