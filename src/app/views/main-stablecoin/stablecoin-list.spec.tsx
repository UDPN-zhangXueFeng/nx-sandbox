import { render } from '@testing-library/react';

import StablecoinList from './stablecoin-list';

describe('StablecoinList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StablecoinList />);
    expect(baseElement).toBeTruthy();
  });
});
