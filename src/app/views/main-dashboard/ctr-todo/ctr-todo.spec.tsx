import { render } from '@testing-library/react';

import CtrTodo from './ctr-todo';

describe('CtrTodo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CtrTodo />);
    expect(baseElement).toBeTruthy();
  });
});
