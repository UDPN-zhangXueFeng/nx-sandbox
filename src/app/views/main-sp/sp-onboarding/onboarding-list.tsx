import styles from './onboarding-list.module.scss';

/* eslint-disable-next-line */
export interface OnboardingListProps {}

export function OnboardingList(props: OnboardingListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OnboardingList!</h1>
    </div>
  );
}

export default OnboardingList;
