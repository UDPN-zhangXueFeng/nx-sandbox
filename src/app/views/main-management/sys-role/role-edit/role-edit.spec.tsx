import { render } from '@testing-library/react';

import RoleEdit from './role-edit';

describe('RoleEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RoleEdit />);
    expect(baseElement).toBeTruthy();
  });
});
