import React from 'react';
import { render } from '@testing-library/react';

import ReactDateSubtracter from './react-date-subtracter';

describe(' ReactDateSubtracter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDateSubtracter />);
    expect(baseElement).toBeTruthy();
  });
});
