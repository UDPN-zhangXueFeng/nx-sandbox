/*
 * @Author: W·S
 * @Date: 2023-11-14 11:28:47
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-29 18:01:16
 * @Description: Description
 */
import commonCn from '@/app/locales/en-US/common.json';
import { App } from 'antd';
import { ArgsProps } from 'antd/es/notification';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { To, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const useHook = (translationStr?: string) => {
  const { notification: notification1 } = App.useApp();
  const { t } = useTranslation(['common', translationStr ?? '']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams() as Readonly<Record<string, string>>;
  const routerPush = useCallback(
    (
      pathStr: To | number,
      _param?: string | number,
      ...args: (string | number | undefined)[]
    ) => {
      if (pathStr === 'number') {
        navigate(pathStr);
      } else {
        if (_param && typeof pathStr !== 'number') {
          if (typeof _param === 'object') {
            // for (const key in param) {
            //   param[key] = getEncryptionData(param[key]);
            // }
            navigate(
              pathStr +
                '?' +
                Object.keys(_param)
                  .map((key) => key + '=' + _param[key])
                  .join('&')
            );
            return navigate(pathStr);
          } else {
            const _params = [_param, ...(args ?? [])].map((_item) => _item);
            return navigate(`${_params.join('/')}/${pathStr}`);
          }
        }
        return navigate(pathStr as string);
      }
    },
    [navigate]
  );

  const t1 = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (str: string, option?: any): any => {
      if (Object.keys({ ...commonCn }).includes(str))
        return t(str, { ...option });
      return t(str, { ns: translationStr, ...option });
    },
    [t, translationStr]
  );

  const notification = useMemo(
    () => ({
      success: (args: ArgsProps) => notification1.success({ ...args }),
      error: (args: ArgsProps) => notification1.error({ ...args }),
      info: (args: ArgsProps) => notification1.info({ ...args }),
      warning: (args: ArgsProps) => notification1.warning({ ...args }),
      open: (args: ArgsProps) => notification1.open({ ...args })
    }),
    [notification1]
  );

  const query = useMemo(
    () => ({
      memo: searchParams.toString(),
      get: (str: string) => searchParams.get(str) ?? '' // getDecryptionData(searchParams.get(str) ?? '')
    }),
    [searchParams]
  );

  return { t: t1, routerPush, query, params, notification };
};

export default useHook;
