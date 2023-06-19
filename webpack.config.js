import path from 'node:path';

import webpack from 'webpack';
import dotenv from 'dotenv';
dotenv.config();

export default {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/dist/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: [
      {
        directory: path.join(process.cwd()),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        GOOGLE_MAPS_API: JSON.stringify(process.env.GOOGLE_MAPS_API),
      },
    }),
  ],
};
