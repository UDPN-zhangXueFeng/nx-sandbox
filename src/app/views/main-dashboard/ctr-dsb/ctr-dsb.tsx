/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 14:47:43
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 14:49:12
 * @Description:
 */
import styles from './ctr-dsb.module.scss';

/* eslint-disable-next-line */
export interface CtrDsbProps {}

export function CtrDsb(props: CtrDsbProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CtrDsb!</h1>
    </div>
  );
}

export default CtrDsb;
