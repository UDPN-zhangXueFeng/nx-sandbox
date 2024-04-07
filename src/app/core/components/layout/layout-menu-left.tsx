/* eslint-disable @typescript-eslint/no-explicit-any */
import { MENUS, MenusType, NOPush, MENUS_MAN } from '@/app/config/menus/menus';
import type { CollapseProps, MenuProps } from 'antd';
import { Layout, Menu, theme, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ut_getLS } from '@bsnbase/utils';

import useHook from '@/app/hooks/useHook';

type MenuItem = Required<MenuProps>['items'][number];
const { Title, Paragraph } = Typography;
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}
const { useToken } = theme;
const LayOutMenuLeft = () => {
  const { t } = useHook();
  const [showStatus, setShowStatus] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /** 默认打开的导航 */
  const [openKeys, setOpenKeys] = useState<string[]>();
  /** 默认高亮的导航 */
  const [current, setCurrent] = useState<string[]>([pathname]);
  const [activeKey, setActiveKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = useCallback<Exclude<MenuProps['onClick'], undefined>>(
    (e) => {
      if (e.key.indexOf('https:') !== -1 || e.key.indexOf('http:') !== -1) {
        window.open(e.key);
        return;
      }
      if (e.key.indexOf('currencyDefinitions') !== -1) {
        showModal();
        return;
      }
      if (e.key.indexOf('currencyDefinitions1') !== -1) {
        showModal();
        return;
      }
      if (NOPush.includes(e.key)) return;

      setOpenKeys(['/main/' + e.key.split('/')[2]]);
      setCurrent(e.keyPath);
      navigate(e.key);
      e.domEvent.stopPropagation();
    },
    [navigate]
  );
  useEffect(() => {
    if (ut_getLS('orgType') === '5') {
      setShowStatus(true);
    }
    if (ut_getLS('orgType') === '10') {
      setShowStatus(true);
    }
    if (ut_getLS('orgType') === '1') {
      setShowStatus(false);
    }
  }, []);
  useEffect(() => {
    const actPath = pathname.split('/');
    let openKey = '';
    if (
      actPath[2] === 'digital' ||
      actPath[2] === 'traditional' ||
      actPath[3] === 'system-management'
    ) {
      openKey = '/main/' + actPath[2] + '/' + actPath[3];
    }
    if (
      actPath[3] === 'distributed' ||
      actPath[4] === 'wallet-management' ||
      actPath[4] === 'transaction-record' ||
      actPath[4] === 'wallet-commercial' ||
      actPath[4] === 'remittance'
    ) {
      openKey = '/main/' + actPath[2] + '/' + actPath[3] + '/' + actPath[4];
    }
    if (
      actPath[5] === 'rcbdc-mgt' ||
      actPath[5] === 'wallet-mgt' ||
      actPath[5] === 'rcbdc-data' ||
      actPath[5] === 'rcbdc-statisics'
    ) {
      openKey =
        '/main/' +
        actPath[2] +
        '/' +
        actPath[3] +
        '/' +
        actPath[4] +
        '/' +
        actPath[5];
    }

    let _current = '';
    if (pathname === 'main') {
      _current = '/main';
    }
    if (actPath[2] === 'dashboard' || actPath[2] === 'management') {
      _current = '/main/' + actPath[2] + '/' + actPath[3];
    }
    if (
      actPath[2] === 'digital' ||
      actPath[2] === 'traditional' ||
      actPath[3] === 'system-management'
    ) {
      _current = '/main/' + actPath[2] + '/' + actPath[3] + '/' + actPath[4];
    }
    if (
      actPath[3] === 'distributed' ||
      actPath[4] === 'wallet-management' ||
      actPath[4] === 'transaction-record' ||
      actPath[4] === 'wallet-commercial' ||
      actPath[4] === 'remittance'
    ) {
      _current =
        '/main/' +
        actPath[2] +
        '/' +
        actPath[3] +
        '/' +
        actPath[4] +
        '/' +
        actPath[5];
    }
    if (
      actPath[5] === 'rcbdc-mgt' ||
      actPath[5] === 'wallet-mgt' ||
      actPath[5] === 'rcbdc-data' ||
      actPath[5] === 'rcbdc-statisics'
    ) {
      _current =
        '/main/' +
        actPath[2] +
        '/' +
        actPath[3] +
        '/' +
        actPath[4] +
        '/' +
        actPath[5] +
        '/' +
        actPath[6];
    }

    if (pathname.includes('tokenized')) {
      setActiveKey('1');
    } else if (pathname.includes('distributed')) {
      setActiveKey('2');
    } else if (pathname.includes('wholesale')) {
      setActiveKey('3');
    }

    setOpenKeys([openKey]);
    setCurrent([_current]);
  }, [pathname]);

  const userInfo = ut_getLS('userInfo');
  const { token } = useToken();

  const convertToAntMenuData = useCallback(
    (items: MenusType[]): MenuItem[] => {
      return items.map((item) => {
        if (item) {
          return {
            key: item.path,
            label: typeof item.label === 'string' ? t(item.label) : item.label,
            icon: item.icon,
            children: item.children
              ? convertToAntMenuData(item.children)
              : undefined,
            type: item.type ? item.type : null
          } as MenuItem;
        } else {
          return null;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );
  const antMenuData: MenuProps['items'] = convertToAntMenuData(MENUS).filter(
    (item) => item !== null
  );
  const manageMenuData: MenuProps['items'] = convertToAntMenuData(
    MENUS_MAN
  ).filter((item: any) => item !== null);
  return (
    <Layout.Sider
      theme="light"
      style={{ height: 'calc(100vh - 6rem)' }}
      className={'overflow-y-auto px-4'}
      breakpoint="xl"
      width="20.125rem"
      collapsedWidth="20.125rem"
      trigger={null}
      collapsible
      collapsed={false}
    >
      <div className="transition-all py-3">
        <center>
          <div
            className="text-theme break-all font-[700] text-[24px] py-2"
            style={{
              textShadow: token.colorInfo + ' 0.2rem 0.4rem 0.6rem',
              color: token.colorPrimary
            }}
          >
            {'123123'}
          </div>
          {/* <p className="text-[#60a3ce]">
                {'Hello ' + JSON.parse(userInfo)['userName'] + ' !'}
              </p> */}
        </center>

        <i className="font-bold text-lg">Sandbox Management</i>
        <Menu
          className="!border-0 w-full setTheme"
          mode="inline"
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          selectedKeys={current}
          items={antMenuData}
        />
        <i className="font-bold text-lg">Sandbox Management</i>
        <Menu
          className="!border-0 w-full setTheme"
          mode="inline"
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          selectedKeys={current}
          items={manageMenuData}
        />
      </div>
    </Layout.Sider>
  );
};

export default LayOutMenuLeft;
