import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { useOverflowState } from './react-use-overflow-state';


export const Component = ({overflowX, overflowY}) => {
  const width = overflowX ? 300 : 200;
  const height = overflowY ? 300 : 200;
  const { 
    parentRef, childRef, isOverflowing,
  } = useOverflowState([width, height]);
  return (
    <div 
      ref={parentRef}
      style={{
        height: '250px',
        width: '250px',
        border: '5px inset rgb(255,0,0)',
      }}
    >
      <div
        ref={childRef}
        style={{
          height,
          width,
          border: '5px inset rgb(0,255,0)',
        }}
      > 
        {Object.keys(isOverflowing)
          .map(k => (
            <div>
              {k} is {isOverflowing[k] ? '' : 'not '} overflowing.
            </div>
          ))
        }
      </div>
    </div>
  );
};

storiesOf('useOverflowState', module)
  .add('default', () => <Component {...{
    overflowX: boolean('overflow-x', false),
    overflowY: boolean('overflow-y', false),
  }} />);