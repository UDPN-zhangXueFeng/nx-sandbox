import {
  AppstoreOutlined,
  BarChartOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DesktopOutlined
} from '@ant-design/icons';

/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 15:48:28
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 16:57:45
 * @Description:
 */
export interface MenusType {
  label: string | React.ReactNode;
  path?: string | null;
  icon?: React.ReactNode;
  type?: 'group';
  orgKey?: number;
  children?: MenusType[];
}
export const NOPush: Array<string> = [];
export const MENUS = [
  {
    label: 'Dashboard',
    path: '/main/dashboard/dashboard',
    orgKey: 1,
    icon: <DashboardOutlined />
  },
  {
    label: 'Dashboard',
    path: '/main/dashboard/mdashboard',
    orgKey: 2,
    icon: <DashboardOutlined />
  },
  {
    label: 'Currency Definitions',
    path: '/main/dashboard/currencyDefinitions',
    orgKey: 41,
    icon: <DashboardOutlined />
  },
  {
    label: 'Currency Definitions',
    path: '/main/dashboard/currencyDefinitions1',
    orgKey: 43,
    icon: <DashboardOutlined />
  },
  {
    label: 'To Do List',
    path: '/main/dashboard/mTodoList',
    orgKey: 42,
    icon: <DashboardOutlined />
  },
  {
    label: 'To Do List',
    path: '/main/dashboard/todoList',
    orgKey: 45,
    icon: <DashboardOutlined />
  }
];
export const MENUS_MAN = [
  {
    label: 'FSP Onboarding',
    path: '/main/management/fsp-management',
    orgKey: 40,
    icon: <BarChartOutlined />
  },
  {
    label: 'Business Activation View',
    path: '/main/management/business',
    orgKey: 28,
    icon: <DatabaseOutlined />
  },
  {
    label: 'System Log',
    path: '/main/management/system-log',
    orgKey: 29,
    icon: <AppstoreOutlined />
  },

  {
    label: 'Statistics',
    path: '/main/management/statistics',
    orgKey: 30,
    icon: <BarChartOutlined />
  },
  {
    label: 'System Management',
    path: '/main/management/system-management',
    orgKey: 31,
    icon: <DesktopOutlined />,
    children: [
      // {
      //   label: 'FSP Management',
      //   path: '/main/management/system-management/fsp'
      // },
      {
        label: 'User Management',
        path: '/main/management/system-management/user'
      },
      {
        label: 'Role Management',
        path: '/main/management/system-management/role'
      }
    ]
  }
];
