
module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [

            // load CSS files and inject CSS code into the page
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            },

            // load images as encoded urls
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url!img?optimizationLevel=7'
            },

            // load any other kind of file as url
            {
                test: /\.(ogg|mp3|wav)$/i,
                loader: 'url'
            }
        ]
    }
};
