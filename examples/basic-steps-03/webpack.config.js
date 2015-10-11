
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
            },

            // load json configuration files
            {
                test: /\.(json)$/i,
                loader: 'json'
            },

            // load XML configuration files
            {
                test: /\.(xml)$/i,
                loader: 'xml'
            },

            // load fonts
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=application/vnd.ms-fontobject'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?mimetype=image/svg+xml'
            }
        ]
    }
};
