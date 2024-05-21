/*
 * @Author: chenyuting
 * @Date: 2024-05-20 16:46:59
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 16:48:52
 * @Description: 
 */
import styles from './stablecoin-list.module.scss';

/* eslint-disable-next-line */
export interface StablecoinListProps {}

export function StablecoinList(props: StablecoinListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StablecoinList!</h1>
    </div>
  );
}

export default StablecoinList;
