import React from 'react';
import { render } from '@testing-library/react';

import ReactUseDimensions from './react-use-dimensions';

describe(' ReactUseDimensions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactUseDimensions />);
    expect(baseElement).toBeTruthy();
  });
});
