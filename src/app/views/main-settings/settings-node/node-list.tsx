import styles from './node-list.module.scss';

/* eslint-disable-next-line */
export interface NodeListProps {}

export function NodeList(props: NodeListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NodeList!</h1>
    </div>
  );
}

export default NodeList;
