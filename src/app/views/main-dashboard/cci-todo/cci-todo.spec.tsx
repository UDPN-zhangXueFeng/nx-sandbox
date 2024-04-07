import { render } from '@testing-library/react';

import CciTodo from './cci-todo';

describe('CciTodo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CciTodo />);
    expect(baseElement).toBeTruthy();
  });
});
