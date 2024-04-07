import styles from './user-view.module.scss';

/* eslint-disable-next-line */
export interface UserViewProps {}

export function UserView(props: UserViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserView!</h1>
    </div>
  );
}

export default UserView;
