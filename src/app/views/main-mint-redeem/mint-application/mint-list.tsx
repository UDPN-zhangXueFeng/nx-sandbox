import styles from './mint-list.module.scss';

/* eslint-disable-next-line */
export interface MintListProps {}

export function MintList(props: MintListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MintList!</h1>
    </div>
  );
}

export default MintList;
