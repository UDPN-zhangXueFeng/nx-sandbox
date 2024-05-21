import { render } from '@testing-library/react';

import NodeList from './node-list';

describe('NodeList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NodeList />);
    expect(baseElement).toBeTruthy();
  });
});
