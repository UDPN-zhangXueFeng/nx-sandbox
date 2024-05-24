import { render } from '@testing-library/react';

import TransactionList from './transaction-list';

describe('TransactionList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TransactionList />);
    expect(baseElement).toBeTruthy();
  });
});
