import styles from './role-edit.module.scss';

/* eslint-disable-next-line */
export interface RoleEditProps {}

export function RoleEdit(props: RoleEditProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RoleEdit!</h1>
    </div>
  );
}

export default RoleEdit;
