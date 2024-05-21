import { render } from '@testing-library/react';

import RuleList from './rule-list';

describe('RuleList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RuleList />);
    expect(baseElement).toBeTruthy();
  });
});
