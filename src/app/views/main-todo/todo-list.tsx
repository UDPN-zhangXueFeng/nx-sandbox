import styles from './todo-list.module.scss';
import CTM from '@/app/core/components/CTM';
import { message } from 'antd';
import useHook from '@/app/hooks/useHook';
import { useRef, useMemo } from 'react';


enum RoleEnum {
  locale = 'todo',
  formKey1 = 'roleName',
  formKey2 = 'describes',
  formKey3 = 'status',
  routerPath = '/main/management/system-management/role/edit'
}

/* eslint-disable-next-line */
export interface TodoListProps {}

export function TodoList(props: TodoListProps) {
  const { t, routerPush } = useHook(RoleEnum.locale);
  const TableActionRef = useRef<CustomTableRef>();
  const columns = useMemo<ProColumns<GlobalAny>[]>(
    () => [
      {
        title: t('todo_00002'),
        dataIndex: '',
        hideInSearch: true,
        render: (_, data, index) => `${index + 1}`,
      },
      {
        title: t('todo_00003'),
        dataIndex: RoleEnum.formKey1,
        hideInSearch: true,
      },
      {
        title: t('todo_00004'),
        hideInSearch: true,
        dataIndex: RoleEnum.formKey2
      },
      {
        title: t('COM_CreatedOn'),
        dataIndex: RoleEnum.formKey3,
        hideInSearch: true
      }
    ],
    [t]
  );
  return (
    <div className={styles['container']}>
      <CTM.ComTitle title={t('todo_00001')} />
      <CTM.CustomTable
        rowKey="roleId"
        ref={TableActionRef}
        columns={columns}
        search={false}
      />
    </div>
  );
}

export default TodoList;
