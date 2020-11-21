const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = merge(common, {
    mode : 'production',
    devtool : 'nosources-source-map',
    plugins : [
        new MiniCssExtractPlugin({
            filename : '[name].[contenthash].css',
            chunkFilename : '[id].css'
        })
    ],
    module : {
        rules : [
            {
                test : /\.s[ac]ss$/i,
                exclude : /node_modules/,
                use : [
                    {loader : MiniCssExtractPlugin.loader},
                    {loader : 'css-loader', options : {importLoaders : 2}},
                    {loader : 'postcss-loader'},
                    {loader : 'sass-loader'}
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude : /(node_modules|bower_components)/,
                use : [
                    {loader : 'babel-loader'}
                ]
            }
        ]
    },
    optimization : {
        minimize : true,
        minimizer : [
            new OptimizeCssAssetsPlugin()
        ]
    }
});