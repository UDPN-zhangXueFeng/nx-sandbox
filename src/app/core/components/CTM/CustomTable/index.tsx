/*
 * @Author: SYN
 * @Date: 2023-11-22 10:05:14
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-24 15:04:45
 * @Description:
 */

import useApi from '@/app/hooks/useApiHook';
import {
  ProProvider,
  createIntl,
  zhCNIntl,
  type ParamsType
} from '@ant-design/pro-provider';
import ProTable, {
  type ActionType,
  type ProTableProps
} from '@ant-design/pro-table';
import { type ProCoreActionType } from '@ant-design/pro-utils';
import { Alert, App, DatePicker } from 'antd';
import {
  Fragment,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import useHook from '@/app/hooks/useHook';
import { ActionNode, ActionsNode, ActionsType } from './actions';
import { ProTable_EnLocale } from '@/app/config/locales/locales-procomponents';
import { useAppSelector } from '@/app/hooks/reduxHook';

export type { ActionsType };

/**
 * @description 列表公共组件 与 ProTable 一样
 *
 * 官方文档
 * @see https://procomponents.ant.design/components/table?tab=api&current=1&pageSize=5
 */
const CustomTable: CustomTableFace = forwardRef((props, ref) => {
  const { fetch } = useApi();

  const { limit } = useAppSelector((state) => state.userSlice);
  const enUSIntl = createIntl('en_US', ProTable_EnLocale);
  const values = useContext(ProProvider);
  const { i18n } = useTranslation();
  const { t, routerPush } = useHook();
  const { modal, notification } = App.useApp();
  const actionRef = useRef<ActionType>();
  const [pagination, setPagination] = useState({
    current: (props?.pagination && props?.pagination?.current) || 1,
    pageSize: (props?.pagination && props?.pagination?.pageSize) || 10
  });
  const columns = useMemo(() => {
    const columns: typeof props.columns = [];
    (props.columns ?? []).forEach((_item) => {
      if (_item.valueType === 'dateRange') {
        columns.push({
          ..._item,
          renderFormItem: () => (
            <DatePicker.RangePicker
              format={i18n.language === 'en-US' ? 'DD/MM/YYYY' : undefined}
            />
          ),
          render:
            _item?.render ?? ((_, entity) => entity[_item.dataIndex as string])
        });
      } else {
        columns.push({
          ..._item
        });
      }
    });
    if (props.actions) {
      if (columns[columns.length - 1].key === 'Actions') {
        columns.splice(columns.length - 1, 1);
      }
      columns.push({
        title: t('Actions'),
        width: props?.actionsTabWidth ?? '10rem',
        valueType: 'option',
        key: 'Actions',
        render: (_, record, __, action) => {
          const nodeArr: ReactNode[] = [];
          const actions =
            props.actions?.filter((_item) => {
              if (
                import.meta.env.VITE_VERIFY_PERMISSIONS === 'true' &&
                _item?.limit
              ) {
                return limit.includes(_item?.limit ?? '') && _item.show(record);
              } else {
                return _item.show(record);
              }
            }) ?? [];
          if (!actions.length) return nodeArr;

          nodeArr.push(
            <Fragment key="ActionsO">
              <ActionNode
                t={t}
                record={record}
                modal={modal}
                notification={notification}
                routerPush={routerPush}
                action={action as ProCoreActionType}
                actions={actions[0]}
              />
            </Fragment>
          );

          if (actions.length > 2) {
            nodeArr.push(
              <Fragment key="ActionGroup">
                <ActionsNode
                  t={t}
                  record={record}
                  modal={modal}
                  notification={notification}
                  routerPush={routerPush}
                  action={action as ProCoreActionType}
                  actions={actions}
                />
              </Fragment>
            );
          } else if (actions.length === 2) {
            nodeArr.push(
              <Fragment key="ActionsT">
                <ActionNode
                  t={t}
                  record={record}
                  modal={modal}
                  notification={notification}
                  routerPush={routerPush}
                  action={action as ProCoreActionType}
                  actions={actions[1]}
                />
              </Fragment>
            );
          }

          return nodeArr;
        }
      });
    }
    return columns;
  }, [i18n.language, limit, modal, notification, props, routerPush, t]);

  const request = useCallback(async (params: GlobalAny) => {
    const { current, pageSize, ...param } = params;
    const _params = {
      page: {
        pageNum: current,
        pageSize: pageSize
      },
      data: param
    };
    try {
      let res;
      if (props?.request) res = await props?.request(_params);
      else if (props?.requestApi) res = await fetch(props?.requestApi, _params);
      return {
        data: res?.data?.data.rows,
        total: res?.data?.data.page.total,
        success: true
      };
    } catch (e) {
      console.dir(e);
      return {
        data: [],
        total: 0,
        success: true
      };
    }
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        actionRef
      };
    },
    []
  );

  return (
    <ProProvider.Provider
      value={{
        ...values,
        intl: i18n.language === 'en-US' ? enUSIntl : zhCNIntl
      }}
    >
      {props?.alert ? (
        <Alert
          className="mb-7"
          message={props?.alert?.message ?? props?.alert?.description}
          // description={props?.alert?.description}
          type="info"
          showIcon
          closable
        />
      ) : (
        <></>
      )}
      <ProTable
        className="ProTable_B"
        {...props}
        editable={{
          type: 'multiple'
        }}
        columns={columns}
        options={
          props.options ?? {
            setting: {
              listsHeight: 400
            }
          }
        }
        request={request}
        search={
          props?.search === false
            ? false
            : {
                layout: 'vertical',
                labelWidth: props?.search?.labelWidth ?? 130,
                defaultCollapsed: false,
                ...(props?.search ?? {})
              }
        }
        actionRef={actionRef}
        dateFormatter={(value) => {
          return value.format('YYYY/MM/DD');
        }}
        pagination={{
          showQuickJumper: true,
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) => {
            setPagination({
              current: page,
              pageSize: pageSize
            });
            if (page !== pagination.current || pageSize !== pagination.pageSize)
              actionRef.current?.reload();
          }
        }}
        // columnsState={{
        //   persistenceKey: 'pro-table-singe-demos',
        //   persistenceType: 'localStorage',
        //   onChange(value) {
        //     console.log('value: ', value);
        //   }
        // }}
      ></ProTable>
    </ProProvider.Provider>
  );
}) as CustomTableFace;

