import request from '../utils/request';

// 验证用户身份
export const verifyUser = (data) => {
  return request({
    url: '/users/verify/',
    method: 'POST',
    data,
  });
};

// 获取用户信息
export const getUserInfo = (employee_id) => {
  return request({
    url: `/users/${employee_id}/`,
    method: 'GET',
  });
};

// 更新或创建用户信息
export const updateOrCreateUser = (employee_id, data) => {
  return request({
    url: `/users/update/${employee_id}/`,
    method: 'POST',
    data,
  });
};
