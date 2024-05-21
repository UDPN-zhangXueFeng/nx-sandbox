import { render } from '@testing-library/react';

import SpList from './sp-list';

describe('SpList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpList />);
    expect(baseElement).toBeTruthy();
  });
});
