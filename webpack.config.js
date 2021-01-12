const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');    

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
       rules: [
           {
            test: /\.css$/i,
            exclude: /styles\.css$/i,
            use: ['style-loader', 'css-loader']
           },
           {
            test: /styles\.css$/i,
            use: [ MiniCssExtract.loader , 'css-loader']
           },
           {
               test: /\.html$/i,
               loader: 'html-loader',
               options:{
                   minimize: false,
                   attributes: false,
               }
           },
           {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
           }
       ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        }),
        new CleanWebpackPlugin(),
    ]
}