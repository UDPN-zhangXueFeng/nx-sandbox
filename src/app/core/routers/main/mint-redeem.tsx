import { Navigate, Outlet, RouteObject } from 'react-router-dom';

export const MintRedeemRoute: RouteObject = {
  path: 'mintRedeem',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="mint-redeem" />
    },
    {
      path: 'mint-redeem',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="mint" />
        },

        {
          path: 'mint',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { MintList } = await import(
                  '@/app/views/main-mint-redeem/mint-application/mint-list'
                );
                return { Component: MintList };
              }
            },
          ]
        },
        {
          path: 'redeem',
          element: <Outlet />,
          children: [
            {
              index: true,
              async lazy() {
                const { RedeemList } = await import(
                  '@/app/views/main-mint-redeem/redeem-application/redeem-list'
                );
                return { Component: RedeemList };
              }
            },
          ]
        }
      ]
    }
  ]
};
