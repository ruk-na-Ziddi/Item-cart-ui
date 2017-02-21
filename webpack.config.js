const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const contentBase = __dirname + 'src'
const config = {
    entry: './src/main/main.js',
    output: {path: __dirname + '/build', filename: 'bundle.js', publicPath: '/'},
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(gif|svg|png)$/,
                loader: "file-loader?name=[name].[ext]"

            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'html'
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            path: 'build',
            filename: 'index.html',
            template: 'src/html/index.html',
            publicPath: '/',
        }),
        new ExtractTextPlugin("app.css")
    ],
    devServer: {
        historyApiFallback: true,
        port: 8000,
        host: "0.0.0.0",
        proxy: {
            '/api/*': {
                target: 'http://localhost:8080'
            }
        },
        publicPath: '/'
    }
};

module.exports = validate(config);
