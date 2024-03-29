/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 10:05:39
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-29 13:29:26
 * @Description:
 */
import { captchaApi } from '@/app/config/apis/login';
import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Space } from 'antd';
import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface LoginProps {}
let randomstr = '';
type FieldType = {
  username?: string;
  password?: string;
  captcha?: string;
};

export function Login(props: LoginProps) {
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

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div className="flex justify-between items-center h-screen">
      <div className=" flex-1 h-full bg-gradient-to-b from-[#BAE4F0] to-[#116BA8] flex flex-col justify-center items-center space-y-7">
        <div>
          <img src="/static/login/img/logo.png" alt="" />
        </div>
        <div className="text-[1.625rem] text-[#183673] font-[600] w-[36rem] ">
          <div className="text-cneter leading-10">
            Interoperable Payment Infrastructure For The Digital Currencies Of
            Tomorrow
          </div>
        </div>
        <div>
          <img
            src="/static/login/img/login-1.png"
            className="w-[40.875rem] h-[37.0625rem]"
            alt=""
          />
        </div>
      </div>
      <div className="flex-1 justify-center items-center space-y-7 flex flex-col">
        <div className="text-[#097FF5] font-[800] text-[2.125rem] w-[36rem] leading-[2.875rem]">
          <div className="text-center">
            UDPN All-in-One Digital Currency Sandbox
          </div>
        </div>
        <div className="font-[500] leading-[2.4375rem] text-[#0A1629] text-[1.625rem]">
          Central Bank Version
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
              label="Choose a role to sign in to the system"
              name="type"
              initialValue={'5'}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Radio.Group>
                <Radio value="5"> Central Bank </Radio>
                <Radio value="10" className="ml-6">
                  Commercial Bank
                </Radio>
                {/* <Radio value="1" className="ml-6">
                    operations
                  </Radio> */}
              </Radio.Group>
            </Form.Item>
            <Form.Item<FieldType>
              label="USERNAME"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input addonAfter={<MailOutlined />} size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="PASSWORD"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password addonAfter={<KeyOutlined />} size="large" />
            </Form.Item>
            <Form.Item<FieldType>
              label="CAPTCHA"
              name="captcha"
              rules={[
                { required: true, message: 'Please input your captcha!' }
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
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
