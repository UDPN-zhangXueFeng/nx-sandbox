import styles from './ctr-todo.module.scss';

/* eslint-disable-next-line */
export interface CtrTodoProps {}

export function CtrTodo(props: CtrTodoProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CtrTodo!</h1>
    </div>
  );
}

export default CtrTodo;
