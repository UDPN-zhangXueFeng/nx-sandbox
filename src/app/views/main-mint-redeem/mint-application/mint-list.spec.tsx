import { render } from '@testing-library/react';

import MintList from './mint-list';

describe('MintList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MintList />);
    expect(baseElement).toBeTruthy();
  });
});
