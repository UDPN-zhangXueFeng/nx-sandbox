import styles from './whitelist-list.module.scss';

/* eslint-disable-next-line */
export interface WhitelistListProps {}

export function WhitelistList(props: WhitelistListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WhitelistList!</h1>
    </div>
  );
}

export default WhitelistList;
