const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeEnv = process.env.NODE_ENV || 'development'
const devMode = nodeEnv !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: nodeEnv,
  entry: './src/pcss/main.pcss',
  output: {
    path: __dirname + '/build',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  stats: {
    entrypoints: false,
    children: false,
 },
  module: {
    rules: [
      {
        test: /\.(pcss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: devMode } },
          { loader: 'postcss-loader', options: { sourceMap: devMode } },
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      },
      {
        test: /\.twig$/,
        use: [
          'twig-loader',
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                'components': 'src/pcss',
              }
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html.twig',
      minify: false
    }),
  ],
}
