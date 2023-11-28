const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    entry: {
        // index: {
        //     import: "./src/index.js",
        //     dependOn: 'shared'
        // },
        // another: {
        //     import: "./src/another-module.js",
        //     dependOn: 'shared'
        // },
        index: "./src/index.js",
        // another: "./src/another-module.js",
        print: "./src/print.js",
        // shared: 'lodash'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: "./dist"
    },
    optimization: {
        // runtimeChunk: 'single'
        // splitChunks: {
        //     chunks: 'all'
        // }
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ title: "管理输出" })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            }
        ]
    }
}