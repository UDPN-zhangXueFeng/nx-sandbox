/*
 * @Author: W·S
 * @Date: 2023-11-19 15:27:05
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-24 15:10:12
 * @Description: Description
 */

import useHook from '@/app/hooks/useHook';
import { Input, type InputProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useTranslation } from 'react-i18next';

const CustomSimpleInput = (props: InputProps) => {
  const { t } = useHook('common');
  return (
    <Input
      placeholder={t('PRO_Pleased', {key: ''})}
      maxLength={props?.maxLength ?? 50}
      {...props}
    ></Input>
  );
};

export const CustomSimpleTextArea = (props: TextAreaProps) => {
  const { t } = useTranslation();
  return (
    <Input.TextArea
      {...props}
      maxLength={props?.maxLength ?? 200}
      placeholder={t('PRO_Pleased',  {key: ''})}
    ></Input.TextArea>
  );
};

export default CustomSimpleInput;
