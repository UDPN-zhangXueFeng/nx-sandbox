import { render } from '@testing-library/react';

import OnboardingList from './onboarding-list';

describe('OnboardingList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingList />);
    expect(baseElement).toBeTruthy();
  });
});
