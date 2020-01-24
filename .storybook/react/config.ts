import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

const base = '../../libs/react';
addDecorator(withKnobs);
configure(require.context(base, true, /\.stories\.tsx?$/), module);



// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

configure(loadStories, module);
