const path = require("path");

module.exports = {
    devtool: "source-map",
    watch: true,

    entry: {
        sdk: path.resolve("src", "sdk.js")
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules")
        ]
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        }]
    }
};