const path = require('path');
var fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const TerserPlugin = require('terser-webpack-plugin');

const MODERN_BROWSER_QUERY = "> 0.25%, not dead";

const buildCoreConfig = (babelConfig, outputPath, tag)=>{
  return {
    entry: [
      '/src/index.tsx',
    ],
    output: {
      path: outputPath,
      filename: `bundle_${tag}[contenthash].js`,
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelConfig
          },
        },
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {loader:'babel-loader', options: babelConfig},
            {loader:'ts-loader'}
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader?modules=true',
            },
          ],
        },
      ],
    },
    
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {

            mangle: {
              properties: {
                regex: '^(?!on).+',
                reserved : []
              }
            },
            compress: {
              passes: 3,

              toplevel: true,
              unsafe: true,
              ecma: 2015,
              unsafe_arrows: true,
              unsafe_Function: true,
              unsafe_math: true,
              unsafe_proto: true,
              unsafe_symbols: true,
              unsafe_undefined: true
            }
          },
        }),
        
      ],
    },
  }
}

const buildConfig = (env)=> { 
  // Load babel configuration from .babelrc 
  // This is required because jest will also pull it from there
  const babelRcData = fs.readFileSync('.babelrc', 'utf8');

  if(env.devServer) {
    const devPath = 'build/dev'

    const modernConfig = buildCoreConfig(JSON.parse(babelRcData), path.resolve(__dirname, devPath), 'dev_');

    modernConfig.entry.push('webpack-plugin-serve/client');
    modernConfig.plugins.push(new Serve({static: devPath, host:'localhost', historyFallback:true}));
    modernConfig.watch = true;
    modernConfig.optimization.minimize = false;
    modernConfig.devtool = 'inline-source-map';
    return [modernConfig];
  }
  else {
    const modernBabelConfig = JSON.parse(babelRcData);
    const modernConfig = buildCoreConfig(modernBabelConfig, path.resolve(__dirname, 'build/prod/modern'), '');

    const legacyBabelConfig = JSON.parse(babelRcData);
    legacyBabelConfig.presets[0][1].targets.browsers = [MODERN_BROWSER_QUERY]
    const legacyConfig = buildCoreConfig(legacyBabelConfig, path.resolve(__dirname, 'build/prod/legacy'), 'legacy_');

    
    return [modernConfig, legacyConfig];
  }
}



module.exports = buildConfig;