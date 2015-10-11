# What about Images?

Well, the right question might be: _"what about assets?"_ 

An average web application needs at least some images, not to mention sounds for games, or simple _JSON_ configuration files. _Webpack_ can handle all of them via _loaders_, the same approach we took with CSS.

## Require Images

Any modern browser can handle images as `base64` encoded urls. And that's when the [`url-loader`](https://github.com/webpack/url-loader) comes into the picture:

	// load images as encoded urls
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
    }
    
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

If you are writing a game chances are that you want to play some sounds.

## Require JSON