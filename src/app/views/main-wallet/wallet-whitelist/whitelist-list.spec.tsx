import { render } from '@testing-library/react';

import WhitelistList from './whitelist-list';

describe('WhitelistList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhitelistList />);
    expect(baseElement).toBeTruthy();
  });
});
