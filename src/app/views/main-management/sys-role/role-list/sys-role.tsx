import useHook from '@/app/hooks/useHook';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import modal from 'antd/es/modal';
import { useRef, useMemo } from 'react';
import styles from './sys-role.module.scss';
import CTM from '@/app/core/components/CTM';
import { CustomButton } from '@bsnbase/components-react';
import { ActionsType } from '@/app/core/components/CTM/CustomTable';
import {
  getRoleDeleteApi,
  getRoleListApi,
  getRoleUpdateStatusApi
} from '@/app/config/apis/management/role';

enum RoleEnum {
  locale = 'management',
  formKey1 = 'roleName',
  formKey2 = 'describes',
  formKey3 = 'status',
  routerPath = '/main/management/system-management/role/edit'
}

/* eslint-disable-next-line */
export interface SysRoleProps {}

export function SysRole(props: SysRoleProps) {
  const { t, routerPush } = useHook(RoleEnum.locale);
  const TableActionRef = useRef<CustomTableRef>();
  const columns = useMemo<ProColumns<GlobalAny>[]>(
    () => [
      {
        title: t('mange_00001'),
        dataIndex: '',
        render: (_, data, index) => `${index + 1}`,
        hideInSearch: true
      },
      {
        title: t('mange_00002'),
        dataIndex: RoleEnum.formKey1
      },
      {
        title: t('mange_00003'),
        hideInSearch: true,
        dataIndex: RoleEnum.formKey2
      },
      {
        title: t('mange_00004'),
        dataIndex: RoleEnum.formKey3,
        valueEnum: {
          0: t(`ACT_Enable`),
          1: t(`ACT_Disable`)
        },
        hideInSearch: true
      }
    ],
    [t]
  );

  const actions = useMemo<ActionsType<GlobalAny>[]>(
    () => [
      {
        key: 'Edit',
        label: t('ACT_Edit'),
        show: () => true,
        onClick: async (data) => {
          routerPush(`${RoleEnum.routerPath}?roleId=${data.roleId}`);
        }
      },
      {
        key: 'Enable',
        label: t('ACT_Enable'),
        show: (data) => data.status === 1,
        onClick: (data) => {
          modal.confirm({
            title: t('ACT_Enable'),
            content: t('mange_00008', { key: data.roleName }),
            okText: t('ACT_Confirm'),
            cancelText: t('ACT_Cancel'),
            onOk: async () => {
              const res = await getRoleUpdateStatusApi({
                roleId: data.roleId,
                status: 0
              });
              if (res.data.code !== 0) return;
              message.success(t('PRO_Success', { p: t('ACT_Enable') }));
              (TableActionRef as GlobalAny)?.current?.actionRef.current.reset();
            }
          });
        }
      },
      {
        key: 'Disable',
        label: t('ACT_Disable'),
        show: (data) => data.status === 0,
        onClick: (data) => {
          modal.confirm({
            title: t('ACT_Disable'),
            content: t('mange_00005', { key: data.roleName }),
            okText: t('ACT_Confirm'),
            cancelText: t('ACT_Cancel'),
            onOk: async () => {
              const res = await getRoleUpdateStatusApi({
                roleId: data.roleId,
                status: 1
              });
              if (res.data.code !== 0) return;
              message.success(t('PRO_Success', { p: t('ACT_Disable') }));
              (TableActionRef as GlobalAny)?.current?.actionRef.current.reset();
            }
          });
        }
      },
      {
        key: 'Delete',
        label: t('ACT_Delete'),
        show: (data) => data.status === 1,
        onClick: (data) => {
          modal.confirm({
            title: t('ACT_Delete'),
            content: t('mange_00009', { key: data.roleName }),
            okText: t('ACT_Confirm'),
            cancelText: t('ACT_Cancel'),
            onOk: async () => {
              const res = await getRoleDeleteApi({
                roleId: data.roleId
              });
              if (res.data.code !== 0) return;
              message.success(t('PRO_Success', { p: t('ACT_Delete') }));
              (TableActionRef as GlobalAny)?.current?.actionRef.current.reset();
            }
          });
        }
      }
    ],
    [t, routerPush]
  );

  return (
    <div className={styles['container']}>
      <CTM.ComTitle title={t('mange_00007')} subTitle={t('mange_00006')} />
      <CTM.CustomTable
        rowKey="roleId"
        request={getRoleListApi}
        ref={TableActionRef}
        columns={columns}
        actions={actions}
        toolBarRender={() => [
          <CustomButton
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              routerPush(RoleEnum.routerPath);
            }}
            type="primary"
          >
            {t('ACT_Add')}
          </CustomButton>
        ]}
      />
    </div>
  );
}

export default SysRole;
