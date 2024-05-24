import styles from './token-list.module.scss';

/* eslint-disable-next-line */
export interface TokenListProps {}

export function TokenList(props: TokenListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TokenList!</h1>
    </div>
  );
}

export default TokenList;
