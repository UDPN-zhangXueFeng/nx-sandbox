import { render } from '@testing-library/react';

import RedeemList from './redeem-list';

describe('RedeemList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RedeemList />);
    expect(baseElement).toBeTruthy();
  });
});
