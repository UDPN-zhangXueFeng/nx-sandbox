import { render } from '@testing-library/react';

import CtrDsb from './ctr-dsb';

describe('CtrDsb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CtrDsb />);
    expect(baseElement).toBeTruthy();
  });
});
