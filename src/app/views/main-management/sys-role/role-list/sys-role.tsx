import styles from './sys-role.module.scss';

/* eslint-disable-next-line */
export interface SysRoleProps {}

export function SysRole(props: SysRoleProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SysRole!</h1>
    </div>
  );
}

export default SysRole;
