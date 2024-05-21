import styles from './audit-list.module.scss';

/* eslint-disable-next-line */
export interface AuditListProps {}

export function AuditList(props: AuditListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AuditList!</h1>
    </div>
  );
}

export default AuditList;
