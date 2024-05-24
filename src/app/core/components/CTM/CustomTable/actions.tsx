import useHook from '@/app/hooks/useHook';
import { DownOutlined } from '@ant-design/icons';
import { ProCoreActionType } from '@ant-design/pro-utils';
import { Button, Dropdown } from 'antd';
import { HookAPI } from 'antd/lib/modal/useModal';
import { NotificationInstance } from 'antd/lib/notification/interface';
import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';

export const ActionsNode: <
  DataSource extends Record<string, GlobalAny>
>(props: {
  record: DataSource;
  modal: HookAPI;
  notification: NotificationInstance;
  t: (s: string) => string;
  routerPush: GlobalAny;
  action: ProCoreActionType;
  actions: ActionsType<DataSource>[];
}) => JSX.Element = (props) => {
  const { record, modal, notification, routerPush, action, actions } = props;
  const { t } = useHook('common');
  return (
    <Dropdown
      key={'ActionGroup'}
      menu={{
        items: actions
          .filter((_, _index) => _index > 0)
          .map((_item) => ({
            key: _item.key,
            label: _item.label,
            disabled: _item.disabled
          })),
        onClick: ({ key }) => {
          const [action1] = actions.filter((_item) => _item.key === key);

          if (action1?.confirm) {
            modal.confirm({
              title: action1.confirm?.title ?? action1.label,
              content:
                action1.confirm?.description ??
                t('PRO_Question',{ label: action1.label }),
              okText: t('ACT_Confirm'),
              cancelText: t('ACT_Cancel'),
              onOk: async () => {
                if (action1?.request) {
                  const res = await action1?.request(record);
                  if (res?.data?.code) return;
                  notification.success({
                    message: action1.confirm?.title ?? action1.label,
                    description:
                      action1?.confirm?.success?.(record) ??
                      t('PRO_Success', {p: action1.label})
                  });
                }

                if (action1.onClick) {
                  action1.onClick(record, action as ProCoreActionType);
                } else {
                  action?.reload();
                }
              }
            });
          } else if (action1?.href) {
            routerPush(action1.href);
          } else {
            action1?.onClick?.(record, action as ProCoreActionType);
          }
        }
      }}
    >
      <span className="cursor-pointer text-[#4e75bf]">
        {t('ACT_More')}
        <DownOutlined />
      </span>
    </Dropdown>
  );
};

export const ActionNode: <DataSource extends Record<string, GlobalAny>>(props: {
  record: DataSource;
  modal: HookAPI;
  notification: NotificationInstance;
  t: (s: string) => string;
  routerPush: GlobalAny;
  action: ProCoreActionType;
  actions: ActionsType<DataSource>;
}) => JSX.Element = (props) => {
  const { t: t1 } = useHook('common');
  const { record, modal, notification, routerPush, action, actions } = props;
  return (
    <Button
      type="link"
      className="px-1"
      key={actions.key ?? actions.label}
      disabled={actions.disabled}
      onClick={() => {
        if (actions.confirm) {
          modal.confirm({
            title: actions.confirm?.title ?? actions.label,
            content:
              actions.confirm?.description ??
              t1('PRO_Question', { label: actions.label }),
            okText: actions.confirm?.okText,
            onOk: async () => {
              if (actions?.request) {
                const res = await actions?.request(props.record);
                if (res?.data?.code) return;
                notification.success({
                  message: actions.confirm?.title ?? actions.label,
                  description:
                    actions.confirm?.success?.(record) ??
                    t1('PRO_Success', {p: actions.label})
                });
              }

              if (actions.onClick) await actions.onClick(record, action);
              else action.reload();

              return '';
            }
          });
        } else if (actions.href) {
          routerPush(actions.href);
        } else {
          actions?.onClick?.(record, action);
        }
      }}
    >
      {actions.label}
    </Button>
  );
};

/**
 * @param href 跳转路径，一般为路由地址
 * @param confirm 弹出确认信息弹框, 传 confirm 时 request | onClick 二选一必传，request 自动刷新页面，onClick 手动处理
 * @param onClick 手动处理点击事件函数
 * @param limit 权限 Code
 * @param label 按钮显示文字
 * @param show 按钮显示逻辑函数
 */
export type ActionsType<T> = {
  href?: string;
  confirm?: {
    okText?: string;
    title?: string;
    description?: ReactNode;
    success?: (record: T) => ReactNode;
  };
  onClick?:
    | ((record: T, action: ProCoreActionType) => Promise<GlobalAny>)
    | ((record: T, action: ProCoreActionType) => void);
  request?: (record?: T) => Promise<AxiosResponse<GlobalAny>>;
  key: string;
  limit?: string;
  disabled?: boolean;
  label: string;
  show: (record: T) => boolean;
};
