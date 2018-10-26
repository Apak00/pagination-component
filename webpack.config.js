const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./examples/src/index.html"),
    filename: "./index.html",
    inject: true,
});
var config = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};

module.exports = (env, argv) => {
    console.log(env, argv)
    if (argv.mode === 'development') {
        config.entry = path.join(__dirname, "examples/src/index.js");
        config.plugins = [htmlWebpackPlugin];
        config.devServer = {
            port: 3002,
        }
    }

    if (argv.mode === 'production') {
        config.output = {
            filename: 'index.js',
            libraryTarget: 'commonjs2',
        };
    }

    console.log("Webpack Config: ", config);
    return config;
};


