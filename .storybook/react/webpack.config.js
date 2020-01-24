const reactUseViewportSizeConfig = require('../../libs/react/use-viewport-size/.storybook/webpack.config');
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config = await reactUseViewportSizeConfig({ config, mode });
  return config;
};