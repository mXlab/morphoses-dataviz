const path = require('path');

module.exports = {
    entry: './src/js/main.jsx',
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: 'bundle.js'
    },
    mode: 'development',
    
    watch: true,
    watchOptions: {
        ignored: '**/node_modules'
    },

    module: {
        rules: [
            {
                test: [/\.m?js$/, /\.jsx?$/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"], // ensure compatibility with older browsers
                        plugins: ["@babel/plugin-transform-object-assign", "@babel/plugin-proposal-function-bind"], // ensure compatibility with IE 11
                    },
                },
              },
        ]
    },

    resolve: {
        extensions: [".js", ".jsx"]
    }
}