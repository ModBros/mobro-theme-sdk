const path = require("path");

module.exports = {
    devtool: "source-map",
    watch: true,

    entry: {
        sdk: path.resolve("src/sdk.js")
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-v2.js"
    },

    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules")
        ],

        extensions: ["*", ".js", ".jsx"],

        alias: {
            mobro: path.resolve(__dirname, "src/mobro/"),
            "core-js/es6": "core-js/es"
        }
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-class-properties'
                    ],
                    presets: [
                        "@babel/react", "@babel/preset-env"
                    ]
                }
            }
        }, {
            test: require.resolve('react'),
            loader: 'expose-loader',
            options: {
                exposes: 'React'
            },
        }, {
            test: require.resolve('react-dom'),
            loader: 'expose-loader',
            options: {
                exposes: 'ReactDOM'
            },
        }, {
            test: /\.inline\.scss$/,
            exclude: /node_modules/,
            use: ["raw-loader", "sass-loader"]
        }, {
            test: /\.scss$/,
            exclude: [/\.inline\.scss/],
            use: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.svg$/,
            loader: "svg-inline-loader"
        }]
    },

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 8080
    }
};