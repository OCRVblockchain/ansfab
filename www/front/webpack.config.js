const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const ExtractTextPlugin = require("extract-text-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const webpack = require('webpack')
const multi = require('multi-loader');

var gitInfo = null //require('child_process').execSync('git describe --tag').toString().trim()
console.log("git:", gitInfo)

module.exports = {
    entry: './src/main.js',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        host: '127.0.0.1',
        port: 8081,
        compress: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            // options...
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
//            {
//                test: /\.m?js$/,
//                exclude: /(node_modules|bower_components|src\/papaparse\.js)/,
//                use: {
//                    loader: "babel-loader"
//                }
//            },
//            {
//                test: /\.css$/,
//                use: ExtractTextPlugin.extract({
//                    fallback: 'style-loader',
//                    use: 'css-loader?url=false'
//                })
//            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: multi(
                    'file-loader?name=[name].[ext].webp!image-webpack-loader?{webp: {quality: 100}}',
                    'file-loader?name=[name].[ext]'
                )
            },
            {
                test: /(papaparse\.js|modernizr-custom\.js)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
            config: path.resolve(__dirname, 'config/client.json')
        }
    },
    plugins: [
        //new ExtractTextPlugin('css/mystyles.css'),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new VueLoaderPlugin(),
        // new DotenvPlugin({
        //     sample: './.env.default',
        //     path: './.env'
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                GIT_INFO: `"${gitInfo}"`
            }
        })
    ],
    /*
    loaders: this.mode !== 'development' ? [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }
    ]
    : [],
    */
    optimization: {
        minimizer: this.mode !== 'development' ? [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    }
                },
            })
        ]
            : []
    }
}
