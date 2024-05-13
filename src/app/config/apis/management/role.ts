import { request } from '@/app/core/https';

/*
 * @Author: zhangxuefeng
 * @Date: 2024-04-08 10:52:48
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-05-09 10:46:14
 * @Description:
 */
enum RoleApi{
  getRoleUpdateStatus = '/api/rbac/v1/sys/role/status/update', // 角色状态修改
  // TODO:删除功能没有实现，需要后端实现
  getRoleDelete = '/api/rbac/v1/sys/role/delete', // 角色删除
  getRoleList = '/api/rbac/v1/sys/role/listPage', // 角色列表
  getPermissionList = '/api/rbac/v1/sys/menu/queryAllMenu', // 获取权限列表
  getRoleInfo = '/api/rbac/v1/sys/role/getRole',// 获取权限信息
  createRole = '/api/rbac/v1/sys/role/save', // 创建角色
  // TODO:description 字段提交后，再次进入编辑页面，description 没有回显
  updateRole = '/api/rbac/v1/sys/role/update' // 修改角色
}
export const getRoleUpdateStatusApi: AxiosRequest<
  GlobalAny,
  GlobalAny
> = async (data) => {
  return request.post(RoleApi.getRoleUpdateStatus, data);
};
export const getRoleDeleteApi: AxiosRequest<GlobalAny, GlobalAny> = async (
  data
) => {
  return request.post(RoleApi.getRoleDelete, data);
};
export const getRoleListApi: AxiosRequest<GlobalAny, GlobalAny> = async (
  data
) => {
  return request.post(RoleApi.getRoleList, data);
};

export const getPermissionListApi: AxiosRequest<GlobalAny, GlobalAny> = async (data) => {
  return request.post(RoleApi.getPermissionList, data);
};
export const getRoleInfoApi: AxiosRequest<GlobalAny, GlobalAny> = async (data) => {
  return request.post(RoleApi.getRoleInfo, data);
};
export const createRoleApi: AxiosRequest<GlobalAny, GlobalAny> = async (data) => {
  return request.post(RoleApi.createRole, data);
};
export const updateRoleApi: AxiosRequest<GlobalAny, GlobalAny> = async (data) => {
  return request.post(RoleApi.updateRole, data);
};