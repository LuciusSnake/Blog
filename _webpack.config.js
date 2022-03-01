const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const filename = ext => `[name].${ext}`

module.exports = {
  mode: 'development', // мод определяющий тип сборки, минифицированный или нет.
  entry: {
    main: ['@babel/polyfill', './src/index.js']
  }, // точка входа
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }, // точка выхода
  resolve: {
    extensions: ['.js', '.json', '.png', '.scss', 'html'] // расширения файлов
  },
  optimization: {
    splitChunks: { // оптимизация подключаемых либ и различных файлов
      chunks: 'all'
    }
  },
  devtool: 'source-map', // добавление мапперов при девелопменте
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'index.html'), to: path.resolve(__dirname, 'dist') }
      ]
    }), // копирование файлов в dist
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ], // плагины
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // из поиска убираем node_modules
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/, // работа с пикчами
        use: ['file-loader']
      },
      {
        test: /\.(ttf|wof|wof2|eot)$/, // работа со шрифтами
        use: ['file-loader']
      }
    ]
  }
}

