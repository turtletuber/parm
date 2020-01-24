const path = require('path')

const base = '../libs/react';

/** 
 * All React components share one Storyboook webpack config.
 * If you need to configure your webpack config separately,
 * you will need to rewrite this config to handle each
 * path appropriately.
 */
const reactLibsPath = path.join(__dirname, base);
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(js|ts|jsx|tsx)$/,
    include: [reactLibsPath],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          /** all React components share this single tsconfig */
          configFileName: path.join(__dirname, base, 'tsconfig.json')
        },
      },
      { loader: require.resolve('react-docgen-typescript-loader') }
    ],
  }, {
    test: /\.s[ac]ss$/,
    include: [reactLibsPath],
    use: ['sass-loader'],
    use: [
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  });
  config.resolve.extensions.push(
    '.ts', '.tsx', '.css', '.scss', '.sass',
    '.js', '.jsx'
  );
  return config;
};
