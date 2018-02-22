const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'Template',
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    hash: true,
    inject: 'body'
});

const HotReloader = new webpack.HotModuleReplacementPlugin();

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
        path: __dirname + '/dist',
        filename: "bundle.js",
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: __dirname + "/dist/",
        compress: true,
        host: "0.0.0.0",
        hot: true,
        inline: true,
        progress:true,
        overlay: true,
        historyApiFallback: true,
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.mp4$/, loader: 'file-loader'}
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        HotReloader,
        new ModernizrWebpackPlugin(modernizrConfig),
        new CopyWebpackPlugin([
            { from: 'manifest.json' },
            { from: 'favicon.ico' }
        ])
    ]
};
