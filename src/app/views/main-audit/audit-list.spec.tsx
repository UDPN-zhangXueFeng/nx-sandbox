import { render } from '@testing-library/react';

import AuditList from './audit-list';

describe('AuditList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuditList />);
    expect(baseElement).toBeTruthy();
  });
});
