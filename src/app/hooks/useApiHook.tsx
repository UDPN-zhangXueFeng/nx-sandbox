import { request } from '@/app/core/https';
import { ut_getLS } from '@bsnbase/utils';
import { App } from 'antd';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './reduxHook';
import { setUserInfo } from '@/app/core/store/counter/common';

// let apiNum = -1;

const useApi: <F extends UseApi = UseApi>(
  apiInfo?: F,
  param?: F['req']
) => {
  data: F['res']['data'];
  isLoading: boolean;
  mutate: (param?: F['req']) => Promise<AxiosResponse<F['res']>>;

  fetch: <T extends UseApi = UseApi>(
    apiInfo: T,
    param?: T['req'] | undefined
  ) => Promise<AxiosResponse<T['res'], GlobalAny>>;
} = (apiInfo, param) => {
  // apiNum++;
  // console.log('useApi 调用次数：', apiNum);

  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const fetch = useCallback<
    <T extends UseApi = UseApi>(
      apiInfo: T,
      param?: T['req']
    ) => Promise<AxiosResponse<T['res']>>
  >(
    async (apiInfo, param) => {
      const isString = ['string', 'number'].includes(typeof param);

      const res = await request(apiInfo.url + (isString ? param : ''), {
        ...(apiInfo?.option ?? {}),
        headers: {
          ...(apiInfo?.option?.headers ?? {}),
          language: i18n.language,
          token: ut_getLS('token')
        },
        method: apiInfo?.option?.method ?? 'POST',
        ...(apiInfo?.option?.method?.toUpperCase() === 'GET'
          ? {
              params: isString ? {} : param
            }
          : { data: param })
      });
      if (
        res.data.code !== undefined &&
        res.data.message !== 'canceled' &&
        import.meta.env.VITE_SYS !== 'Manage'
      )
        switch (String(res.data.code)) {
          case '0':
            res.data.code = '';
            break;
          case '1':
          case '2':
            message.open({
              key: res.data.code,
              type: 'warning',
              content: res.data.message,
              style: {
                marginTop: '40px'
              }
            });
            break;
          case '3':
            message.open({
              key: res.data.code,
              type: 'warning',
              content: res.data.message,
              style: {
                marginTop: '40px',
                zIndex: '10000'
              }
            });
            dispatch(setUserInfo(undefined));
            navigate('/');
            break;
          default:
            break;
        }

      return res;
    },
    [dispatch, i18n.language, message, navigate]
  );

  const [apiParam, setApiParam] = useState<GlobalAny>(param);
  /** 接口数据 data */
  const [data, setData] = useState<GlobalAny>();
  /** 是否加载中 */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (param !== undefined) {
    if (JSON.stringify(apiParam) !== JSON.stringify(apiParam)) {
      setApiParam(param);
    }
  }

  const mutate = useCallback(
    async (_param?: typeof param) => {
      if (apiInfo) {
        setIsLoading(true);
        const res = await fetch(apiInfo, _param ?? apiParam);
        setIsLoading(false);
        if (res.data.code)
          return {
            data: {
              code: '1',
              data: undefined,
              message: ''
            }
          } as GlobalAny;
        setData(res.data.data);
        return res;
      } else {
        return {
          data: {
            code: '1',
            data: undefined,
            message: ''
          }
        } as GlobalAny;
      }
    },
    [apiInfo, apiParam, fetch]
  );

  useEffect(() => {
    if (apiInfo && apiParam !== undefined) {
      setIsLoading(true);
      fetch(apiInfo, apiParam).then((res) => {
        setIsLoading(false);
        if (res.data.code) return;
        setData(res.data.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch, apiInfo, apiParam]);

  return { fetch, data, isLoading, mutate };
};

export default useApi;
