import styles from './transaction-list.module.scss';

/* eslint-disable-next-line */
export interface TransactionListProps {}

export function TransactionList(props: TransactionListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TransactionList!</h1>
    </div>
  );
}

export default TransactionList;
