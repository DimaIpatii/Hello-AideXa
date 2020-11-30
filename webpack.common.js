const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


module.exports = {
    entry : {
        app : './src/react/index.js'
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'head',
            chunks : ['app'],
            filename : 'index.html'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute : 'defer'
        }),
        new CleanWebpackPlugin()
    ],
    output : {
        path : path.resolve(__dirname, 'dist')
    }
}
