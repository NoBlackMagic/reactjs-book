# What about CSS?

You may have heard that _ReactJS_ play nice with inline CSS. It is quite true 
but often you will find convenient to keep CSS separated from the JS codebase.

> If you build an **isomorphic web app** you the _CSS critical path_ to load
> before the first rendering loop and so you want that CSS file to be linked
> within the head of the document. Not within the app's bundle.

With _Webpack_ you can easily achieve both the solutions:

1. you'll embed all our CSS within the bundle during development so to enjoy features like hot code loading
2. at deploy time you'll extract CSS in an optimized CSS bundle

## Webpack Config File

In order to do so you need to write a **Webpack configuration file**, create an
empty file in the _root_ of your app and name it `webpack.config.js`.

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

This file is no more than a _CommonJS_ module for which _Webpack_ looks when run. 
There are tons of configuration options to achieve an incredible amound of feature, but for the purpose of this chapter we keep things easy and work with three options only.

`entry` allows to describe how your application is composed. In our simple example we use is to tell _Webpack_ which file is the **app's entry point**.

`output` tells _Webpack_ where to produce the **app's bundles** and how to name them.

`module/loaders` teach _Webpack_ what to do when requiring files that matches some given patterns. So far you tell _Webpack_ to use something called `css-loader` to handle CSS files.

## Webpack Loaders