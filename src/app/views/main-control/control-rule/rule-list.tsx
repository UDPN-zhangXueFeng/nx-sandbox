import styles from './rule-list.module.scss';

/* eslint-disable-next-line */
export interface RuleListProps {}

export function RuleList(props: RuleListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RuleList!</h1>
    </div>
  );
}

export default RuleList;
