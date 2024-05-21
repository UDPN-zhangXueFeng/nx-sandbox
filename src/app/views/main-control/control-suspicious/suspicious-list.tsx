import styles from './suspicious-list.module.scss';

/* eslint-disable-next-line */
export interface SuspiciousListProps {}

export function SuspiciousList(props: SuspiciousListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SuspiciousList!</h1>
    </div>
  );
}

export default SuspiciousList;
