import React from 'react';
import { render } from '@testing-library/react';

import ReactRedditCrossposter from './react-reddit-crossposter';

describe(' ReactRedditCrossposter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactRedditCrossposter />);
    expect(baseElement).toBeTruthy();
  });
});
