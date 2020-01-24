import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);
// const context = configure(require.context('../src/lib', true, /\.stories\.tsx?$/));
configure(require.context('../src/lib', true, /\.stories\.tsx?$/), module);


// function loadStories() {
//   context.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module);
