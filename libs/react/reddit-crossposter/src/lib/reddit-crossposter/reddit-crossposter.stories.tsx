import React from 'react';
import { storiesOf } from '@storybook/react';
import RedditCrossposter from './reddit-crossposter';

export const Component = () => {
  return (
    <RedditCrossposter/>
  );
};

storiesOf('RedditCrossposter', module)
  .add('default', () => <Component/>);