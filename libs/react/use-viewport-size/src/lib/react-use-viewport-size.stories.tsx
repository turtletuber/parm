import React from 'react';
import { storiesOf } from '@storybook/react';
import { useViewportSize } from './react-use-viewport-size';

const style = {
  color: 'white',
  backgroundColor: 'blue',
};

export const ViewportComponent = () => {
  const size = useViewportSize();
  return (
    <div className="app" style={style}>
      {size.width}px / {size.height}px
    </div>
  );
};

storiesOf('useViewportSize', module)
  .add('default', () => <ViewportComponent/>);