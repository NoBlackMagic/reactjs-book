# What about Images?

Well, the right question might be: _"what about assets?"_ 

An average web application needs at least some images, not to mention sounds for games, or simple _JSON_ configuration files. _Webpack_ can handle all of them via _loaders_, the same approach we took with CSS.

## Require Images

Now that you discovered the possibility to `require()` both Javascript and CSS I bet you would like to write something like that in order to load your images:

	var img = new Image();
	img.src = require('./my-image.jpg');
	
This is very much possible for any modern browser can handle images as `base64` encoded urls. And that's when the [`url-loader`](https://github.com/webpack/url-loader) comes into the picture:

	// load images as encoded urls
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
    }    

> we are working in the `module.loaders` of `webpack.config.js` file

When **moving into production** you may want to optimise your app's images in order to **try to reduce your bundle's size** as much as you can. 

It's time for [`img-loader`](https://github.com/thetalecrafter/img-loader), a tool that should apply different optimisation techniques before to hands over to the `url-loader`:

	// load images as encoded urls (with optimisation)
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url!img?optimizationLevel=7'
    }
    
> Im my tests this last loader doesn't really reduce my bundles size, but I want to
> believe that my designers are already providing me with extremely optimised 
> assets :-)
    
## Require Sounds

If you are writing a game chances are that you want to play some sounds. [HTML5 Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) is the too you need, and of course an audio file is the resource you want to embed in your application bundle:

	var sound = new Audio(require('./my-audio.ogg'));
	sound.play();
	
Again you will use the `url-loader` to embed the audio file:

	// load any other kind of file as url
    {
        test: /\.(ogg|mp3|wav)$/i,
        loader: 'url'
    }
    
> Actually you can use the `url-loader` to embed any kind of resource as 
> `base64` urls in your application's bundle.

In case you want to load the pure `base64` representation instead of the full url version you can use the [`base64-loader`](https://github.com/antelle/base64-loader).


## Require JSON