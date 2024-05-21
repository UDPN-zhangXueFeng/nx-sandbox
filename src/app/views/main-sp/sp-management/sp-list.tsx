import styles from './sp-list.module.scss';

/* eslint-disable-next-line */
export interface SpListProps {}

export function SpList(props: SpListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SpList!</h1>
    </div>
  );
}

export default SpList;
