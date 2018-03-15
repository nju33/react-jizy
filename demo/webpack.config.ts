import * as path from 'path';
import * as Webpack from 'webpack';
// import {CheckerPlugin} from 'awesome-typescript-loader';
// @ts-ignore
import HTMLWebpackPlugin from 'html-webpack-plugin';
import {compact} from 'lodash';

const dev = process.env.NODE_ENV !== 'production';

const config: Webpack.Configuration = {
  // @ts-ignore
  mode: dev ? 'development' : 'production',
  context: __dirname,
  devtool: dev ? 'eval-source-map' : 'source-map',
  entry: [
    path.join(__dirname, 'demo.tsx'),
  ],
  output: {
    path: path.join(__dirname, '../docs'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json',
          happyPackMode: true
        }
      }
    ]
  },
  plugins: compact([
    // dev ? new CheckerPlugin() : undefined,
    new HTMLWebpackPlugin(),
  ])
}

export default config;
