import React from 'react';
import { render } from '@testing-library/react';

import DateSubtracter from './date-subtracter';

describe(' DateSubtracter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateSubtracter />);
    expect(baseElement).toBeTruthy();
  });
});
