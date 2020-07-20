const path = require("path");

module.exports = {
    devtool: "source-map",
    watch: true,

    entry: {
        sdk: path.resolve("src/sdk.js")
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules")
        ],

        extensions: ["*", ".js", ".jsx"],

        alias: {
            mobro: path.resolve(__dirname, "src/mobro/")
        }
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
                    presets: ["@babel/preset-env", "@babel/react"]
                }
            }
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    },

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};