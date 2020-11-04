const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config.resolve.extensions.push('.tsx');
  config.resolve.extensions.push('.ts');

  // https://github.com/nrwl/nx/issues/2320
  const tsPaths = new TsconfigPathsPlugin();
  config.resolve.plugins
    ? config.resolve.plugins.push(tsPaths)
    : (config.resolve.plugins = [tsPaths]);

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    }
  });
  return config;
};