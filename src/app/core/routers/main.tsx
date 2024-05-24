/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 13:44:13
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-23 16:06:28
 * @Description:
 */
import ErrorPage from '@/app/views/error/errorPage';
import { RouteObject } from 'react-router-dom';
import DashboardRoute from './main/dashboard';
import CustomLayout from '../components/layout/CustomLayout';
import { ManagementRoute } from './main/management';
import { SpRoute } from './main/sp';
import { StablecoinRoute } from './main/stablecoin';
import { WalletRoute } from './main/wallet';
import { ControlRoute } from './main/control';
import { AuditRoute } from './main/audit';
import { SettingsRoute } from './main/settings';
import { MintRedeemRoute } from './main/mint-redeem';
import { TransactionRoute } from './main/transaction';
import { TokenRoute } from './main/token';

export const MainRoute: RouteObject = {
  path: 'main',
  element: <CustomLayout />,
  errorElement: <ErrorPage />,
  children: [DashboardRoute, ManagementRoute, SpRoute, StablecoinRoute, WalletRoute, ControlRoute, AuditRoute, SettingsRoute, MintRedeemRoute, TransactionRoute, TokenRoute]
};
