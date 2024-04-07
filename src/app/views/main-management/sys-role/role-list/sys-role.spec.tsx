import { render } from '@testing-library/react';

import SysRole from './sys-role';

describe('SysRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SysRole />);
    expect(baseElement).toBeTruthy();
  });
});
