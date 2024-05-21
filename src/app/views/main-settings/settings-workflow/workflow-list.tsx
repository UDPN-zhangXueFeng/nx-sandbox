import styles from './workflow-list.module.scss';

/* eslint-disable-next-line */
export interface WorkflowListProps {}

export function WorkflowList(props: WorkflowListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WorkflowList!</h1>
    </div>
  );
}

export default WorkflowList;
