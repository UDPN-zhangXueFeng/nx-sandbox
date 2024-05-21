import { render } from '@testing-library/react';

import ContractList from './contract-list';

describe('ContractList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContractList />);
    expect(baseElement).toBeTruthy();
  });
});
