import useHook from '@/app/hooks/useHook';
import { TreeDataNode, Form, Select, Tree } from 'antd';
import { useState, useEffect, Key } from 'react';
import styles from './role-edit.module.scss';
import CTM from '@/app/core/components/CTM';
import {
  getPermissionListApi,
  getRoleInfoApi
} from '@/app/config/apis/management/role';

type FieldType = {
  roleName?: string;
  orgId?: string;
  describes?: string;
  menuIdList?: GlobalAny;
};

enum RoleEditEnum {
  locale = 'management',
  treeTitle = 'all',
  roleName = 'roleName',
  describes = 'describes',
  orgId = 'orgId',
  menuIdList = 'menuIdList'
}

/* eslint-disable-next-line */
export interface RoleEditProps {}

export function RoleEdit(props: RoleEditProps) {
  const [treeData1, setTreeData1] = useState<TreeDataNode[]>([]);
  const { t, query } = useHook(RoleEditEnum.locale);
  const [form] = Form.useForm<FieldType>();
  const onFinish = async (values: GlobalAny) => {
    console.log(values);

    // if (query.get('userId')) {
    //   getRoleEditApi(values).then((res) => {
    //     if (res.data.code !== 0) return;
    //     message.success(t('PRO_Success').replace('****', t('ACT_Edit')));
    //     routerPush(-1);
    //   });
    // } else {
    //   getRoleSaveApi(values).then((res) => {
    //     if (res.data.code !== 0) return;
    //     message.success(t('PRO_Success').replace('****', t('ACT_NewAdd')));
    //     routerPush(-1);
    //   });
    // }
  };
  const getPermissionList = async () => {
    const res = await getPermissionListApi({});

    const treeAll: TreeDataNode = {
      title: RoleEditEnum.treeTitle,
      key: 0,
      children: []
    };
    const datas = res.data.data;
    appendChildren(treeAll, datas);
    setTreeData1([treeAll]);
    setExpandedKeys([0]);
  };

  const appendChildren = (parentNode: GlobalAny, children: GlobalAny) => {
    children.forEach((child: GlobalAny) => {
      const newNode = { title: child.menuName, key: child.menuId };
      parentNode.children = parentNode.children || [];
      parentNode.children.push(newNode);
      if (child.children.length > 0) {
        appendChildren(newNode, child.children);
      }
    });
  };
  const getUserInfo = async (roleId: GlobalAny) => {
    await getRoleInfoApi({
      roleId: Number(roleId)
    }).then((res) => {
      setCheckedKeys(res.data.data.menuIdList);
      res = res.data;
      form.setFieldValue(RoleEditEnum.roleName, res?.data?.roleName);
      form.setFieldValue(RoleEditEnum.describes, res?.data?.describes);
      form.setFieldValue(RoleEditEnum.orgId, res?.data?.status);
      form.setFieldValue(RoleEditEnum.menuIdList, res?.data?.menuIdList);
    });
  };
  useEffect(() => {
    getPermissionList();
    if (query.get('roleId')) {
      getUserInfo(query.get('roleId'));
    }
  }, []);

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<
    Key[] | { checked: Key[]; halfChecked: Key[] }
  >([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: GlobalAny) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    console.log('onCheck', checked);
    setCheckedKeys(checked);
    form.setFieldValue('menuIdList', checked);
  };

  return (
    <div className={styles['container']}>
      <CTM.ComTitle title={t('mange_00007')} subTitle={t('mange_00006')} />
      <div className="flex justify-between">
        <CTM.CustomCard className="w-1/2 mx-2">
          <CTM.CustomIncrease
            form={form}
            onFinish={onFinish}
            buttonHidden
            className="w-1/2 m-auto my-20"
          >
            <Form.Item<FieldType>
              label={t('mange_00002')}
              name={RoleEditEnum.roleName}
              rules={[{ required: true }]}
            >
              <CTM.CustomSimpleInput />
            </Form.Item>
            <Form.Item<FieldType>
              label={t('mange_00010')}
              name={RoleEditEnum.describes}
              rules={[{ required: true }]}
            >
              <CTM.CustomSimpleTextArea />
            </Form.Item>
            <Form.Item<FieldType>
              label={t('mange_00011')}
              name={RoleEditEnum.orgId}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Select
                options={[
                  { value: 0, label: t('ACT_Enable') },
                  { value: 1, label: t('ACT_Disable') }
                ]}
              ></Select>
            </Form.Item>
          </CTM.CustomIncrease>
        </CTM.CustomCard>
        <CTM.CustomCard className="w-1/2 mx-2">
          <CTM.CustomIncrease
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            className="m-auto my-20"
          >
            <Form.Item<FieldType>
              label={t('mange_00012')}
              name={RoleEditEnum.menuIdList}
              rules={[{ required: true }]}
            >
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                checkedKeys={checkedKeys}
                treeData={treeData1}
                onCheck={onCheck}
                className="min-w-[300px]"
              />
            </Form.Item>
          </CTM.CustomIncrease>
        </CTM.CustomCard>
      </div>
    </div>
  );
}

export default RoleEdit;
