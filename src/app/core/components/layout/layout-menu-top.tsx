/*
 * @Author: chenyuting
 * @Date: 2024-05-20 10:41:27
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-22 16:50:16
 * @Description: 
 */
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import {
  Layout,
  Divider,
  Space,
  Button,
  Breadcrumb,
  Dropdown,
  Badge
} from 'antd';
import { t } from 'i18next';
import { NavLink, useMatches } from 'react-router-dom';
import { token, userInfo } from '../../store/counter/userSlice';
import { useAppSelector } from '@/app/hooks/reduxHook';
import { useToken } from '@ant-design/pro-provider';
import { useEffect, useMemo, useState } from 'react';
import { ut_getLS } from '@bsnbase/utils';

export const LayOutMenuTop = (props: { className?: string | undefined }) => {
  const primary = useAppSelector(
    (state) => state.themeSlice.theme.token.colorPrimary
  );
  const { token } = useToken();
  const matches = useMatches();
  const breadItems = useMemo(() => {
    const crumbs = matches.filter((match: GlobalAny) =>
      Boolean(match.data?.limit)
    );
    return crumbs;
  }, [matches]);
  const userName: string = JSON.parse(
    JSON.parse(ut_getLS('persist:root')).userSlice
  ).userName;
  return (
    <>
      <Layout.Header
        style={{
          backgroundColor: token.colorBgContainer,
          height: 'auto',
          padding: '0 0 0 0',
        }}
      >
        <div
          style={{
            backgroundColor: primary
          }}
          className="bg-[#4f5f7c] text-white  px-8 w-full flex items-center justify-between h-20"
        >
          <div className="flex flex-1 items-center justify-between">
            <div
              id="LayOutMenuTopID"
              className="font-bold text-[2rem] flex justify-between items-center space-x-8"
            >
              <img
                src="/static/login/img/logo.png"
                alt=""
                className="w-[8.5rem] h-[4.0625rem]"
              />
              <div className="flex  justify-start items-center flex-col xxl:flex-row">
                {t('OS_P000')}
              </div>
            </div>
            <div className="mt-3 mr-12">
              <Badge count={100}>
                <BellOutlined className="text-white" style={{'fontSize': '30px'}} />
              </Badge>
            </div>
          </div>

          <div>
            {/* <Dropdown menu={menuProps}>
            <div className="bg-[#7CA2EA] rounded-2xl px-3 py-1 space-x-3 h-12 flex items-center cursor-pointer">
              <Avatar size={35}>USER</Avatar>
              <span>{loginName}</span>
              <DownOutlined />
            </div>
          </Dropdown> */}

            <Dropdown trigger={['click']}>
              {/* <a onClick={(e) => e.preventDefault()}> */}
              <Space>
                <img
                  src="/static/login/img/Vector.png"
                  className="w-[2.5rem] mt-6"
                  alt=""
                />
                <span className="text-white">{userName}</span>
                <DownOutlined className="text-white" />
              </Space>
              {/* </a> */}
            </Dropdown>
          </div>
        </div>
      </Layout.Header>
    </>
  );
};
