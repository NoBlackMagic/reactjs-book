# What about CSS?

You may have heard that _ReactJS_ play nice with inline CSS. It is quite true 
but often you will find more convenient to keep your CSS sources separated from the JS codebase.

> If you build an **isomorphic web app** you need the _CSS critical path_ to load
> before the first rendering loop. So you want that _CSS_ file to be linked
> within the head of the document, while the app's bundle is usually linked 
> in the body so to do not affect the **first page rendering time**.

On the other side, **under active development**, you may find convenient to build one single `bundle` which contains everything is needed to run the app.

With _Webpack_ you can easily enjoy the best of the two worlds:

1. you'll embed all our CSS within the bundle during development so to enjoy features like hot code loading
2. when it's time to deploy you'll extract CSS rules in an optimized CSS bundle

In order to do so we need to give some more fine grained instructions to _Webpack_.  
Meet the classic _Webpack_'s configuration file `webpack.config.js`.

## Webpack Config File

Create an empty file in the _root_ of your app and name it `webpack.config.js`.

	// webpack.config.js
    module.exports = {
        entry: [
            './src/index.js'
        ],
        output: {
            path: 'build',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            }]
        }
    };

This file is a simple _CommonJS_ module for which _Webpack_ looks when executed. 
There are [tons of configuration options](https://webpack.github.io/docs/configuration.html) to control an incredible amount of features, but for the purpose of this chapter we keep things easy and work with three options only.

`entry` allows to describe how your application is composed. In our simple example we use is to tell _Webpack_ which file is the **app's entry point**.

`output` tells _Webpack_ where to produce the **app's bundles** and how to name them.

`module/loaders` teach _Webpack_ what to do when requiring files that are not javascript and match some given patterns. So far you tell _Webpack_ to use something called `css-loader` to handle CSS files.

## Webpack Loaders

_Webpack loaders_ are the most effective way to unleash _Webpack_'s true potential.

> A loader is a simple middleware that receives a source, applies a transformation,
> and finally hands the result back to _Webpack_. Of course **loaders can be 
> chained** one into another!

If you want you can write your own loader, but is not like that you need to do that for a lot of ready to use loaders exists as _NPM_ modules.

[Here there is a list of existing _Webpack_ loaders &raquo;](https://webpack.github.io/docs/list-of-loaders.html)
