import { render } from '@testing-library/react';

import CciDsb from './cci-dsb';

describe('CciDsb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CciDsb />);
    expect(baseElement).toBeTruthy();
  });
});
