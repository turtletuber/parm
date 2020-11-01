import React from 'react';
import { storiesOf } from '@storybook/react';
import { DateSubtracter } from './date-subtracter';

export const Component = () => {
  return (
    <DateSubtracter/>
  );
};

storiesOf('DateSubtracter', module)
  .add('default', () => <Component/>);