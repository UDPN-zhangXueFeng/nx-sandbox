/* eslint-disable @typescript-eslint/no-explicit-any */
import { MENUS, MenusType, NOPush } from '@/app/config/menus/menus';
import type { CollapseProps, MenuProps } from 'antd';
import { Divider, Layout, Menu, theme, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ut_getLS } from '@bsnbase/utils';
import useHook from '@/app/hooks/useHook';
import { useAppSelector } from '@/app/hooks/reduxHook';
import { setUserInfo } from '../../store/counter/userSlice';

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
const LayOutMenuLeft = (props: {
  className?: string | undefined;
}) => {
  const { t } = useHook('common');
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

  const onClick = useCallback<Exclude<MenuProps['onClick'], undefined>>(
    (e) => {
      if (e.key.indexOf('https:') !== -1 || e.key.indexOf('http:') !== -1) {
        window.open(e.key);
        return;
      }
      if (e.key === 'OpenAPIs') {
        window.open('/UDPN AII-in-One Digital Currency Sandbox OpenAPI.pdf');
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
    const actPath = pathname.split('/');
    let openKey = '';
    if (actPath[5]) {
      // 三级菜单
      openKey = '/main/' + actPath[2] + '/' + actPath[3] + '/' + actPath[4];
    } else if (actPath[4]) {
      // 二级菜单
      openKey = '/main/' + actPath[2] + '/' + actPath[3];
    } else {
      openKey = pathname;
    }
    setOpenKeys([openKey]);
    setCurrent([pathname]);
  }, [pathname]);
  
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
  // const manageMenuData: MenuProps['items'] = convertToAntMenuData(
  //   MENUS_MAN
  // ).filter((item: any) => item !== null);
  const userName: string = JSON.parse(JSON.parse(ut_getLS('persist:root')).userSlice).userName;
  return (
    <Layout.Sider
        theme="light"
        style={{ height: 'calc(100vh - 5rem)' }}
        className={'overflow-y-auto px-4'}
        breakpoint="xl"
        width="20.125rem"
        collapsedWidth="20.125rem"
        trigger={null}
        collapsible
        collapsed={false}
      >
        <div className="transition-all py-5">
          {/* <center>
            <h2 className="text-theme">{t('OS_P000')}</h2>
          </center> */}
          <center>
            <div
              className="text-theme break-all font-bold py-2"
            >
              {t('OS_P001', { key: userName })}
            </div>
            {/* <p className="text-[#60a3ce]">
              {'Hello ' + JSON.parse(userInfo)['userName'] + ' !'}
            </p> */}
          </center>
          <Divider />
          <Menu
            className="!border-0 w-full setTheme"
            mode="inline"
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
            selectedKeys={current}
            items={antMenuData}
          />
        </div>
      </Layout.Sider>
  );
};

export default LayOutMenuLeft;
