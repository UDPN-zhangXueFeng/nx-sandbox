import { render } from '@testing-library/react';

import SysUser from './sys-user';

describe('SysUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SysUser />);
    expect(baseElement).toBeTruthy();
  });
});
