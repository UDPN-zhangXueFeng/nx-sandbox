import styles from './cci-dsb.module.scss';

/* eslint-disable-next-line */
export interface CciDsbProps {}

export function CciDsb(props: CciDsbProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CciDsb!</h1>
    </div>
  );
}

export default CciDsb;
