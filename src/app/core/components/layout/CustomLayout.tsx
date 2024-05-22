/*
 * @Author: W·S
 * @Date: 2023-11-14 11:28:47
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-22 16:43:44
 * @Description: Description
 */

import { ConfigProvider, Layout, theme } from 'antd';
import { useLocation, useOutlet } from 'react-router-dom';
import { useRef } from 'react';
import LayOutMenuLeft from './layout-menu-left';
import { useAppSelector } from '@/app/hooks/reduxHook';
import { LayOutMenuTop } from './layout-menu-top';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup
} from 'react-transition-group';
const { useToken } = theme;

const CustomLayout = () => {
  const currentOutlet = useOutlet();
  const nodeRef = useRef(null);
  const { token } = useToken();
  const location = useLocation();

  return (
    <ConfigProvider
      theme={useAppSelector((state) => state.themeSlice.theme) || []}
    >
      <Layout
        style={{ backgroundColor: token.colorBgContainer}}
        className="h-full w-full"
      >
        {<LayOutMenuTop />}
        <Layout
          hasSider
          className="flex flex-col "
          style={{ backgroundColor: token.colorBgLayout }}
        >
         <div
            className="overflow-hidden bg-white h-full"
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
              className="overflow-auto relative mt-4 mr-1 ml-4"
            >
              <div ref={nodeRef} className="bg-gray-[500]">
                <SwitchTransition mode="out-in">
                  <CSSTransition
                    key={location.key}
                    timeout={300}
                    classNames="layout-main-page"
                    nodeRef={null}
                  >
                    {currentOutlet}
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </Layout.Content>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default CustomLayout;
