import React from 'react';
import { storiesOf } from '@storybook/react';
import { useDimensions } from './react-use-dimensions';
import { boolean } from '@storybook/addon-knobs';


export const Component = () => {
  const { ref, dimensions: {
    height, width
  } } = useDimensions('', boolean('live', true));
  return (
    <div ref={ref} className="app">
      {width}px x {height}px
      Hello!
    </div>
  );
};

storiesOf('useDimensions', module)
  .add('default', () => <Component/>);