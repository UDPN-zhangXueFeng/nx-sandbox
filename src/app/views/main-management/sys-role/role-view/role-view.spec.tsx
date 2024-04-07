import { render } from '@testing-library/react';

import RoleView from './role-view';

describe('RoleView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RoleView />);
    expect(baseElement).toBeTruthy();
  });
});
