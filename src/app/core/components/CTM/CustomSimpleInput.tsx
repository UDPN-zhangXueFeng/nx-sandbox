/*
 * @Author: W·S
 * @Date: 2023-11-19 15:27:05
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 16:02:25
 * @Description: Description
 */

import { Input, type InputProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useTranslation } from 'react-i18next';

const CustomSimpleInput = (props: InputProps) => {
  const { t } = useTranslation();
  return (
    <Input
      placeholder={t('PRO_Pleased').replace('****', '')}
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
      placeholder={t('PRO_Pleased').replace('****', '')}
    ></Input.TextArea>
  );
};

export default CustomSimpleInput;
