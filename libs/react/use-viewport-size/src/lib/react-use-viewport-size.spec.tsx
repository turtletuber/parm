import React from 'react';
import { render } from '@testing-library/react';

import ReactUseViewportSize from './react-use-viewport-size';

describe(' ReactUseViewportSize', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactUseViewportSize />);
    expect(baseElement).toBeTruthy();
  });
});
