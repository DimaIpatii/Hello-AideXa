const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    entry : {
        app : './src/react/app.js'
    },
    mode : 'development',
    devtool : 'inline-source-map',
    target : 'web',
    plugins : [
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer : {
        writeToDisk : true,
        open : true,
        contentBase: path.resolve(__dirname, './dist'),
        compress : true,
        inline : true,
        port : 8080,
        
    },
    module : {
        rules : [
            {
                test : /\.s[ac]ss$/i,
                exclude : /node_modules/,
                use : [
                    { loader : MiniCssExtractPlugin.loader },
                    {loader : 'css-loader', options : {importLoaders : 1, sourceMap: true}},
                    {loader : 'sass-loader', options : {sourceMap: true}},
                ]
            },
            {
                test: /\.(js|jsx)$/, 
                exclude : /(node_modules|bower_components)/,
                use : [
                    { loader : 'babel-loader'}
                ]
            }
        ]
    },
    resolve : {
        extensions : ['*','.js','.jsx']
    },
    output : {
        filename : './[name].bundle.js',
    }
});