import {
  AppstoreOutlined,
  BarChartOutlined,
  BlockOutlined,
  CheckSquareOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  DownSquareOutlined,
  FileMarkdownOutlined,
  FileSearchOutlined,
  FundProjectionScreenOutlined,
  IdcardOutlined,
  MacCommandOutlined,
  SettingOutlined,
  SlidersOutlined,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons';

/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-07 15:48:28
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 15:34:41
 * @Description:
 */
export interface MenusType {
  label: string | React.ReactNode;
  path?: string | null;
  link?: string | null;
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
    icon: <AppstoreOutlined />
  },
  {
    label: 'To Do List',
    path: '/main/dashboard/todoList',
    orgKey: 42,
    icon: <CheckSquareOutlined />
  },
  {
    label: 'SP Management',
    path: '/main/sp/sp-management',
    orgKey: 40,
    icon: <FileMarkdownOutlined />,
    children: [
      {
        label: 'Onboarding Management',
        path: '/main/sp/sp-management/onboarding'
      },
      {
        label: 'SP Management',
        path: '/main/sp/sp-management/sp'
      }
    ]
  },
  {
    label: 'Stablecoin Administration',
    path: '/main/stablecoin/stablecoin-admin',
    orgKey: 28,
    icon: <MacCommandOutlined />
  },
  {
    label: 'Wallet Management',
    path: '/main/wallet/wallet-management',
    orgKey: 29,
    icon: <WalletOutlined />,
    children: [
      {
        label: 'Whitelist Management',
        path: '/main/wallet/wallet-management/whitelist'
      },
      {
        label: 'User Wallet Management',
        path: '/main/wallet/wallet-management/user'
      }
    ]
  },
  {
    label: 'Control & Monitoring',
    path: '/main/management/system-log',
    orgKey: 29,
    icon: <FundProjectionScreenOutlined />,
    children: [
      {
        label: 'Rule Settings',
        path: '/main/control/control-monitoring/rule'
      },
      {
        label: 'Suspicious Activity List',
        path: '/main/control/control-monitoring/suspicious'
      }
    ]
  },
  {
    label: 'Audit & Report',
    path: '/main/audit/audit-report',
    orgKey: 30,
    icon: <FileSearchOutlined />
  },
  {
    label: 'System Settings',
    path: '/main/settings/system-settings',
    orgKey: 29,
    icon: <SettingOutlined />,
    children: [
      {
        label: 'Node Management',
        path: '/main/settings/system-settings/node'
      },
      {
        label: 'Workflow Management',
        path: '/main/settings/system-settings/workflow'
      },
      {
        label: 'Smart Contract Management',
        path: '/main/settings/system-settings/contract'
      }
    ]
  },
  {
    label: 'System Management',
    path: '/main/management/system-management',
    orgKey: 31,
    icon: <UserOutlined />,
    children: [
      {
        label: 'User Management',
        path: '/main/management/system-management/user'
      },
      {
        label: 'Role Management',
        path: '/main/management/system-management/role'
      }
    ]
  },
  {
    label: 'Mint & Redeem Management',
    path: '/main/mintRedeem/mint-redeem',
    orgKey: 31,
    icon: <FundProjectionScreenOutlined />,
    children: [
      {
        label: 'Mint Application Management',
        path: '/main/mintRedeem/mint-redeem/mint'
      },
      {
        label: 'Redeem Application Management',
        path: '/main/mintRedeem/mint-redeem/redeem'
      }
    ]
  },
  {
    label: 'Transaction Records',
    path: '/main/transaction/transaction-records',
    orgKey: 30,
    icon: <SlidersOutlined />
  },
  {
    label: 'Token Information',
    path: '/main/token/token-infomation',
    orgKey: 30,
    icon: <BlockOutlined />
  },
  {
    label: 'OpenAPIs',
    path: 'OpenAPIs',
    orgKey: 30,
    icon: <DownSquareOutlined />
  },
];
