import styles from './redeem-list.module.scss';

/* eslint-disable-next-line */
export interface RedeemListProps {}

export function RedeemList(props: RedeemListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RedeemList!</h1>
    </div>
  );
}

export default RedeemList;
