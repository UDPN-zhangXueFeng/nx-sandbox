import styles from './role-view.module.scss';

/* eslint-disable-next-line */
export interface RoleViewProps {}

export function RoleView(props: RoleViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RoleView!</h1>
    </div>
  );
}

export default RoleView;
