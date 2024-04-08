/*
 * @Author: W·S
 * @Date: 2023-11-15 17:20:45
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 10:00:21
 * @Description: Description
 */
import type { MutableRefObject } from 'react';
import { AxiosResponse } from 'axios';
import type {
  ProColumns as ProColumns1,
  ActionType
} from '@ant-design/pro-table';
import { UseApi as UseApi1 } from '@/hooks/useApi';

declare global {
  export type ProColumns<TypeDate> = ProColumns1<TypeDate>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type GlobalAny = any;
  export namespace REDTYPE {
    type Objects = { [s: string]: GlobalAny };
    type GetRequestData<T, V> = (param?: T) => AxiosPromise<V>;
    namespace Router {
      interface LayoutRouter {
        path?: string;
        name?: string;
        redirect?: string; //重定向路由
        index?: true | false; //是否为默认子路由,配置后不需要配置path属性
        component?: ReactNode;
        title?: string;
        children?: Router[];
        icon?: ReactNode;
      }
      interface RedirectRouter {
        path: string;
        redirect: string;
      }
    }
    namespace Actions {
      // 枚举每一个type类型。我是使用的枚举类型
      enum EUserListActionTypes {
        'set' = 'set',
        'del' = 'del',
        'upa' = 'upa',
        'setMore' = 'setMore'
      }
    }
  }
  /** 接口类型 */
  export interface AxiosRequest<
    U extends object = GlobalAny,
    T extends object = GlobalAny
  > {
    (data?: {
      [Property in keyof U]: U extends { loginType: number }
        ? string | number
        : U[Property];
    }): Promise<AxiosResponse<T>>;
  }
  /** @/components CustomTable ref 类型 */
  export type CustomTableRef = {
    actionRef: MutableRefObject<ActionType | undefined>;
  };

  export type UseApi = UseApi1;
}

type DeepMap<T> = {
  [K in keyof T]: T[K] extends object ? DeepMap<T[K]> : T[K];
};
