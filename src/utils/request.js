import Taro from '@tarojs/taro';

const BASE_URL = 'http://127.0.0.1:8000'; // 后端服务器地址

export default function request(options) {
  const token = Taro.getStorageSync('token'); // 从本地存储获取 token

  return Taro.request({
    url: `${BASE_URL}${options.url}`,
    method: options.method || 'GET',
    data: options.data || {},
    header: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '', // 将 token 添加到请求头
      ...options.header,
    },
  }).then((response) => {
    const { statusCode, data } = response;
    if (statusCode >= 200 && statusCode < 300) {
      return data;
    } else {
      Taro.showToast({
        title: data.message || '请求出错',
        icon: 'none',
      });
      return Promise.reject(data);
    }
  });
}
