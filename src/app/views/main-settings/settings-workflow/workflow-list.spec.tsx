import { render } from '@testing-library/react';

import WorkflowList from './workflow-list';

describe('WorkflowList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkflowList />);
    expect(baseElement).toBeTruthy();
  });
});
