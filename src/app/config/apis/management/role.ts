import { request } from '@/app/core/https';

/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-08 10:52:48
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 16:05:30
 * @Description:
 */
export const getRoleUpdateStatusApi: AxiosRequest<
  GlobalAny,
  GlobalAny
> = async (data) => {
  return request.post('/api/rbac/v1/sys/role/status/update', data);
};
export const getRoleDeleteApi: AxiosRequest<GlobalAny, GlobalAny> = async (
  data
) => {
  return request.post('/api/rbac/v1/sys/role/delete', data);
};
export const getRoleListApi: AxiosRequest<GlobalAny, GlobalAny> = async (
  data
) => {
  return request.post('/api/rbac/v1/sys/role/listPage', data);
};

export const getPermissionListApi: AxiosRequest<GlobalAny, GlobalAny> = async (data) => {
  return request.post('/api/rbac/v1/sys/menu/queryAllMenu', data);
};
export const getRoleInfoApi: AxiosRequest<GlobalAny, GlobalAny> = async (data) => {
  return request.post('/api/rbac/v1/sys/role/getRole', data);
};