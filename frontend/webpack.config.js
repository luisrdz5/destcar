const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const dotenv = require('dotenv');

dotenv.config();

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-source-map',
  entry: './src/frontend/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, './src/ssr-server/public'),
    filename: isProd ? 'assets/app-[hash].js' : 'assets/app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimizer: isProd ? [new TerserPlugin()] : [],
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isProd ? 'assets/vendor-[hash].js' : 'assets/vendor.js',
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some((chunks) => chunks.name !== 'vendor' && /[\\/]node_modules[\\/]/.test(name));
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
              @import "${path.resolve(__dirname, 'src/frontend/assets/styles/variables.scss')}";
              @import "${path.resolve(__dirname, 'src/frontend/assets/styles/App.scss')}";
              `,
            },
          },
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      },
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? 'assets/app-[hash].css' : 'assets/app.css',
    }),
    isProd ? new CompressionPlugin({
      test: /\.js$|\.css$/,
      filename: '[path].gz',
    }) : () => {},
    isProd ? new ManifestPlugin() : () => {},
  ],
};