CustomTable.Tooltip = (props: { label: ReactNode[] }) => {
  return (
    <>
      {props.label.map((_item, _index) => (
        <p key={_index}>{_item}</p>
      ))}
    </>
  );
};

CustomTable.getAlert = (labels: ReactNode[]) => ({
  description: (
    <>
      {labels.map((_item, _index) => (
        <p key={_index} className="leading-4">
          {_item}
        </p>
      ))}
    </>
  )
});

export default CustomTable;

interface CustomTableProps<DataSource, Params, ValueType>
  extends Omit<ProTableProps<DataSource, Params, ValueType>, 'request'> {
  limit?: Record<string, string>;
  ref?: GlobalAny;
  request?: AxiosRequest;
  requestApi?: UseApi;
  actions?: ActionsType<DataSource>[];
  actionsTabWidth?: string;
  alert?: {
    message?: ReactNode;
    description?: ReactNode;
  };
}

interface CustomTableProps1<DataSource, Params, ValueType>
  extends CustomTableProps<DataSource, Params, ValueType> {
  request: AxiosRequest;
}

interface CustomTableProps2<DataSource, Params, ValueType>
  extends CustomTableProps<DataSource, Params, ValueType> {
  requestApi?: UseApi;
}

interface CustomTableFace {
  <
    DataSource extends Record<string, GlobalAny>,
    Params extends ParamsType = ParamsType,
    ValueType = 'text'
  >(
    props:
      | CustomTableProps1<DataSource, Params, ValueType>
      | CustomTableProps2<DataSource, Params, ValueType>
  ): ReactNode;

  Tooltip?: (props: { label: ReactNode[] }) => ReactNode;

  getAlert?: (labels: ReactNode[]) => {
    message?: ReactNode;
    description?: ReactNode;
  };
}
