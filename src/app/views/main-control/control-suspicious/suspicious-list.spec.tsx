import { render } from '@testing-library/react';

import SuspiciousList from './suspicious-list';

describe('SuspiciousList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SuspiciousList />);
    expect(baseElement).toBeTruthy();
  });
});
