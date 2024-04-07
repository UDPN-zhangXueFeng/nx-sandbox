import styles from './cci-todo.module.scss';

/* eslint-disable-next-line */
export interface CciTodoProps {}

export function CciTodo(props: CciTodoProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CciTodo!</h1>
    </div>
  );
}

export default CciTodo;
