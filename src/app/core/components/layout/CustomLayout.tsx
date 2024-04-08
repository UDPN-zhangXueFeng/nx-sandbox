/*
 * @Author: W·S
 * @Date: 2023-11-14 11:28:47
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 13:57:26
 * @Description: Description
 */

import { ConfigProvider, Layout, theme } from 'antd';
import LayOutMenuTop from './layout-menu-top';
import { useOutlet } from 'react-router-dom';
import { useRef } from 'react';
import LayOutMenuLeft from './layout-menu-left';
import { useAppSelector } from '@/app/hooks/reduxHook';
const { useToken } = theme;

const CustomLayout = () => {
  const currentOutlet = useOutlet();
  const nodeRef = useRef(null);
  const { token } = useToken();

  return (
    <ConfigProvider theme={useAppSelector((state) => state.themeSlice.theme)}>
      <Layout
        style={{ backgroundColor: token.colorBgContainer }}
        className="h-full w-full "
      >
        {<LayOutMenuTop />}
        <Layout
          hasSider
          className="flex flex-col "
          style={{ backgroundColor: token.colorBgLayout }}
        >
          <div
            className="overflow-hidden bg-white mt-4 rounded-2xl"
            style={{ height: 'calc(100%-2rem)' }}
          >
            <LayOutMenuLeft />
          </div>

          <Layout.Content
            style={{ backgroundColor: token.colorBgLayout }}
            className="flex flex-col overflow-hidden"
          >
            <div id="LayoutContentHeader" className=""></div>
            <Layout.Content
              style={{ backgroundColor: token.colorBgLayout }}
              className="overflow-auto relative mt-4 mr-1 ml-4 rounded-2xl "
            >
              <div ref={nodeRef} className="bg-gray-[500]">
                {currentOutlet}
              </div>
            </Layout.Content>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default CustomLayout;
