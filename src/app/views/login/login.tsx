/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 10:05:39
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 16:37:52
 * @Description:
 */
import { captchaApi, loginApi } from '@/app/config/apis/login';
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
  initValPassword = '123456'
  // routerPath = '/main/dashboard/dashboard'
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
      }
    });
  };

  return (
    <div className="flex justify-between items-center h-screen">
      <div className=" flex-1 h-full bg-gradient-to-b from-[#BAE4F0] to-[#116BA8] flex flex-col justify-center items-center space-y-7">
        <div>
          <img src={LogEnum.imgPath} alt="" />
        </div>
        <div className="text-[1.625rem] text-[#183673] font-[600] w-[36rem] ">
          <div className="text-cneter leading-10">{t('login_0001')}</div>
        </div>
        <div>
          <img
            src={LogEnum.imgPath1}
            className="w-[40.875rem] h-[37.0625rem]"
            alt=""
          />
        </div>
      </div>
      <div className="flex-1 justify-center items-center space-y-7 flex flex-col">
        <div className="text-[#097FF5] font-[800] text-[2.125rem] w-[36rem] leading-[2.875rem]">
          <div className="text-center">{t('login_0002')}</div>
        </div>
        <div className="font-[500] leading-[2.4375rem] text-[#0A1629] text-[1.625rem]">
          {t('login_0003')}
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
            <Form.Item
              label={t('login_0004')}
              name="type"
              initialValue={'5'}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Radio.Group>
                <Radio value="5"> {t('login_0005')} </Radio>
                <Radio value="10" className="ml-6">
                  {t('login_0006')}
                </Radio>
                {/* <Radio value="1" className="ml-6">
                    operations
                  </Radio> */}
              </Radio.Group>
            </Form.Item>
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
              <Input addonAfter={<MailOutlined />} size="large" />
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
              <Input.Password addonAfter={<KeyOutlined />} size="large" />
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
                className="w-full mt-[3.125rem]"
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
  );
}

export default Login;
