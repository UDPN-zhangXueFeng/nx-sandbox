import { render } from '@testing-library/react';

import ErrorPage from './errorPage';

describe('ErrorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorPage />);
    expect(baseElement).toBeTruthy();
  });
});
