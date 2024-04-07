import styles from './sys-user.module.scss';

/* eslint-disable-next-line */
export interface SysUserProps {}

export function SysUser(props: SysUserProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SysUser!</h1>
    </div>
  );
}

export default SysUser;
