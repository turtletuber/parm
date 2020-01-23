import React from 'react';
import { storiesOf } from '@storybook/react';
import { useViewportSize } from './react-use-viewport-size';

export const ViewportComponent = () => {
  const size = useViewportSize();
  return (
    <div id='element'>
      {size.width}px / {size.height}px
    </div>
  );
};

storiesOf('useViewportSize', module)
  .add('default', () => <ViewportComponent/>);