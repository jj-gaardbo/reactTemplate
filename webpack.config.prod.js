const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'Template - PROD',
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    hash: true,
    inject: 'body'
});

const modernizrConfig = {
    'options': [
        'setClasses'
    ],
    'feature-detects': [
        'input',
        'canvas',
        'css/resize'
    ],
    'htmlWebpackPlugin': htmlWebpackPlugin,
    'minify': {
        output: {
            comments: true,
            beautify: true
        }
    }
};

module.exports = {
    context: __dirname + '/app',
    entry: __dirname + '/app/App.js',
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=8192' },
            { test: /\.mp4$/, use: 'file-loader'},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize=true", "sass-loader"]
                })
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        htmlWebpackPlugin,
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ModernizrWebpackPlugin(modernizrConfig),
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([
            { from: 'manifest.json' },
            { from: 'favicon.ico' },
        ]),
        new CompressionWebpackPlugin({
            test: /\.(js|css)$/
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json', // Not to confuse with manifest.json
        })
    ],
};
