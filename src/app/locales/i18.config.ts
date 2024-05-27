/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-29 14:21:13
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-27 11:26:14
 * @Description:
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/** en-US */
import CommonEn from '@/app/locales/en-US/common.json';
import LoginEn from '@/app/locales/en-US/login.json';
import ManagementEn from '@/app/locales/en-US/management.json';
import todoEn from '@/app/locales/en-US/todo.json';

/** zh-CN */
import CommonCn from '@/app/locales/zh-CN/common.json';
import LoginCn from '@/app/locales/zh-CN/login.json';
import ManagementCN from '@/app/locales/zh-CN/management.json';
import todoCN from '@/app/locales/zh-CN/todo.json';

import { getLanguage, setLanguage } from '@bsnbase/utils';

export type Locales = 'en-US' | 'zh-CN';
export const locales: Array<Locales> = ['en-US', 'zh-CN'];
export const resources: Record<
  Locales,
  Record<string, Record<string, string>>
> = {
  'en-US': {
    common: {
      ...CommonEn
    },
    login: LoginEn,
    management: ManagementEn,
    todo: todoEn
  },
  'zh-CN': {
    common: {
      ...CommonCn,
      ...LoginCn,
      ...ManagementCN,
      ...todoCN
    }
  }
};

export const defaultLocale = locales[0];

let language = getLanguage();
if (!language) {
  language = defaultLocale;
  setLanguage(defaultLocale);
}

i18n.use(initReactI18next).init({
  lng: language,
  debug: false,
  resources,
  defaultNS: 'common'
});

export { i18n };
