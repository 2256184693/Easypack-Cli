/**
 * common plugin factory
 *
 * Created By SH
 */

const _ = require('lodash');

const DllManifestPlugin = require('./dll-manifest-plugin.js');

const TerserWebpackPlugin = require('terser-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

// common creator
const createPlugin = (Plugin, defaultConfig = {}) => (config) => {
  let opts = config ? config : defaultConfig;
  return new Plugin(opts);
}

const dllManifestPlugin = createPlugin(DllManifestPlugin);

const terserPlugin = createPlugin(TerserWebpackPlugin, {
  parallel: true,
  terserOptions: {
    cache: true,
    warnings: false,
    output: {
      comments: false
    }
  }
});

const optimizeCssPlugin = createPlugin(OptimizeCssAssetsPlugin);

const friendlyErrorsPlugin = createPlugin(FriendlyErrorsPlugin);

const analyzePlugin = createPlugin(BundleAnalyzerPlugin);

const htmlPlugin = createPlugin(HtmlWebpackPlugin);

const miniCssPlugin = createPlugin(MiniCssExtractPlugin, {
  filename: '[name].[chunkhash:8].css'
});

const tagsPlugin = createPlugin(HtmlWebpackTagsPlugin);

const vueLoaderPlugin = createPlugin(VueLoaderPlugin);


module.exports = {
  dllManifestPlugin,
  terserPlugin,
  optimizeCssPlugin,
  friendlyErrorsPlugin,
  analyzePlugin,
  htmlPlugin,
  miniCssPlugin,
  vueLoaderPlugin,
  tagsPlugin
}
