import React from 'react';
import { render } from '@testing-library/react';

import RedditCrossposter from './reddit-crossposter';

describe(' RedditCrossposter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RedditCrossposter />);
    expect(baseElement).toBeTruthy();
  });
});
