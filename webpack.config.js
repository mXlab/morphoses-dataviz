const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js'
    },
    mode: 'production',
    
    watch: true,
    watchOptions: {
        ignored: '**/node_modules'
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"], // ensure compatibility with older browsers
                        plugins: ["@babel/plugin-transform-object-assign"], // ensure compatibility with IE 11
                    },
                },
              },
        ]
    }
}