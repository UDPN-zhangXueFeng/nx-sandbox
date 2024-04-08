/*
 * @Author: W·S
 * @Date: 2023-11-14 17:52:29
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 16:00:41
 * @Description: Description
 */

import { Button, Form, FormItemProps, FormProps, Spin } from 'antd';
import { PropsWithChildren, ReactNode, useState } from 'react';
import CustomCard, { type CustomCardProps } from './CustomCard';
import useHook from '@/app/hooks/useHook';

type CustomIncreaseProps<Values extends object = GlobalAny> = PropsWithChildren<
  FormProps<Values> & {
    backFun?: () => void;
    submitText?: string;
    cancelText?: string;
    buttonHidden?: boolean;
    initialValues?: {
      [Property in keyof Values]?: Values[Property] extends number | undefined
        ? string | number
        : Values[Property];
    };
    backButtonHidden?: boolean;
  }
>;

interface CustomIncreaseJsx<Values extends object = GlobalAny> {
  <Values extends object = GlobalAny>(
    props: CustomIncreaseProps<Values>
  ): ReactNode;
  Card: (props: PropsWithChildren<CustomCardProps>) => ReactNode;
  Item: (
    props: Omit<FormItemProps<Values>, 'name'> & {
      full?: boolean;
      name?: keyof Values | Array<keyof Values | string | number>;
    }
  ) => ReactNode;
}

/**
 *
 * @param submitText 确定按钮自定义内容
 * @param buttonHidden 是否隐藏底部按钮
 * @param props 其余 Api 通 antd - Form 相同
 * @param CustomIncrease.Card 布局组件
 * @param CustomIncrease.Item 通 antd - Form.Item
 * @returns
 */
const CustomIncrease: CustomIncreaseJsx = (props) => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const { t, routerPush } = useHook();
  const { children, buttonHidden, submitText, backButtonHidden, ...forms } =
    props;
  const onFinish: FormProps['onFinish'] = async (value) => {
    for (const key in value) {
      const element = value[key];
      if (typeof element === 'string') value[key] = String(element).trim();
    }
    setSpinning(true);
    await forms?.onFinish?.(value);
    setSpinning(false);
  };

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <Form
        labelCol={{ flex: forms.layout === 'horizontal' ? '10rem' : '' }}
        layout="vertical"
        {...forms}
        onFinish={onFinish}
        scrollToFirstError={forms?.scrollToFirstError ?? true}
      >
        <div className="space-y-5">{children}</div>
        {buttonHidden ? (
          <></>
        ) : (
          <div className="flex justify-end mt-13 space-x-4">
            <Button
              type="primary"
              htmlType="submit"
              className="px-8 py-2 h-auto"
            >
              {submitText ?? t('ACT_Confirm')}
            </Button>
            {backButtonHidden ? null : (
              <Button
                type="text"
                className="px-8 py-2 h-auto font-bold"
                onClick={() => {
                  props.backFun ? props.backFun() : routerPush(-1);
                }}
              >
                {props.cancelText ?? t('ACT_Back')}
              </Button>
            )}
          </div>
        )}
      </Form>
    </>
  );
};

CustomIncrease.Card = (props) => {
  return <CustomCard grid {...props} />;
};

CustomIncrease.Item = (props) => {
  const { full, ...prop } = props;

  return (
    <Form.Item
      {...prop}
      // placeholder={t('PRO_Pleased').replace('****', 'label')}
      className={(full ? 'col-span-full ' : '') + prop.className}
    />
  );
};

export default CustomIncrease;
