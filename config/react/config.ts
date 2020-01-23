import { addParameters, configure } from '@storybook/react';

import theme from './theme';

addParameters({
  options: {
    theme
  }
});

const req = require.context('../../libs/react', true, /\.stories.[jt]sx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
