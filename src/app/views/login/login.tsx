/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 10:05:39
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-20 17:23:28
 * @Description:
 */
import { captchaApi, loginApi } from '@/app/config/apis/login';
import { setTheme } from '@/app/core/store/counter/themeSlice';
import { setUserInfo } from '@/app/core/store/counter/userSlice';

import { useAppDispatch } from '@/app/hooks/reduxHook';
import useHook from '@/app/hooks/useHook';
import { getEncryptionData } from '@/app/tools/getEncryptionData';
import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Radio, Space } from 'antd';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface LoginProps {}
enum LogEnum {
  username = 'username',
  password = 'password',
  captcha = 'captcha',
  imgPath = '/static/login/img/logo.png',
  imgPath1 = '/static/login/img/login-1.png',
  routerPath = 'main/management/system-management/role',
  initValName = 'centraltest',
  initValPassword = '123456',
  themeColor = '#63A1D0',
  // routerPath = 'main/dashboard/dashboard'
}

let randomstr = '';

type FieldType = {
  username?: string;
  password?: string;
  captcha?: string;
};

export function Login(props: LoginProps) {
  const { t, routerPush } = useHook('login');
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [loadings, setLoadings] = useState<boolean>(false);

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = () => {
    return captchaApi().then((res) => {
      if (res.headers?.randomstr) {
        randomstr = res.headers.randomstr;
      }
      setValue(window.URL?.createObjectURL(res.data));
    });
  };

  const dispatch = useAppDispatch();

  const onFinish: FormProps<FieldType>['onFinish'] = (values: GlobalAny) => {
    setLoadings(true);
    loginApi({
      code: getEncryptionData(values.captcha),
      password: getEncryptionData(values.password),
      loginName: getEncryptionData(values.username),
      orgType: 5,
      randomstr
    }).then((res) => {
      setLoadings(false);
      if (res.data.code === 0) {
        dispatch(setUserInfo(res.data.data));
        routerPush(LogEnum.routerPath);
        dispatch(
          setTheme({
            token: {
              colorPrimary: LogEnum.themeColor
            }
          })
        );
      }
    });
  };

  return (
    <>
      <div className={`bg-[${LogEnum.themeColor}] flex justify-start items-center h-20 pl-4 fixed w-full`}>
        <div>
          <img className="w-[8.5rem] h-[4.0625rem]" src={LogEnum.imgPath} alt="" />
        </div>
        <div className="text-white ml-10 text-[2rem] font-bold">{t('login_0002')}</div>
      </div>
      <div className="flex justify-between items-center h-screen">
        <div className=" flex-1 flex flex-col justify-center items-center space-y-7">
         <img className="w-full h-screen" src={LogEnum.imgPath1} alt="" />
        </div>
        <div className="flex-1 justify-center items-center space-y-12 flex flex-col">
          <div className="text-[#000000] font-[800] text-[1.625rem] w-[36rem] leading-[2.875rem]">
            <div className="text-center">{t('login_0002')}</div>
          </div>
          <div className="logoIcon">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              style={{ width: '28rem' }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              className="custom"
            >
              <Form.Item<FieldType>
                label={t('login_0007')}
                name={LogEnum.username}
                initialValue={LogEnum.initValName}
                rules={[
                  {
                    required: true,
                    message: t('pub_00001', { name: LogEnum.username })
                  }
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item<FieldType>
                label={t('login_0008')}
                initialValue={LogEnum.initValPassword}
                name={LogEnum.password}
                rules={[
                  {
                    required: true,
                    message: t('pub_00001', { name: LogEnum.password })
                  }
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item<FieldType>
                label={t('login_0009')}
                name={LogEnum.captcha}
                rules={[
                  {
                    required: true,
                    message: t('pub_00001', { name: LogEnum.captcha })
                  }
                ]}
              >
                <Space direction="vertical" size="middle" className="w-full">
                  <Space.Compact className="w-full">
                    <Input size="large" />
                    <img
                      src={value}
                      alt=""
                      className="cursor-pointer"
                      onClick={() => fetchCaptcha()}
                    />
                  </Space.Compact>
                </Space>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={`bg-[${LogEnum.themeColor}] w-full mt-[3.125rem] `}
                  size="large"
                  loading={loadings}
                >
                  {t('login_0010')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
   
  );
}

export default Login;
