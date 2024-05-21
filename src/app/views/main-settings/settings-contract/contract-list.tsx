import styles from './contract-list.module.scss';

/* eslint-disable-next-line */
export interface ContractListProps {}

export function ContractList(props: ContractListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ContractList!</h1>
    </div>
  );
}

export default ContractList;
