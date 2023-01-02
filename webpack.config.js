const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {'QuickQuiz': './src/main.js'},
    mode: 'development',
    output: {
      filename: 'QuickQuiz.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    }
};