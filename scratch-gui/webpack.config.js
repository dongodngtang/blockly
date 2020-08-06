const defaultsDeep = require('lodash.defaultsdeep');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyPackPool = require('os').cpus().length;

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// PostCss
const autoprefixer = require('autoprefixer');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const pkg = require('./package.json');
const isProductionMode = process.env.NODE_ENV === 'production';
const base = {
  mode: isProductionMode ? 'production' : 'development',
  devtool: isProductionMode ? 'none' : 'cheap-module-source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, 'build'),
    contentBase: path.resolve(__dirname, 'electron'),
    host: '0.0.0.0',
    port: process.env.PORT || 8602
    // compress: true,
    // before (app) {
    //   app.get('*.js', (req, res, next) => {
    //     req.url = `${req.url}.gz`;
    //     res.set('Content-Encoding', 'gzip');
    //     next();
    //   });
    // }
  },
  output: {
    library: 'GUI',
    filename: '[name].js'
  },
  externals: {
    React: 'react',
    ReactDOM: 'react-dom'
  },
  resolve: {
    symlinks: false,
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'happyPack/loader?id=jsx',
      include: [path.resolve(__dirname, 'src'), /node_modules[\\/]scratch-[^\\/]+[\\/]src/]
    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: [/[\\/]node_modules[\\/].*antd/],
      loader: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !isProductionMode
          }
        }, 'happyPack/loader?id=css',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: function () {
              return [
                postcssImport,
                postcssVars,
                autoprefixer({
                  overrideBrowserslist: ['last 1 versions']
                })
              ];
            }
          }
        }
      ]
    },
    { // 因为antd 基于 es module自身 css 是全局的，为了避免污染全局 css，这里单独配置
      test: /\.css$/,
      include: [/[\\/]node_modules[\\/].*antd/],
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          camelCase: true
        }
      }]
    }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        blocks: {
          test: /[\\/]node_modules[\\/]scratch-blocks[\\/]/,
          name: 'scratchblocks',
          priority: 3,
          chunks: 'all'
        },
        vm: {
          test: /[\\/]node_modules[\\/]scratch-vm[\\/]/,
          name: 'scratchvm',
          priority: 3,
          chunks: 'all'
        }
        // vendor: {
        //   test: /[\\/]node_modules[\\/](!scratch-vm)(!scratch-blocks)[\\/]/,
        //   name: 'vendor'
        // }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        include: [/.*.js$/],
        parallel: true,
        cache: true,
        uglifyOptions: {
          output: {
            ecma: 8,
            comments: false
          }
        },
        extractComments: true
      })
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor/dist/vendor-manifest.json')
    }),
    new HappyPack({
      threads: happyPackPool,
      id: 'jsx',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // Explicitly disable babelrc so we don't catch various config
            // in much lower dependencies.
            babelrc: false,
            plugins: [
              ['import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css' // `style: true` 会加载 less 文件
              }],
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties', ['react-intl', {
                messagesDir: './translations/messages/'
              }],
              '@babel/plugin-transform-runtime'
            ],
            presets: [
              ['@babel/preset-env', {
                targets: {
                  node: true,
                  chrome: '60'
                },
                modules: false
              }],
              '@babel/preset-react'
            ]
          }
        }
      ]
    }),
    new HappyPack({
      id: 'css',
      threads: happyPackPool,
      loaders: [{
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]_[local]_[hash:base64:5]',
          camelCase: true
        }
      }
      ]
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isProductionMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: isProductionMode ? '[id].css' : '[id].[hash].css'
    })
  ]
};

module.exports = [
  // to run editor examples
  defaultsDeep({}, base, {
    entry: {
      gui: './src/playground/index.jsx'
    },
    output: {
      // path: path.resolve(__dirname, 'build'),
      path: path.resolve(__dirname, 'electron'),
      filename: '[name].js'
    },
    externals: {
      React: 'react',
      ReactDOM: 'react-dom'
    },
    module: {
      rules: base.module.rules.concat([{
        test: /\.(svg|png|wav|gif|jpg|pdf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'static/assets/'
        }
      }])
    },
    plugins: base.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        'process.env.DEBUG': Boolean(process.env.DEBUG),
        'process.env.GA_ID': `"${process.env.GA_ID || 'UA-000000-01'}"`
      }),
      new HtmlWebpackPlugin({
        chunks: ['scratchblocks', 'scratchvm', 'gui'],
        jsExtension: '.gz',
        template: 'src/playground/index.ejs',
        title: `DobotBlock ${pkg.version}`,
        sentryConfig: process.env.SENTRY_CONFIG ? `"${process.env.SENTRY_CONFIG}"` : null
      }),
      new CopyWebpackPlugin([{
        from: 'static',
        to: 'static'
      }]),
      new CopyWebpackPlugin([{
        from: 'node_modules/scratch-blocks/media',
        to: 'static/blocks-media'
      }]),
      new CopyWebpackPlugin([{
        from: 'extensions/**',
        to: 'static',
        context: 'src/examples'
      }]),
      new CopyWebpackPlugin([{
        from: 'extension-worker.{js,js.map}',
        context: 'node_modules/scratch-vm/dist/web'
      }]),
      new CopyWebpackPlugin([{
        from: 'blockjs',
        to: 'blockjs'
      }])
      // new CompressionPlugin({
      //   test: /\.js$/,
      //   deleteOriginalAssets: true
      // })
    ])
  })
].concat(
  process.env.NODE_ENV === 'production' || process.env.BUILD_MODE === 'dist' ? (
  // export as library
    defaultsDeep({}, base, {
      target: 'web',
      entry: {
        'scratch-gui': './src/index.js'
      },
      externals: {
        React: 'react',
        ReactDOM: 'react-dom'
      },
      module: {
        rules: base.module.rules.concat([{
          test: /\.(svg|png|wav|gif|jpg)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'static/assets/',
            publicPath: '/static/assets/'
          }
        }])
      },
      plugins: base.plugins.concat([
        new CopyWebpackPlugin([{
          from: 'node_modules/scratch-blocks/media',
          to: 'static/blocks-media'
        }]),
        new CopyWebpackPlugin([{
          from: 'extension-worker.{js,js.map}',
          context: 'node_modules/scratch-vm/dist/web'
        }])
      ])
    })) : []
);
